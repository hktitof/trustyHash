// contract address
export const contractAddress = "0x7d6A2D9C614224A734bb0d06671B8ea13a95B935";

export const abi = [
  { inputs: [], name: "HashAlreadyExists", type: "error" },
  { inputs: [], name: "NoteLengthExceedsLimit", type: "error" },
  {
    inputs: [{ internalType: "bytes32", name: "hash", type: "bytes32" }],
    name: "getHashData",
    outputs: [
      {
        components: [
          { internalType: "bytes", name: "note", type: "bytes" },
          { internalType: "uint256", name: "dateStored", type: "uint256" },
          { internalType: "address", name: "storedBy", type: "address" },
        ],
        internalType: "struct Hashy.HashData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getHashesByAddress",
    outputs: [{ internalType: "bytes32[]", name: "", type: "bytes32[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "number", type: "uint256" }],
    name: "getLastHashes",
    outputs: [{ internalType: "bytes32[]", name: "", type: "bytes32[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "number", type: "uint256" }],
    name: "getLastHashesWithData",
    outputs: [
      {
        components: [
          { internalType: "bytes32", name: "hash", type: "bytes32" },
          {
            components: [
              { internalType: "bytes", name: "note", type: "bytes" },
              { internalType: "uint256", name: "dateStored", type: "uint256" },
              { internalType: "address", name: "storedBy", type: "address" },
            ],
            internalType: "struct Hashy.HashData",
            name: "hashData",
            type: "tuple",
          },
        ],
        internalType: "struct Hashy.HashAndData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getNumberOfHashesByAddress",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalHashes",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getTotalHashesByAddress",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "hashes",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "proofOfWork",
    outputs: [
      { internalType: "bytes", name: "note", type: "bytes" },
      { internalType: "uint256", name: "dateStored", type: "uint256" },
      { internalType: "address", name: "storedBy", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "proofOfWorkByAddress",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "hash", type: "bytes32" },
      { internalType: "bytes", name: "note", type: "bytes" },
    ],
    name: "storeHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalHashes",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "hash", type: "bytes32" }],
    name: "verifyHash",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];
