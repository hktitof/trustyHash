import React from "react";

export default function WaitingFileHashing({ progress }) {
  return (
    <div className="bg-gray-50 bg-opacity-90 w-72 h-80 flex flex-col items-center justify-center border-2 border-gray-400 border-dashed font-[sans-serif]">
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
  );
}
