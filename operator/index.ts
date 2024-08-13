import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { delegationABI } from "./abis/delegationABI";
import { registryABI } from './abis/registryABI';
import { avsDirectoryABI } from './abis/avsDirectoryABI';
dotenv.config();

import * as fs from 'fs';

const { addresses: avsAddresses } = JSON.parse(fs.readFileSync('contracts/script/output/31337/lending_protocol_avs_deployment_output.json', 'utf-8'));
const { addresses: elAddresses } = JSON.parse(fs.readFileSync('contracts/script/output/31337/eigenlayer_deployment_output.json', 'utf-8'));
const { abi: contractABI } = JSON.parse(fs.readFileSync('contracts/out/LendingProtocolServiceManager.sol/LendingProtocolServiceManager.json', 'utf-8'));

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const LIQUIDATION_RATIO = 1;

const delegationManagerAddress = elAddresses.delegation;
const contractAddress = avsAddresses.LendingProtocolServiceManagerProxy;
const erc20MockAddress = avsAddresses.erc20Mock;
const stakeRegistryAddress = avsAddresses.ECDSAStakeRegistry;
const avsDirectoryAddress = elAddresses.avsDirectory;

const delegationManager = new ethers.Contract(delegationManagerAddress, delegationABI, wallet);
const contract = new ethers.Contract(contractAddress, contractABI, wallet);
const registryContract = new ethers.Contract(stakeRegistryAddress, registryABI, wallet);
const avsDirectory = new ethers.Contract(avsDirectoryAddress, avsDirectoryABI, wallet);
const erc20Contract = new ethers.Contract(erc20MockAddress, ["function approve(address spender, uint256 amount)"], wallet);

const signAndRespondToTask = async (taskIndex: number, taskCreatedBlock: number, taskName: string) => {
    const message = `Hello, ${taskName}`;
    const messageHash = ethers.utils.solidityKeccak256(["string"], [message]);
    const messageBytes = ethers.utils.arrayify(messageHash);
    const signature = await wallet.signMessage(messageBytes);

    console.log(
        `Signing and responding to task ${taskIndex}`
    )

    const tx = await contract.respondToTask(
        { name: taskName, taskCreatedBlock: taskCreatedBlock },
        taskIndex,
        signature
    );
    await tx.wait();
    console.log(`Responded to task.`);
};

const registerOperator = async () => {
    console.log("check")

    const tx1 = await delegationManager.registerAsOperator({
        earningsReceiver: await wallet.address,
        delegationApprover: "0x0000000000000000000000000000000000000000",
        stakerOptOutWindowBlocks: 0
    }, "");
    await tx1.wait();
    console.log("Operator registered on EL successfully");


    const salt = ethers.utils.hexlify(ethers.utils.randomBytes(32));
    const expiry = Math.floor(Date.now() / 1000) + 3600; // Example expiry, 1 hour from now

    // Define the output structure
    let operatorSignature = {
        expiry: expiry,
        salt: salt,
        signature: ""
    };

    // Calculate the digest hash using the avsDirectory's method
    const digestHash = await avsDirectory.calculateOperatorAVSRegistrationDigestHash(
        wallet.address,
        contract.address,
        salt,
        expiry
    );

    // // Sign the digest hash with the operator's private key
    const signingKey = new ethers.utils.SigningKey(process.env.PRIVATE_KEY!);
    const signature = signingKey.signDigest(digestHash);

    // // Encode the signature in the required format
    operatorSignature.signature = ethers.utils.joinSignature(signature);

    const tx2 = await registryContract.registerOperatorWithSignature(
        operatorSignature,
        wallet.address
    );
    await tx2.wait();
    console.log("Operator registered on AVS successfully");
};

let loanIds: number[] = [];

const getERC20Balances = async () => {
    const erc20 = new ethers.Contract(erc20MockAddress, ["function balanceOf(address owner) view returns (uint256)"], provider);

    const walletBalance = await erc20.balanceOf(wallet.address);
    const contractBalance = await erc20.balanceOf(contractAddress);

    console.log(`Wallet ERC20 Balance: ${ethers.utils.formatUnits(walletBalance, 18)}`);
    console.log(`Contract ERC20 Balance: ${ethers.utils.formatUnits(contractBalance, 18)}`);
};

const mintTokens = async () => {
    const amount = "1000";

    const erc20 = new ethers.Contract(erc20MockAddress, ["function mint(address to, uint256 amount)"], wallet);

    const amountToMint = ethers.utils.parseUnits(amount, 18);

    const tx1 = await erc20.mint(wallet.address, amountToMint);
    await tx1.wait();
    console.log(`Minted ${amount} tokens to wallet: ${wallet.address}`);

    const tx2 = await erc20.mint(contractAddress, amountToMint);
    await tx2.wait();
    console.log(`Minted ${amount} tokens to contract: ${contractAddress}`);
};

