import { useReadContract } from "wagmi";
import { config } from "../../config/config";
import { abi, contractAddress } from "../../config/contract";
import { useEffect, useState } from "react";

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
export default function StatisticsTable({}) {
  // declare totalHashes state
  const [totalHashes, setTotalHashes] = useState<Number | null>(null);

  // declare hashes state
  const [hashes, setHashes] = useState<Hash | null>(null);

  const { data } = useReadContract({
    config,
    abi,
    address: contractAddress,
    functionName: "totalHashes",
    args: [],
  });

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

  // print result
  console.log("Result : ", totalHashes);

  // print result
  console.log("Result : ", hashes);
  return (
    <>
      <div className="flex  items-center justify-center  ">
        <div className="flex items-center justify-center ">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
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
                  {/* loop over hashes and display the data */}
                  {hashes?.map((hash, index) => {
                    return (
                      <tr key={index} className={index % 2 === 0 ? "bg-white border-b" : "bg-gray-50 border-b"}>
                        <td className="py-4 px-6">{index + 1}</td>
                        <td className="py-4 px-6">{shortOwnerAddressString(hash.hashData.storedBy)}</td>
                        <td className="py-4 px-6">{shortHashString(hash.hash)}</td>
                        <td className="py-4 px-6">{convertTimestampToDate(hash.hashData.dateStored)}</td>
                        <td className="py-4 px-6">{hexToString(hash.hashData.note)}</td>
                      </tr>
                    );
                  })}
                  {/* add a loading skeleton that with bouncing up and down when reading from smart contract*/}
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
                </tbody>
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
