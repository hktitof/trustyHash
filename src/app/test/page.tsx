"use client";
import React from "react";
import { useReadContract } from "wagmi";
import { smartContractABI, smartContractAddress } from "../../../config/smartContract";
import { sepolia } from "viem/chains";

export default function Page() {
  const {
    data: totalHashes,
    isPending,
    error,
  } = useReadContract({
    address: smartContractAddress,
    abi: smartContractABI,
    functionName: "getTotalHashes",
    chainId: sepolia.id,
  });

  // print the total hashes
  console.log("totalHashes : ", totalHashes);
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <button
      style={{ cursor: "pointer" }}
      className="px-5 py-2 flex space-x-2 items-center font-extrabold bg-gradient-to-r from-emerald-400
       to-blue-500 rounded-lg text-white bg-black hover:bg-red-400 hover:cursor-pointer"
    >
      <span>Connect</span>
    </button>
  );
}
