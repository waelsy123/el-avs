// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.12;

// import "../src/LendingProtocolServiceManager.sol" as hwsm;
// import {LendingProtocolTaskManager} from "../src/LendingProtocolTaskManager.sol";
// import {MockAVSDeployer} from "@eigenlayer-middleware/test/utils/MockAVSDeployer.sol";
// import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

// contract LendingProtocolTaskManagerTest is MockAVSDeployer {
//     incsqsm.LendingProtocolServiceManager sm;
//     incsqsm.LendingProtocolServiceManager smImplementation;
//     LendingProtocolTaskManager tm;
//     LendingProtocolTaskManager tmImplementation;

//     address operator =
//         address(uint160(uint256(keccak256(abi.encodePacked("operator")))));
//     address generator =
//         address(uint160(uint256(keccak256(abi.encodePacked("generator")))));

//     function setUp() public {
//         _setUpBLSMockAVSDeployer();

//         tmImplementation = new LendingProtocolTaskManager(
//             incsqsm.IRegistryCoordinator(address(registryCoordinator))
//         );

//         // Third, upgrade the proxy contracts to use the correct implementation contracts and initialize them.
//         tm = LendingProtocolTaskManager(
//             address(
//                 new TransparentUpgradeableProxy(
//                     address(tmImplementation),
//                     address(proxyAdmin),
//                     abi.encodeWithSelector(
//                         tm.initialize.selector,
//                         pauserRegistry,
//                         registryCoordinatorOwner
//                     )
//                 )
//             )
//         );
//     }

//     function testCreateNewTask() public {
//         cheats.prank(generator, generator);
//         tm.createNewTask("world");
//         assertEq(tm.latestTaskNum(), 1);
//     }
// }
