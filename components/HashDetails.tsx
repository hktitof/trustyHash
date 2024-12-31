import { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import { smartContractAddress, smartContractABI } from "../config/smartContract";

interface HashData {
  storedBy: string;
  dateStored: number;
  note: string;
}

const HashDetails = ({ hash }: { hash: string }) => {
  const { data } = useReadContract({
    address: smartContractAddress,
    abi: smartContractABI,
    functionName: "getHashData",
    args: hash ? [hash] : undefined,
    query: {
      enabled: !!hash,
    },
  });

  const formatTimeAgo = (timestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    return 'Just now';
  };

  const decodeNote = (noteBytes: string) => {
    if (!noteBytes || noteBytes === '0x') return '';
    const bytes = new Uint8Array(
      (noteBytes.slice(2).match(/.{1,2}/g) || []).map(byte => parseInt(byte, 16))
    );
    return new TextDecoder().decode(bytes);
  };

  if (!data) return null;

  const hashData = data as HashData;

  const note = decodeNote(hashData.note);
  const dateStored = new Date(Number(hashData.dateStored) * 1000);
  const timeAgo = formatTimeAgo(Number(hashData.dateStored));

  return (
    <div className="bg-gray-800 rounded-lg p-4 mt-4 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-white">Hash Details</h3>
        <div className="grid gap-3">
          <div className="bg-gray-900 p-3 rounded">
            <p className="text-gray-400 text-sm mb-1">Stored By</p>
            <code className="text-emerald-400 text-sm break-all">{hashData.storedBy}</code>
          </div>
          
          <div className="bg-gray-900 p-3 rounded">
            <p className="text-gray-400 text-sm mb-1">Date Stored</p>
            <p className="text-white">
              {dateStored.toLocaleDateString()} {dateStored.toLocaleTimeString()}
              <span className="ml-2 text-gray-400">({timeAgo})</span>
            </p>
          </div>
          
          {note && (
            <div className="bg-gray-900 p-3 rounded">
              <p className="text-gray-400 text-sm mb-1">Note</p>
              <p className="text-white break-words">{note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HashDetails;