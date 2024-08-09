import React from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { WagmiProvider, useAccount, useDisconnect } from "wagmi";

export default function ConnectWalletButton() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // print isConnected
  console.log(isConnected);

  if (isConnected) {
    return (
      <button
        onClick={() => {
          disconnect();
        }}
        className="bg-black text-white font-bold py-4 px-7 rounded-3xl transition-colors"
      >
        Disconnect
      </button>
    );
  } else {
    return (
      <button
        onClick={() => open()}
        className=" bg-blue-600 text-white font-bold py-4 px-7 rounded-3xl transition-colors"
      >
        Connect
      </button>
    );
  }
}
