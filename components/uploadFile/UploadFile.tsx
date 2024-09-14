import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import UploadHashButton from "../uploadHashButton/UploadHashButton";
import UploadToBlockchainComponent from "../uploadToBlockchain/UploadToBlockchainComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { abi, contractAddress } from "../../config/contract";

import { concat, keccak256, getBytes } from "ethers";
import WaitingFileHashing from "../waitingFileHashing/WaitingFileHashing";
import UploadProgressTracker from "../uploadProgressTracker/UploadProgressTracker";
import { readContract } from "viem/actions";
import { useReadContract, useTransactionReceipt } from "wagmi";
import { config } from "../../config/config";
import { useAccount, useWriteContract } from "wagmi";

// import arrayify

export default function UploadFile({ hashes, isHashExist, setIsHashExist, setExistedHash }) {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  // state that will track is the file is selected so we can show spinner for hashing
  const [isFileHashing, setIsFileHashing] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [isFileHashed, setIsFileHashed] = useState(false);
  const [note, setNote] = useState("");

  // declare a state that will store file size
  const [fileSize, setFileSize] = useState<number>(0);
  // create a state that will reset all the states, it will be used if a user wanted to upload a different file
  const [reset, setReset] = useState(false);

  // create open wallet state if the user clicked on the upload button to open the wallet
  const [isRequestedToOpenWallet, setIRequestedToOpenWallet] = useState(false);

  const { address } = useAccount();

  // create uploadFileResult state
  const [uploadFileResult, setUploadFileResult] = useState<any>();

  const steps = [
    { id: 1, name: "Wallet Approval", description: "Waiting for wallet approval" },
    { id: 2, name: "Transaction Submission", description: "Submitting transaction to the blockchain" },
    { id: 3, name: "Transaction Confirmation", description: "Waiting for transaction confirmation" },
    { id: 4, name: "Upload Complete", description: "Hash has been successfully submitted" },
  ];
  const result = useWriteContract({
    config,
  });
  const { data: transactionHash, writeContract } = useWriteContract();

  const [currentStep, setCurrentStep] = useState(1);

  const { error, isLoading, isSuccess } = useTransactionReceipt({
    hash: transactionHash,
  });

  // declare a state that will catch the transaction hash, named catchTransactionHash
  const [catchTransactionHash, setCatchTransactionHash] = useState<string | null>(null);

  // set the catchTransactionHash to the transactionHash
  useEffect(() => {
    if (transactionHash) setCatchTransactionHash(transactionHash);
  }, [transactionHash]);

  // set current step to 2 if the transaction hash is not null, which means it's generated
  useEffect(() => {
    if (transactionHash) {
      setCurrentStep(2);
    }
  }, [transactionHash]);

  // set current step to 3 if the transaction is success
  useEffect(() => {
    if (isSuccess) {
      setCurrentStep(3);
    }
  }, [isSuccess, transactionHash]);

  // print error using toast if it's accured
  useEffect(() => {
    if (error) {
      toast.error(`Error occurred, ${error || "Please try again"}`);
    }
  }, [error]);

  const { data } = useReadContract({
    config,
    abi,
    address: contractAddress,
    functionName: "verifyHash",
    args: [hash],
  });

  // declare state that will determine if the hash already exist in the blockchain
  // const [isHashExist, setIsHashExist] = useState(false);
  // declare state that will store the existed hash
  // const [existedHash, setExistedHash] = useState<string | null>(null);

  // show toast error and reset the states if the hash already exist
  useEffect(() => {
    if (isHashExist) {
      toast("Hash file already exist in the blockchain");
      // setIsHashExist(false);
    }
  }, [isHashExist, setIsHashExist]);

  // create a useEffect that will reset all the states if the reset state is true
  useEffect(() => {
    if (reset) {
      setFile(null);
      setHash(null);
      setIsFileHashing(false);
      setProgress(0);
      setIsFileHashed(false);
      setReset(false);
    }
  }, [reset]);

  // set isFileHashed to true when hash is generated, and check if the hash already exist in the blockchain
  useEffect(() => {
    if (hash) {
      // check if the hash already exist
      if (data) {
        // show toast that the hash already exist
        // setIsHashExist(true);

        // reset the states by reversing these states (!isFileHashing && !isRequestedToOpenWallet && !isFileHashed)
        setIsFileHashed(false);
        setIsFileHashing(false);
      } else {
        setIsFileHashed(true);
      }
    }
  }, [data, hash]);

  const resetAllStates = () => {
    setIRequestedToOpenWallet(false);
    setFile(null);
    setHash(null);
    setIsFileHashing(false);
    setProgress(0);
    setIsFileHashed(false);
    setReset(false);
    setCurrentStep(1);
  };

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
        // compare finalHash if it's already exist in the blockchain in hashes parameter
        if (hashes) {
          const hashExist = hashes.find(hash => hash.hash === finalHash);
          if (hashExist) {
            setIsHashExist(true);
            setExistedHash(finalHash);
            // setHash(null);
          }
        } else {
          setIsHashExist(false);
          // setHash(finalHash);
        }
        setHash(finalHash);

        // Set the final hash and progress to 100%
        setProgress(100);
        // set the file size
        setFileSize(selectedFile.size);
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

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`bg-gray-50 text-center px-4 ${
          currentStep > 1 ? "w-full" : " max-w-96"
        }rounded flex flex-col items-center justify-center ${
          !isFileHashed ? "cursor-pointer" : ""
        } border-2 border-gray-400 border-dashed font-[sans-serif]`}
      >
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        {isFileHashed && !isRequestedToOpenWallet && !isHashExist && (
          <UploadToBlockchainComponent
            writeContract={writeContract}
            transactionHash={transactionHash}
            setUploadFileResult={setUploadFileResult}
            fileName={file.name}
            fileSize={fileSize}
            fileHash={hash}
            onUpload={undefined}
            setReset={setReset}
            toast={toast}
            setIRequestedToOpenWallet={setIRequestedToOpenWallet}
          />
        )}
        {isRequestedToOpenWallet && (
          <UploadProgressTracker
            transactionHash={transactionHash}
            currentStep={currentStep}
            setIRequestedToOpenWallet={setIRequestedToOpenWallet}
            resetAllStates={resetAllStates}
          />
        )}
        {isFileHashing && !isRequestedToOpenWallet && <WaitingFileHashing progress={progress} />}
        {!isFileHashing && !isRequestedToOpenWallet && !isFileHashed && (
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
            <div className="p-10">
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
              {/* <p className="text-xs text-gray-400 mt-4">PNG, JPG, SVG, WEBP, and GIF are Allowed.</p> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
