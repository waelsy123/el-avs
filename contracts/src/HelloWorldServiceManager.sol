// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@eigenlayer/contracts/libraries/BytesLib.sol";
import "@eigenlayer/contracts/core/DelegationManager.sol";
import "@eigenlayer-middleware/src/unaudited/ECDSAServiceManagerBase.sol";
import "@eigenlayer-middleware/src/unaudited/ECDSAStakeRegistry.sol";
import "@openzeppelin-upgrades/contracts/utils/cryptography/ECDSAUpgradeable.sol";
import "@eigenlayer/contracts/permissions/Pausable.sol";
import {IRegistryCoordinator} from "@eigenlayer-middleware/src/interfaces/IRegistryCoordinator.sol";
import "./IHelloWorldServiceManager.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "forge-std/console.sol";

contract HelloWorldServiceManager is ECDSAServiceManagerBase, Pausable {
    using BytesLib for bytes;
    using ECDSAUpgradeable for bytes32;

    /* STORAGE */
    uint32 public latestLoanId;
    uint256 public liquidationRatio = 1 ether;
    IERC20 public debtToken;
    uint256 public debtTokenPriceInWei;

    struct Loan {
        address borrower;
        uint256 collateralAmount; // in wei
        uint256 debtAmount; // in debt tokens
        bool isLiquidated;
    }

    mapping(uint32 => Loan) public loans;

    /* MODIFIERS */
    modifier onlyOperator() {
        require(
            ECDSAStakeRegistry(stakeRegistry).operatorRegistered(msg.sender) ==
                true,
            "Operator must be the caller"
        );
        _;
    }

    constructor(
        address _avsDirectory,
        address _stakeRegistry,
        address _delegationManager
    )
        ECDSAServiceManagerBase(
            _avsDirectory,
            _stakeRegistry,
            address(0), // we do not need to deal with payments
            _delegationManager
        )
    {}

    function setup(
        address _debtToken,
        uint256 _priceInWei,
        uint256 _liquidationRatio
    ) public {
        liquidationRatio = _liquidationRatio;
        debtToken = IERC20(_debtToken);
        setDebtTokenPriceInWei(_priceInWei);
    }

    // for demo
    function setDebtTokenPriceInWei(uint256 _priceInWei) public {
        debtTokenPriceInWei = _priceInWei;
        emit DebtTokenPriceUpdated(_priceInWei);
    }

    function getLoanById(uint32 loanId) public view returns (Loan memory) {
        Loan memory loan = loans[loanId];
        return loan;
    }

    function createLoan(
        uint256 debtAmountInWei
    ) external payable returns (uint32) {
        uint32 loanId = latestLoanId;

        require(msg.value > 0, "Collateral required");
        require(debtTokenPriceInWei > 0, "Debt token price not set");

        // Calculate the value of the collateral in wei and the value of the debt in wei
        uint256 collateralValueInWei = msg.value;
        console.log("collateralValueInWei :", collateralValueInWei);

        uint256 debtValueInWei = (debtAmountInWei * debtTokenPriceInWei) /
            1 ether;

        console.log("debtValueInWei :", debtValueInWei);

        // Ensure that the collateral value respects the liquidation ratio
        uint256 requiredCollateral = (debtValueInWei * liquidationRatio) /
            1 ether;

        console.log("requiredCollateral :", requiredCollateral);

        require(
            collateralValueInWei > requiredCollateral,
            "Insufficient collateral for the requested loan"
        );

        Loan memory newLoan = Loan({
            borrower: msg.sender,
            collateralAmount: msg.value,
            debtAmount: debtAmountInWei,
            isLiquidated: false
        });

        loans[loanId] = newLoan;
        debtToken.transfer(msg.sender, debtAmountInWei);

        emit LoanCreated(loanId, msg.sender, msg.value, debtAmountInWei);
        latestLoanId += 1;

        return loanId;
    }

    function payLoan(uint32 loanId) external {
        Loan storage loan = loans[loanId];

        require(!loan.isLiquidated, "Loan already liquidated");
        require(msg.sender == loan.borrower, "Only borrower can pay the loan");
        require(debtTokenPriceInWei > 0, "Debt token price not set");

        debtToken.transferFrom(msg.sender, address(this), loan.debtAmount);
        payable(msg.sender).transfer(loan.collateralAmount);
        loan.collateralAmount = 0;
        loan.debtAmount = 0;
        loan.isLiquidated = true;

        emit LoanRepaid(loanId, msg.sender);
    }

    function liquidateLoan(uint32 loanId) external onlyOperator {
        require(
            operatorHasMinimumWeight(msg.sender),
            "Operator does not have match the weight requirements"
        );

        Loan storage loan = loans[loanId];

        require(!loan.isLiquidated, "Loan already liquidated");
        require(debtTokenPriceInWei > 0, "Debt token price not set");

        uint256 collateralRatio = getLoanHealthRatio(loanId);

        require(
            collateralRatio < liquidationRatio,
            "Collateral still sufficient"
        );

        debtToken.transferFrom(msg.sender, address(this), loan.debtAmount);

        payable(msg.sender).transfer(loan.collateralAmount);

        loan.isLiquidated = true;

        emit LoanLiquidated(loanId, msg.sender, loan.collateralAmount);
    }

    function getLoanHealthRatio(uint32 loanId) public view returns (uint256) {
        Loan memory loan = loans[loanId];
        uint256 debtValueInWei = loan.debtAmount * debtTokenPriceInWei;
        if (debtValueInWei == 0) return 0;
        return ((loan.collateralAmount * 1 ether) * 1 ether) / debtValueInWei;
    }

    /* EVENTS */
    event DebtTokenPriceUpdated(uint256 newPriceInWei);
    event LoanCreated(
        uint32 loanId,
        address borrower,
        uint256 collateralAmount,
        uint256 debtAmount
    );
    event LoanLiquidated(
        uint32 loanId,
        address operator,
        uint256 collateralAmount
    );
    event LoanRepaid(uint32 loanId, address borrower);

    // HELPER

    function operatorHasMinimumWeight(
        address operator
    ) public view returns (bool) {
        return
            ECDSAStakeRegistry(stakeRegistry).getOperatorWeight(operator) >=
            ECDSAStakeRegistry(stakeRegistry).minimumWeight();
    }
}
