import React from "react";
import { useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import { abi, contractAddress } from "../../config/contract";
import { config } from "../../config/config";

export default function Index() {
  const [totalHashes, setTotalHashes] = useState<number | null>(null);

  // Fetch totalHashes from the contract
  const {
    data: totalHashesData,
    isError,
    isLoading,
  } = useReadContract({
    config,
    abi,
    address: contractAddress,
    functionName: "totalHashes",
    args: [],
  });

  useEffect(() => {
    if (totalHashesData) {
      const totalHashesNumber = Number(totalHashesData.toString());
      setTotalHashes(totalHashesNumber);
      console.log("Total Hashes:", totalHashesNumber);
    }
  }, [totalHashesData]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Total Hashes</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error fetching total hashes</p>}
      {totalHashes !== null && (
        <p>
          Total Hashes: <strong>{totalHashes}</strong>
        </p>
      )}
    </div>
  );
}
