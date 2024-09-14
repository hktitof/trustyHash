import React, { useState } from "react";

const UploadProgressTracker = ({ currentStep, setIRequestedToOpenWallet, resetAllStates, transactionHash }) => {
  const [steps] = useState([
    { id: 1, name: "Wallet Approval", description: "Waiting for wallet approval" },
    { id: 2, name: "Transaction Submission", description: "Waiting Submitting transaction to the blockchain" },
    { id: 3, name: "Transaction Confirmation", description: "Transaction confirmed, file hash uploaded" },
  ]);

  return (
    <div className="max-w-xl mx-auto mt-8 pb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="relative flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep > step.id || (currentStep === step.id && step.id === 3)
                    ? "bg-green-600 text-white"
                    : currentStep === step.id
                    ? "bg-blue-400 text-white" // Light blue when loader is active
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {currentStep > step.id || (currentStep === step.id && step.id === 3) ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : currentStep === step.id && step.id !== 3 ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <div className="text-xs mt-2 text-center w-full flex-none">
                <div className="font-semibold ">{step.name}</div>
                <div className="text-gray-500">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 ${currentStep > step.id ? "bg-green-600" : "bg-gray-300"}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      {/* // add text in the center informing the user to click here and please follow the transaction progress in etherscan if there is any error occuded */}
      {currentStep === 2 && (
        <div className="text-center mt-4 text-sm text-gray-600">
          <p>Transaction submitted. Please track progress on Etherscan if any error occurred:</p>
          <button
            onClick={() => {
              /* Add your logic to open Etherscan with the transaction hash */
              // open a new tab with the transaction hash
              window.open("https://sepolia.etherscan.io//tx/" + transactionHash, "_blank");
            }}
            className="mt-1 text-blue-600 hover:text-blue-800 underline focus:outline-none text-xs"
          >
            View transaction details
          </button>
        </div>
      )}
      {currentStep === 3 && (
        <div className="text-center mt-4 ">
          <h4 className="text-lg font-semibold text-green-600 cursor-default">Upload Complete!</h4>
          <p className="text-gray-500 text-sm">Your file has been successfully uploaded to the blockchain.</p>
          <p
            onClick={
              // resetAllStates
              // refresh the page
              () => {
                window.location.reload();
              }
            }
            className="text-black underline text-sm mt-2 cursor-pointer"
          >
            Upload another file or verify your file&apos;s existence.
          </p>
          {/* <button
            className="mt-4 px-6 py-2.5 rounded bg-blue-500 text-white text-sm tracking-wider cursor-pointer font-semibold hover:bg-blue-400"
            onClick={resetAllStates}
          >
            Upload Another File
          </button> */}
        </div>
      )}
      {/* Add a go back button that changes state to false for isFileUploadingToBlockchain */}
      {/* <button
        onClick={() => {
          setIRequestedToOpenWallet(false);
          resetAllStates();
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Go Back
      </button> */}
    </div>
  );
};

export default UploadProgressTracker;
