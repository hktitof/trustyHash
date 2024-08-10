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

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [statistics, setStatistics] = useState({
    totalProofs: 0,
    successfulVerifications: 0,
    // Add more statistics as needed
  });

  return (
    <div className="bg-gray-100  min-h-screen">
      {/* <div className="w-full h-24">
        <ConnectWallet />
      </div> */}
      <Menu />
      <Header />
      <StatisticsTable />
      <div className="container mx-auto py-10 px-4">
        {/* <UploadSection contract={contract} />
        <VerificationSection contract={contract} />
        <StatisticsTable statistics={statistics} /> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}
