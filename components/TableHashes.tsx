import React, { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { ChevronLeft, ChevronRight } from "lucide-react";
export const smartContractAddress = "0x3458d2D8570bA57103c99b48F2184036A825c23A";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { smartContractABI } from "../config/smartContract";
// Contract config - you'll need to replace these with your actual values
const contractConfig = {
  address: smartContractAddress, // Replace with your contract address
  abi: smartContractABI,
};

interface HashEntry {
  hash: string;
  date: string;
  address: string;
  note: string;
}

export default function TableHashes() {
  const [currentPage, setCurrentPage] = useState(0);
  const [allHashes, setAllHashes] = useState<HashEntry[][]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const hashesPerPage = 20;
  const [copiedItem, setCopiedItem] = useState(null);

  const {
    data: totalHashes,
    isLoading: isTotalLoading,
    error,
  } = useReadContract({
    address: "0x3458d2D8570bA57103c99b48F2184036A825c23A",
    abi: contractConfig.abi,
    functionName: "getTotalHashes",
    onError: error => console.error("Error fetching total hashes", error),
    onEnd: () => console.log("Finished fetching total hashes"),
    onSubscribed: () => console.log("Subscribed to total hashes"),
  });

  const { data: lastHashesWithData, isPending: isHashesLoading } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: "getLastHashesWithData",
    args: [
      totalHashes && typeof totalHashes === "bigint"
        ? totalHashes < BigInt(hashesPerPage)
          ? totalHashes
          : BigInt(hashesPerPage * (currentPage + 1))
        : BigInt(0),
    ],
    query: {
      enabled: Boolean(totalHashes),
    },
  });

  // print error to the console
  if (error) {
    console.error("Error fetching total hashes", error);
  }

  useEffect(() => {
    if (lastHashesWithData && Array.isArray(lastHashesWithData)) {
      const newHashes = lastHashesWithData
        .slice(currentPage * hashesPerPage, (currentPage + 1) * hashesPerPage)
        .map(item => ({
          hash: item.hash,
          date: new Date(Number(item.hashData.dateStored) * 1000).toLocaleDateString(),
          address: item.hashData.storedBy,
          note: new TextDecoder().decode(
            typeof item.hashData.note === "string"
              ? Uint8Array.from(item.hashData.note, (c: string) => c.charCodeAt(0))
              : item.hashData.note
          ),
        }));

      setAllHashes(prev => {
        const newPages = [...prev];
        newPages[currentPage] = newHashes;
        return newPages;
      });
    }
  }, [lastHashesWithData, currentPage]);

  const filteredHashes =
    allHashes[currentPage]?.filter(
      item =>
        item.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.address.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const totalPages = totalHashes ? Math.ceil(Number(totalHashes) / hashesPerPage) : 0;
  const canGoForward = currentPage < totalPages - 1;
  const canGoBack = currentPage > 0;

  // print allHashes
  // convert totalHashes to string
  console.log("All Hashes : ", totalHashes);

  const totalPagesNum = totalPages;

  if (isTotalLoading || (isHashesLoading && !allHashes[currentPage])) {
    return (
      <div className="mt-16 flex justify-center items-center h-64 bg-gray-800 rounded-lg">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
          <p className="text-gray-400">Loading hashes...</p>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string, item: string) => {
    console.log("Copying:", text); // Debug log
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied successfully"); // Debug log
        setCopiedItem(item);
        setTimeout(() => setCopiedItem(null), 2000);
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  };

  // create a function that converts string which is a form of hex to string
  const noteToHexToString = (hex: string): string => {
    // print hex
    console.log("Hex : ", hex);
    let str = "";
    for (let i = 0; i < hex.length; i += 2) {
      // Extract a pair of hex characters and convert them to a decimal number
      const hexPair = hex.substr(i, 2);
      const decimal = parseInt(hexPair, 16);

      // Convert the decimal number to a character and append it to the result string
      str += String.fromCharCode(decimal);
    }
    return str;
  };

  return (
    <section className="mt-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-semibold">Recent Hashes {totalHashes ? `(${totalHashes.toString()})` : ""}</h2>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search hashes..."
            className="bg-gray-800 text-gray-300 pl-4 pr-4 py-2 rounded-lg text-sm w-64"
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="text-left p-4">Hash</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Wallet Address</th>
                <th className="text-left p-4">Note</th>
              </tr>
            </thead>
            <tbody>
              {filteredHashes.length > 0 ? (
                filteredHashes.map((item, index) => (
                  <tr
                    key={item.hash}
                    className={`border-t border-gray-700 text-gray-300 ${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"
                    }  transition-colors`}
                  >
                    <td className="py-4 px-6 relative group">
                      <div
                        className="flex items-center justify-between hover:cursor-pointer"
                        onClick={() => copyToClipboard(item.hash, `address-${index}`)}
                      >
                        <span>{item.hash.slice(0, 6) + "..." + item.hash.slice(item.hash.length - 6)}</span>
                        <button
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard(item.hash, `address-${index}`)}
                        >
                          {copiedItem === `address-${index}` ? (
                            <span className="text-green-500 text-xs">Copied!</span>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="p-4">{item.date}</td>
                    <td className="py-4 px-6 relative group">
                      <div
                        className="flex items-center justify-between hover:cursor-pointer"
                        onClick={() => copyToClipboard(item.address, `address-${index}`)}
                      >
                        <span>{item.address.slice(0, 6) + "..." + item.address.slice(item.address.length - 6)}</span>
                        <button
                          className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => copyToClipboard(item.address, `address-${index}`)}
                        >
                          {copiedItem === `address-${index}` ? (
                            <span className="text-green-500 text-xs">Copied!</span>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="p-4 truncate max-w-xs">{noteToHexToString(item.note)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-400">
                    No hashes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={!canGoBack}
          className={`p-2 rounded-lg ${
            canGoBack ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-gray-800 text-gray-600 cursor-not-allowed"
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-gray-400">
          Page {currentPage + 1} of {totalPagesNum}
        </span>
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={!canGoForward}
          className={`p-2 rounded-lg ${
            canGoForward
              ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
              : "bg-gray-800 text-gray-600 cursor-not-allowed"
          }`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
