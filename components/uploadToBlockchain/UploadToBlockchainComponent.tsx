import React, { useEffect, useState } from "react";
import { ethers, toUtf8Bytes } from "ethers";
import { useAccount, useWriteContract } from "wagmi";
import { config } from "../../config/config";
import { abi, contractAddress } from "../../config/contract";

const UploadToBlockchainComponent = ({ fileName, fileHash, onUpload, setReset, fileSize }) => {
  const [note, setNote] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const result = useWriteContract({
    config,
  });
  const { writeContract } = result;
  const hash = "0x2b0b912f6794ecf10c0206490d112cc3c64a8625326a5dc0777ece72af1304ab";

  const { address } = useAccount();
  const [isClient, setIsClient] = useState(false);
  // remove the zero from right of notea
  const { chainId } = useAccount();

  // Use useEffect to ensure code runs only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      await onUpload({ fileName, fileHash, note });
      // Handle successful upload (e.g., show success message, reset form, etc.)
    } catch (error) {
      console.error("Upload failed:", error);
      // Handle error (e.g., show error message)
    } finally {
      setIsUploading(false);
    }
  };

  // add on change event to the input field to handle the input text note to be maximum 25 bytes
  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const note = event.target.value;
    const noteBytes = toUtf8Bytes(note);

    if (noteBytes.length > 25) {
      // If the byte length exceeds 25, slice the string to ensure the byte length is within 25
      const trimmedNote = new TextDecoder().decode(noteBytes.slice(0, 25));
      setNote(trimmedNote);
      console.log("Trimmed note:", trimmedNote);
    } else {
      setNote(note);
      console.log("Note:", note);
    }
  };

  // convert file size from bytes to human readable format
  const convertFileSize = (size: number) => {
    const units = ["bytes", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  if (!isClient) {
    return null; // Ensure the component only renders on the client
  }

  // print result
  console.log("Result : ", result);

  return (
    <div className="max-w-md mx-auto mt-10 px-6 pb-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Confirm Upload to Blockchain</h2>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">File Name:</p>
        <p className="text-sm text-gray-600">{fileName}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">File Hash:</p>
        <p className="text-sm text-gray-600 break-all">{fileHash}</p>
      </div>

      {/* // add file size here */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">File Size:</p>
        <p className="text-sm text-gray-600">{convertFileSize(fileSize)}</p>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="note">
          Add a Note max 25 chars (optional)
        </label>
        <textarea
          id="note"
          value={note}
          onChange={handleNoteChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={3}
          placeholder="Enter any additional information..."
        />
        {/* // add message error here if the note is more than 25 bytes */}
        {note.length > 25 && <p className="text-xs text-red-500">Note must be 25 bytes or less.</p>}
      </div>

      <button
        onClick={async () => {
          console.log("clicked !!");
          // print note length
          console.log("Note length:", note.length);

          const noteBytes = ethers.encodeBytes32String(note);

          // print note bytes
          console.log("Note bytes:", noteBytes);

          // fix note bytes to 25 bytes only count from left to the right
          const noteBytesFixed = noteBytes.slice(0, 24);
          const result = writeContract({
            abi,
            address: contractAddress,
            functionName: "storeHash",
            args: [hash, noteBytesFixed],
            chain: undefined,
            account: address,
          });
          // print result
          console.log("Result when submitting : ", result);
          console.log("Finished clicking !!");
        }}
        disabled={isUploading}
        className={`w-full ${
          isUploading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      >
        {isUploading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Uploading...
          </span>
        ) : (
          "Upload to Blockchain"
        )}
      </button>
      {/* // add try a different file text here underlining the text */}
      <p className="text-sm text-gray-700 mt-4 text-center">
        <a
          onClick={() => {
            setReset(true);
          }}
          href="#"
          className="underline"
        >
          Try a different file
        </a>
      </p>
    </div>
  );
};

export default UploadToBlockchainComponent;
