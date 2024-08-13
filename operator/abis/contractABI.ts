export const contractABI = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "_avsDirectory",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_stakeRegistry",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_delegationManager",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_debtToken",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "allTaskHashes",
        "inputs": [
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "allTaskResponses",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "avsDirectory",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "createAVSRewardsSubmission",
        "inputs": [
            {
                "name": "rewardsSubmissions",
                "type": "tuple[]",
                "internalType": "struct IRewardsCoordinator.RewardsSubmission[]",
                "components": [
                    {
                        "name": "strategiesAndMultipliers",
                        "type": "tuple[]",
                        "internalType": "struct IRewardsCoordinator.StrategyAndMultiplier[]",
                        "components": [
                            {
                                "name": "strategy",
                                "type": "address",
                                "internalType": "contract IStrategy"
                            },
                            {
                                "name": "multiplier",
                                "type": "uint96",
                                "internalType": "uint96"
                            }
                        ]
                    },
                    {
                        "name": "token",
                        "type": "address",
                        "internalType": "contract IERC20"
                    },
                    {
                        "name": "amount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "startTimestamp",
                        "type": "uint32",
                        "internalType": "uint32"
                    },
                    {
                        "name": "duration",
                        "type": "uint32",
                        "internalType": "uint32"
                    }
                ]
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "createLoan",
        "inputs": [
            {
                "name": "debtAmount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "createNewTask",
        "inputs": [
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "debtToken",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IERC20"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "debtTokenPriceInWei",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "deregisterOperatorFromAVS",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getLoanById",
        "inputs": [
            {
                "name": "loanId",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "tuple",
                "internalType": "struct HelloWorldServiceManager.Loan",
                "components": [
                    {
                        "name": "borrower",
                        "type": "address",
                        "internalType": "address"
                    },
                    {
                        "name": "collateralAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "debtAmount",
                        "type": "uint256",
                        "internalType": "uint256"
                    },
                    {
                        "name": "isLiquidated",
                        "type": "bool",
                        "internalType": "bool"
                    }
                ]
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "getOperatorRestakedStrategies",
        "inputs": [
            {
                "name": "_operator",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address[]",
                "internalType": "address[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getRestakeableStrategies",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address[]",
                "internalType": "address[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "latestLoanId",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "latestTaskNum",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "liquidateLoan",
        "inputs": [
            {
                "name": "loanId",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "liquidationRatio",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "loans",
        "inputs": [
            {
                "name": "",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "outputs": [
            {
                "name": "borrower",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "collateralAmount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "debtAmount",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "isLiquidated",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "operatorHasMinimumWeight",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pause",
        "inputs": [
            {
                "name": "newPausedStatus",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "pauseAll",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "paused",
        "inputs": [
            {
                "name": "index",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "paused",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pauserRegistry",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IPauserRegistry"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "payLoan",
        "inputs": [
            {
                "name": "loanId",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "registerOperatorToAVS",
        "inputs": [
            {
                "name": "operator",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "operatorSignature",
                "type": "tuple",
                "internalType": "struct ISignatureUtils.SignatureWithSaltAndExpiry",
                "components": [
                    {
                        "name": "signature",
                        "type": "bytes",
                        "internalType": "bytes"
                    },
                    {
                        "name": "salt",
                        "type": "bytes32",
                        "internalType": "bytes32"
                    },
                    {
                        "name": "expiry",
                        "type": "uint256",
                        "internalType": "uint256"
                    }
                ]
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "respondToTask",
        "inputs": [
            {
                "name": "task",
                "type": "tuple",
                "internalType": "struct IHelloWorldServiceManager.Task",
                "components": [
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "taskCreatedBlock",
                        "type": "uint32",
                        "internalType": "uint32"
                    }
                ]
            },
            {
                "name": "referenceTaskIndex",
                "type": "uint32",
                "internalType": "uint32"
            },
            {
                "name": "signature",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "rewardsInitiator",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "setDebtTokenPriceInWei",
        "inputs": [
            {
                "name": "_priceInWei",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setPauserRegistry",
        "inputs": [
            {
                "name": "newPauserRegistry",
                "type": "address",
                "internalType": "contract IPauserRegistry"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setRewardsInitiator",
        "inputs": [
            {
                "name": "newRewardsInitiator",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "stakeRegistry",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "unpause",
        "inputs": [
            {
                "name": "newPausedStatus",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "updateAVSMetadataURI",
        "inputs": [
            {
                "name": "_metadataURI",
                "type": "string",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "DebtTokenPriceUpdated",
        "inputs": [
            {
                "name": "newPriceInWei",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Initialized",
        "inputs": [
            {
                "name": "version",
                "type": "uint8",
                "indexed": false,
                "internalType": "uint8"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LoanCreated",
        "inputs": [
            {
                "name": "loanId",
                "type": "uint32",
                "indexed": false,
                "internalType": "uint32"
            },
            {
                "name": "borrower",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "collateralAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "debtAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LoanLiquidated",
        "inputs": [
            {
                "name": "loanId",
                "type": "uint32",
                "indexed": false,
                "internalType": "uint32"
            },
            {
                "name": "operator",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "collateralAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "debtTokensPaid",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "LoanRepaid",
        "inputs": [
            {
                "name": "loanId",
                "type": "uint32",
                "indexed": false,
                "internalType": "uint32"
            },
            {
                "name": "borrower",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "NewTaskCreated",
        "inputs": [
            {
                "name": "taskIndex",
                "type": "uint32",
                "indexed": true,
                "internalType": "uint32"
            },
            {
                "name": "task",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IHelloWorldServiceManager.Task",
                "components": [
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "taskCreatedBlock",
                        "type": "uint32",
                        "internalType": "uint32"
                    }
                ]
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Paused",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newPausedStatus",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PauserRegistrySet",
        "inputs": [
            {
                "name": "pauserRegistry",
                "type": "address",
                "indexed": false,
                "internalType": "contract IPauserRegistry"
            },
            {
                "name": "newPauserRegistry",
                "type": "address",
                "indexed": false,
                "internalType": "contract IPauserRegistry"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "RewardsInitiatorUpdated",
        "inputs": [
            {
                "name": "prevRewardsInitiator",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "newRewardsInitiator",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TaskResponded",
        "inputs": [
            {
                "name": "taskIndex",
                "type": "uint32",
                "indexed": true,
                "internalType": "uint32"
            },
            {
                "name": "task",
                "type": "tuple",
                "indexed": false,
                "internalType": "struct IHelloWorldServiceManager.Task",
                "components": [
                    {
                        "name": "name",
                        "type": "string",
                        "internalType": "string"
                    },
                    {
                        "name": "taskCreatedBlock",
                        "type": "uint32",
                        "internalType": "uint32"
                    }
                ]
            },
            {
                "name": "operator",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Unpaused",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newPausedStatus",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    }
];