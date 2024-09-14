import { useReadContract } from "wagmi";
import { config } from "../../config/config";
import { abi, contractAddress } from "../../config/contract";
import { useEffect, useState, useMemo, useRef } from "react";
import UploadFile from "../uploadFile/UploadFile";

type Hash = [
  {
    hash: string;
    hashData: {
      note: string;
      dateStored: bigint;
      storedBy: string;
    };
  }
];
export default function StatisticsTable({ isHashExist, existedHash, hashes, setHashes, setIsHashExist, isFileHashed }) {
  const uploadFileRef = useRef<{ resetAllStates: () => void }>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" or "desc"

  const [copiedItem, setCopiedItem] = useState(null);

  // declare totalHashes state
  const [totalHashes, setTotalHashes] = useState<Number | null>(null);

  // declare hashes state
  // const [hashes, setHashes] = useState<Hash | null>(null);

  const { data } = useReadContract({
    config,
    abi,
    address: contractAddress,
    functionName: "totalHashes",
    args: [],
  });
  // print rendering StatisticsTable
  console.log("Rendering StatisticsTable getting hashes");
  // print hashes state
  console.log("hashes", hashes);

  useEffect(() => {
    if (data) {
      // convert data BigNumber to Number
      const dataToString = data.toString();

      // convert dataToString to Number
      const dataToNumber = Number(dataToString);

      // set totalHashes state
      setTotalHashes(dataToNumber);
    }
  }, [data]);

  // call the function getLastHashesWithData
  const result = useReadContract({
    config,
    abi,
    address: contractAddress,
    functionName: "getLastHashesWithData",
    args: [data],
  });

  useEffect(() => {
    if (result.data) {
      // set hashes state
      setHashes(result.data as Hash);
    }
  }, [result.data]);

  useEffect(() => {
    if (isHashExist) {
      setSearchTerm(existedHash);

      // if (uploadFileRef.current) {
      //   uploadFileRef.current.resetAllStates();
      // }
    }
  }, [existedHash, isHashExist, setIsHashExist]);

  // empty search input if isFileHashed is true and isHashExist is false
  useEffect(() => {
    if (isFileHashed && !isHashExist) {
      setSearchTerm("");
    }
  }, [isFileHashed, isHashExist]);

  // print rendering StatisticsTable
  console.log("Rendering StatisticsTable");
  // print existedHash
  console.log("existedHash", existedHash);

  // print isHashExist
  console.log("isHashExist", isHashExist);

  // convert bigInt timestamp to date
  const convertTimestampToDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000).toLocaleString();
    // convert date to readable format

    return date;
  };

  // convert bytes to string, like "0x5465737420310000000000" to "Test 1"
  function hexToString(hex) {
    // Remove the '0x' prefix if it exists
    if (hex.startsWith("0x")) {
      hex = hex.slice(2);
    }

    let str = "";
    for (let i = 0; i < hex.length; i += 2) {
      const byte = hex.slice(i, i + 2);
      // Convert each byte to a character
      const char = String.fromCharCode(parseInt(byte, 16));
      // Break if null byte is encountered (if needed)
      if (char === "\0") break;
      str += char;
    }
    return str;
  }

  // function to short the hash string text and add "..." in between
  function shortHashString(hash: string) {
    return hash.slice(0, 6) + "..." + hash.slice(hash.length - 6);
  }

  // function to short the owner address string text and add "..." in between
  function shortOwnerAddressString(owner: string) {
    return owner.slice(0, 6) + "..." + owner.slice(owner.length - 6);
  }
  function sortHashes(hashes, sortOrder) {
    if (!hashes) return null;

    return [...hashes].sort((a, b) => {
      const dateA = Number(a.hashData.dateStored);
      const dateB = Number(b.hashData.dateStored);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }
  const filteredAndSortedHashes = useMemo(() => {
    if (!hashes) return null;

    const filtered = [...hashes].filter(
      hash =>
        hash.hashData.storedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hash.hash.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = filtered.sort((a, b) => {
      const dateA = Number(a.hashData.dateStored);
      const dateB = Number(b.hashData.dateStored);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return sorted;
  }, [hashes, searchTerm, sortOrder]);

  const copyToClipboard = (text, item) => {
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

  return (
    <>
      <div className="flex  items-center justify-center  ">
        <div className="flex items-center justify-center ">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <div className="mb-4 flex items-center justify-between w-full">
                <input
                  type="text"
                  placeholder="Search by owner address or hash"
                  className="px-4 py-2 border rounded-md flex-grow mr-4"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  onClick={() => {
                    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
                    setSortOrder(newSortOrder);
                  }}
                >
                  Sort by Date {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Asset ID
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Owner Address
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Hash Value
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Time
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Owner Note
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedHashes?.map((hash, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white border-b" : "bg-gray-50 border-b"}>
                      <td className="py-4 px-6">{index + 1}</td>
                      <td className="py-4 px-6 relative group">
                        <div
                          className="flex items-center justify-between hover:cursor-pointer"
                          onClick={() => copyToClipboard(hash.hashData.storedBy, `address-${index}`)}
                        >
                          <span>{shortOwnerAddressString(hash.hashData.storedBy)}</span>
                          <button
                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => copyToClipboard(hash.hashData.storedBy, `address-${index}`)}
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
                      <td className="py-4 px-6 relative group">
                        <div
                          className="flex items-center justify-between hover:cursor-pointer"
                          onClick={() => copyToClipboard(hash.hash, `hash-${index}`)}
                        >
                          <span>{shortHashString(hash.hash)}</span>
                          <button
                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => copyToClipboard(hash.hash, `hash-${index}`)}
                          >
                            {copiedItem === `hash-${index}` ? (
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
                      <td className="py-4 px-6">{convertTimestampToDate(hash.hashData.dateStored)}</td>
                      <td className="py-4 px-6">{hexToString(hash.hashData.note)}</td>
                    </tr>
                  ))}

                  {hashes == null &&
                    Array.from({ length: 3 }).map((_, index) => (
                      <tr key={index}>
                        <td className="py-1 pl-[24px] bg-white">
                          <div className="h-4 bg-gray-100 rounded animate-pulse w-3"></div>
                        </td>
                        <td className="py-4 px-6 bg-white">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                        </td>
                        <td className="py-4 px-6 bg-white">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                        </td>
                        <td className="py-4 px-6 bg-white">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-38"></div>
                        </td>
                        <td className="py-4 px-6 bg-white">
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                        </td>
                      </tr>
                    ))}
                </tbody>{" "}
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-white font-semibold py-10 text-center -mt-20">
        Made with{" "}
        <a
          href="https://chat.openai.com/g/g-8gGyAPc6i-material-tailwind-gpt"
          className="text-white hover:text-gray-800"
          target="_blank"
          rel="noreferrer"
        >
          MT GPT
        </a>
        based on
        <a
          href="https://www.material-tailwind.com"
          className="text-blueGray-500 hover:text-blueGray-800"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Material Tailwind Framework
        </a>
        .
      </div>
    </>
  );
}
