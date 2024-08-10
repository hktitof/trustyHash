import * as React from "react";
import { useWriteContract, useAccount } from "wagmi";
import { getAccount } from "@wagmi/core";
import { config } from "../../config/config";
import { abi, contractAddress } from "../../config/contract";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
export default function UploadHashButton() {
  const { address } = useAccount();
  const [isClient, setIsClient] = useState(false);
  // Use useEffect to ensure code runs only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const result = useWriteContract({
    config,
  });
  const { writeContract } = result;
  const hash = "0x935c3a5341f4b649158f3da138d5dc8f6033bd7166d7603d9d2efc40ac3b3877";
  const note = ethers.encodeBytes32String("Test 1");

  // slice the note to 24 bytes
  const notea = note.slice(0, 24);

  // remove the zero from right of notea
  const { chainId } = useAccount();

  if (!isClient) {
    return null; // Ensure the component only renders on the client
  }

  // print result
  console.log("Result : ", result);

  return (
    <div className="w-full flex justify-center">
      {address ? (
        <button
          onClick={async () => {
            console.log("clicked !!");
            const result = writeContract({
              abi,
              address: contractAddress,
              functionName: "storeHash",
              args: [hash, notea],
              chain: undefined,
              account: address,
            });
            console.log("Finished clicking !!");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Upload to Blockchain
        </button>
      ) : (
        <span className="">Connect to wallet</span>
      )}
    </div>
  );
}
