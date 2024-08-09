import React from "react";
import { useState } from "react";
import { ethers } from "ethers";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState<string | null>(null);

  // Function to handle file upload and generate the hash
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      // Read the file as ArrayBuffer
      const arrayBuffer = await selectedFile.arrayBuffer();

      // Convert the ArrayBuffer to a Uint8Array
      const uint8Array = new Uint8Array(arrayBuffer);

      // Generate the hash using ethers' keccak256 function
      const fileHash = ethers.keccak256(uint8Array);
      setHash(fileHash);
    }
  };

  return (
    <div
      className="bg-gray-50 text-center px-4 rounded w-72 h-80 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed font-[sans-serif]"
    >
      <div className="py-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 mb-2 fill-gray-600 inline-block" viewBox="0 0 32 32">
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
          />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
          />
        </svg>
        <h4 className="text-base font-semibold text-gray-600">Drag and drop files here</h4>
      </div>

      <hr className="w-full border-gray-400 my-2" />

      <div className="py-6">
        <input
          type="file"
          id="uploadFile1"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="uploadFile1"
          className="block px-6 py-2.5 rounded text-gray-600 text-sm tracking-wider cursor-pointer font-semibold border-none outline-none bg-gray-200 hover:bg-gray-100"
        >
          Browse Files
        </label>
        <p className="text-xs text-gray-400 mt-4">PNG, JPG, SVG, WEBP, and GIF are Allowed.</p>
      </div>

      <div className="w-full">
        <p className="text-xs text-gray-400">Selected file: {file?.name || "None"}</p>
        {hash && (
          <p className="text-xs text-gray-400">File Hash: {hash}</p>
        )}
      </div>
    </div>
  );
}