const createLoan = async () => {
    const collateralAmountInWei = ethers.utils.parseEther("10");
    const debtAmountInWei = ethers.utils.parseUnits("5", 18);

    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    const tx = await contract.createLoan(debtAmountInWei, {
        value: collateralAmountInWei,
    });
    const receipt = await tx.wait();

    const loanCreatedEvent = receipt.events.find(
        (event: any) => event.event === "LoanCreated"
    );

    const loanId = loanCreatedEvent.args.loanId;
    console.log(`Loan created with ID: ${loanId}`);

    loanIds.push(loanId);

    return loanId;
};

const setupAVS = async () => {
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);
    const price = ethers.utils.parseEther("1");

    const tx = await contract.setup(
        erc20MockAddress,
        price,
        ethers.utils.parseEther("1")
    );

    await tx.wait();
};

const getETHBalances = async () => {
    const walletBalance = await provider.getBalance(wallet.address);
    const contractBalance = await provider.getBalance(contractAddress);

    console.log(`Wallet ETH Balance: ${ethers.utils.formatEther(walletBalance)}`);
    console.log(`Contract ETH Balance: ${ethers.utils.formatEther(contractBalance)}`);
};

const getLoanById = async (loanId: number) => {
    const loan = await contract.getLoanById(loanId);
    // console.log("🚀 ~ getLoanById ~ loan:", loan)

    return loan;
};

const getLoanHealthRatio = async (loan: any) => {
    const debtTokenPrice = await contract.debtTokenPriceInWei();

    const collateralValueInWei = loan.collateralAmount;
    const debtValueInWei = loan.debtAmount.mul(debtTokenPrice);

    const healthRatio = collateralValueInWei.mul(ethers.constants.WeiPerEther).mul(100).div(debtValueInWei);

    return Number(healthRatio) / 100;
};

const approveERC20ToContract = async (amount: ethers.BigNumber) => {
    console.log("🚀 ~ approveERC20ToContract ~ amount:", amount)
    const tx = await erc20Contract.approve(contractAddress, amount);
    await tx.wait();
    console.log(`Approved ${ethers.utils.formatUnits(amount, 18)} tokens for contract ${contractAddress}.`);
};

const liquidateLoan = async (loanId: number) => {
    const tx = await contract.liquidateLoan(loanId);
    await tx.wait();
};

const monitorDebtTokenPriceChange = async () => {
    contract.on("DebtTokenPriceUpdated", async (newPriceInWei: ethers.BigNumber) => {
        console.log(`Debt Token Price updated to: ${ethers.utils.formatEther(newPriceInWei)} ETH`);
        for (const loanId of loanIds) {
            const loan = await getLoanById(loanId);
            const healthRatio = await getLoanHealthRatio(loan);
            console.log("🚀 ~ contract.on ~ healthRatio:", healthRatio)

            if (healthRatio < LIQUIDATION_RATIO) {
                console.log(`Loan ${loanId} is undercollateralized. Consider liquidation.`);

                try {
                    await approveERC20ToContract(loan.debtAmount);
                    await liquidateLoan(loanId);
                    console.log(`Loan ${loanId} liquidated successfully.`);
                } catch (error) {
                    console.error(`Failed to liquidate loan ${loanId}:`, error);
                }
            }
        }
    });
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const changeDebtTokenPrice = async (newPriceInETH: string) => {
    const newPriceInWei = ethers.utils.parseEther(newPriceInETH);
    console.log(`Changing debt token price to ${newPriceInETH} ETH`);
    const tx = await contract.setDebtTokenPriceInWei(newPriceInWei);
    await tx.wait();
    console.log("Debt token price updated.");
};

const main = async () => {
    try {
        await registerOperator();
    } catch (e) {
        console.error("Error registering operator:", e);
    }

    await setupAVS();
    await mintTokens();

    await getETHBalances();
    await getERC20Balances();

    const loanId = await createLoan();
    const loan = await getLoanById(loanId);

    await getETHBalances();
    await getERC20Balances();

    await getLoanHealthRatio(loan);

    await monitorDebtTokenPriceChange();

    console.log("waiting for 5 seconds...");
    await sleep(5000);

    await changeDebtTokenPrice("3");
};

main().catch((error) => {
    console.error("Error in main function:", error);
});