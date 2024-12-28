import { useState, useCallback, useRef } from "react";
import { keccak256 } from "ethers";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { smartContractAddress, smartContractABI } from "../config/smartContract";
import { ethers } from "ethers";
export default function FileUploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // Add this ref
  const [isHashing, setIsHashing] = useState(false);
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [note, setNote] = useState("");

  // Add these new states at the top with other states
  const [isStoring, setIsStoring] = useState(false);
  const [isStored, setIsStored] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.size <= 10 * 1024 * 1024) {
      setFile(droppedFile);
    } else {
      alert("File size should not exceed 10MB");
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const selectedFile = files[0];
    if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) {
      setFile(selectedFile);
    } else {
      alert("File size should not exceed 10MB");
    }
  };

  const removeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
    // Reset the input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const calculateHash = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async e => {
        try {
          if (!e.target?.result) {
            throw new Error("Failed to read file");
          }

          // Convert to Uint8Array if it's not already
          const content =
            e.target.result instanceof ArrayBuffer
              ? new Uint8Array(e.target.result)
              : new TextEncoder().encode(e.target.result as string);

          // Generate Keccak256 hash - this is Ethereum's preferred hash function
          const hash = keccak256(content);

          // The hash will already be in the correct format for Ethereum
          resolve(hash);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error("Failed to read file"));

      // Read the file as ArrayBuffer
      reader.readAsArrayBuffer(file);
    });
  };

  const handleHashFile = async () => {
    if (!file) return;

    try {
      setIsHashing(true);
      const hash = await calculateHash(file);
      setFileHash(hash);
    } catch (error) {
      console.error("Error hashing file:", error);
      alert("Error generating hash");
    } finally {
      setIsHashing(false);
    }
  };

  const { data: hash, error: contractError, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Replace storeHashInContract with Wagmi version
  const storeHashInContract = async (fileHash: string, note: string) => {
    if (note.length > 250) {
      setStorageError("Note cannot exceed 250 characters");
      return;
    }
    // print fileHash and note to console
    console.log("File Hash:", fileHash);
    console.log("Note:", note);
    const notenoteBytes = ethers.encodeBytes32String(note);
    writeContract({
      address: smartContractAddress,
      abi: smartContractABI,
      functionName: "storeHash",
      args: [fileHash, notenoteBytes],
    });
  };

  // Update renderStorageButton() to include note input
  const renderStorageButton = () => {
    if (isConfirmed) {
      return (
        <div className="flex items-center justify-center space-x-2 text-emerald-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Successfully stored on blockchain!</span>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="note" className="block text-sm font-medium text-white">
            Add a note (max 250 chars)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={e => setNote(e.target.value)}
            maxLength={250}
            className="w-full p-2 bg-gray-900 rounded text-white"
            rows={3}
            placeholder="Enter your note here..."
          />
          <p className="text-sm text-gray-400">{note.length}/250 characters</p>
        </div>
        <button
          onClick={() => fileHash && storeHashInContract(fileHash, note)}
          disabled={isPending || isConfirming || note.length > 250}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg
          ${
            isPending || isConfirming
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          }
          text-white font-medium transition-all duration-200`}
        >
          {isPending || isConfirming ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Storing on Blockchain...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <span>Store on Blockchain</span>
            </>
          )}
        </button>
        {contractError && <div className="text-red-400 text-sm bg-red-400/10 p-2 rounded overflow-hidden">{contractError.message}</div>}
        {storageError && (
          <div className="text-wrap text-red-400 text-sm bg-red-400/10 p-2 rounded overflow-hidden">{storageError}</div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-4/6">
        <div
          className={`relative border-2 border-dashed ${
            isDragging ? "border-emerald-400 bg-gray-700" : "border-gray-500 bg-gray-800"
          } rounded-lg p-12 text-center mb-4 transition-colors duration-200`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef} // Add this ref to the input
            type="file"
            className={`absolute inset-0 w-full h-full opacity-0 ${
              file ? "pointer-events-none" : "hover:cursor-pointer"
            }`}
            onChange={handleFileSelect}
            accept=".pdf,.doc,.txt"
          />
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 1000 1000" fill="currentColor" className="h-24 w-24 text-emerald-400">
              <path d="M760 356c66.667 0 123.333 22.667 170 68s70 100.667 70 166-23.333 120.667-70 166-103.333 68-170 68H570V634h106L500 404 326 634h104v190H182c-49.333 0-92-17.333-128-52S0 696 0 648c0-49.333 17.667-91.333 53-126s78.333-52 129-52c9.333 0 16 .667 20 2-1.333-8-2-20.667-2-38 0-72 26-133.333 78-184s114.667-76 188-76c60 0 113.333 17.333 160 52s78 79.333 94 134c18.667-2.667 32-4 40-4" />
            </svg>
          </div>
          {file ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <p className="text-emerald-400 font-bold">File Selected:</p>
                <div className="relative group">
                  <button
                    onClick={removeFile}
                    className="p-1 rounded-full transition-colors duration-200 hover:cursor-pointer"
                    title="Remove file"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 text-emerald-400"
                    >
                      <path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293a.999.999 0 11-1.414 1.414L12 13.414l-2.293 2.293a.997.997 0 01-1.414 0 .999.999 0 010-1.414L10.586 12 8.293 9.707a.999.999 0 111.414-1.414L12 10.586l2.293-2.293a.999.999 0 111.414 1.414L13.414 12l2.293 2.293z" />
                    </svg>
                  </button>
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Remove
                  </span>
                </div>
              </div>
              <p className="text-white font-medium">{file.name}</p>
              <p className="text-gray-400 text-sm">{formatFileSize(file.size)}</p>
            </div>
          ) : (
            <>
              <p className="text-white font-bold mb-2">Drop your file here or click to upload</p>
              <p className="text-sm text-gray-400">Supported formats: .pdf, .doc, .txt (max 10MB)</p>
            </>
          )}
        </div>

        <button
          className="hover:cursor-pointer flex justify-center space-x-2 w-full bg-gradient-to-r from-emerald-400 to-blue-500 text-white py-3 rounded-lg mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!file || isHashing}
          onClick={handleHashFile}
        >
          {isHashing ? (
            <span className="font-extrabold text-md">Calculating Hash...</span>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M3 4v5h2V5h4V3H4a1 1 0 00-1 1zm18 5V4a1 1 0 00-1-1h-5v2h4v4h2zm-2 10h-4v2h5a1 1 0 001-1v-5h-2v4zM9 21v-2H5v-4H3v5a1 1 0 001 1h5zM2 11h20v2H2z" />
              </svg>
              <span className="font-extrabold text-md">Hash & Verify</span>
            </>
          )}
        </button>
        {fileHash && file && (
          <div className="bg-gray-800 rounded-lg p-4 mb-4 space-y-4">
            <div className="space-y-2">
              <p className="text-white font-bold">File Hash (Keccak-256):</p>
              <div className="bg-gray-900 p-3 rounded flex items-center justify-between">
                <code className="text-emerald-400 text-sm break-all">{fileHash}</code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(fileHash);
                    alert("Hash copied to clipboard!");
                  }}
                  className="ml-2 p-2 hover:bg-gray-800 rounded transition-colors duration-200"
                  title="Copy hash"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-gray-400 hover:text-emerald-400"
                  >
                    <path d="M7 3h2v2H7V3zM4 9h2V7H4v2zm0 4h2v-2H4v2zm0 4h2v-2H4v2zm3 2h2v-2H7v2zM9 3h2v2H9V3zm4 0h2v2h-2V3zm4 0h2v2h-2V3zm-4 16h2v-2h-2v2zm4 0h2v-2h-2v2zM4 5h2V3H4v2zm16 0h-2V3h2v2zm0 4h-2V7h2v2zm0 4h-2v-2h2v2zm0 4h-2v-2h2v2zm0 4h-2v-2h2v2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Blockchain Storage Section */}
            <div className="border-t border-gray-700 pt-4">{renderStorageButton()}</div>
          </div>
        )}
      </div>
    </div>
  );
}
