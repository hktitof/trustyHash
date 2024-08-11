import React, { useState } from "react";
import { ethers } from "ethers";
import UploadHashButton from "../uploadHashButton/UploadHashButton";
// import getBytes function from ethers

// OR

import { concat, keccak256, getBytes } from "ethers";
// import arrayify

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  // state that will track is the file is selected so we can show spinner for hashing
  const [isFileHashing, setIsFileHashing] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  


  const handleFileChange = async (selectedFile: File | null) => {
    setFile(selectedFile);
  
    if (selectedFile) {
      setIsFileHashing(true);
      setProgress(0);
  
      console.log("File is hashing...");
  
      const chunkSize = 1024 * 1024; // 1MB per chunk
      const chunks = Math.ceil(selectedFile.size / chunkSize);
      const fileData: Uint8Array[] = [];
      let bytesRead = 0;
  
      for (let i = 0; i < chunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, selectedFile.size);
        const chunk = selectedFile.slice(start, end);
  
        const arrayBuffer = await chunk.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
  
        fileData.push(uint8Array);
  
        // Update progress to reflect the current state
        bytesRead += uint8Array.length;
        setProgress(Math.round((bytesRead / selectedFile.size) * 100));
      }
  
      // Concatenate all Uint8Array chunks into a single Uint8Array
      const totalLength = fileData.reduce((acc, chunk) => acc + chunk.length, 0);
      const concatenatedData = new Uint8Array(totalLength);
  
      let offset = 0;
      for (const chunk of fileData) {
        concatenatedData.set(chunk, offset);
        offset += chunk.length;
      }
  
      // Ensure progress reaches 98% before finalizing
      setProgress(98);
  
      // Generate the final hash
      try {
        const finalHash = keccak256(concatenatedData);
  
        // Set the final hash and progress to 100%
        setHash(finalHash);
        setProgress(100);
      } catch (error) {
        console.error("Error generating hash:", error);
      } finally {
        setIsFileHashing(false);
        console.log("File is hashed");
      }
    }
  };
  
  
  
  
  
  
  
  

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // print isFileHashing state on the console
  console.log("isFileHashing : ", isFileHashing);

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="bg-gray-50 text-center px-4 rounded w-72 h-80 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed font-[sans-serif]"
      >
        {isFileHashing && (
          <div className="bg-gray-50 bg-opacity-90 w-72 h-80 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed font-[sans-serif]">
            <div className="text-gray-1 font-black">Please wait the file is Hashing</div>
            <div className="text-gray-600 mt-4">{progress}%</div>
            <svg
              className="animate-spin h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0c4.418 0 8 3.582 8 8"></path>
            </svg>
          </div>
        )}
        {!isFileHashing && (
          <>
            <div className="py-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 mb-2 fill-gray-600 inline-block"
                viewBox="0 0 32 32"
              >
                <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
              </svg>
              <h4 className="text-base font-semibold text-gray-600">Drag and drop files here</h4>
            </div>
            <hr className="w-full border-gray-400 my-2" />
            <div className="py-6">
              <input
                type="file"
                id="uploadFile1"
                className="hidden"
                onChange={e => handleFileChange(e.target.files?.[0] || null)}
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
              {hash && <p className="text-xs text-gray-400">File Hash: {hash}</p>}
            </div>
          </>
        )}
      </div>
      <UploadHashButton />
    </div>
  );
}
