// pages/index.js
import { useState, useEffect } from "react";
// import { ethers } from 'ethers';

// Components
import Header from "../Header/Header";
import Menu from "../menu/Menu";
import StatisticsTable from "../statisticsTable/StatisticsTable";

// Smart Contract ABI and Address
// import contractABI from '../abi/TrustyHash.json';
const contractAddress = "0x1234567890123456789012345678901234567890";

import { Account } from "../Account/Account";
import { WalletOptions } from "../WalletOptions/WalletOptions";

import { useAccount } from "wagmi";
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

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default function Home() {
  // declare hashes state
  const [hashes, setHashes] = useState<Hash | null>(null);
  // declare state that will determine if the hash already exist in the blockchain
  const [isHashExist, setIsHashExist] = useState(false);
  // declare state that will store the existed hash
  const [existedHash, setExistedHash] = useState<string | null>(null);

  return (
    <div className="bg-gray-100  min-h-screen">
      {/* <div className="w-full h-24">
        <ConnectWallet />
      </div> */}
      <Menu />
      <Header
        hashes={hashes}
        isHashExist={isHashExist}
        setIsHashExist={setIsHashExist}
        setExistedHash={setExistedHash}
      />
      <StatisticsTable hashes={hashes} setHashes={setHashes} isHashExist={isHashExist} existedHash={existedHash} />
      <div className="container mx-auto py-10 px-4">
        {/* <UploadSection contract={contract} />
        <VerificationSection contract={contract} />
        <StatisticsTable statistics={statistics} /> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}
