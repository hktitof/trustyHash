"use client";
import { WagmiProvider, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { http } from "viem";
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";
const networkName = process.env.NEXT_PUBLIC_NETWORK_NAME || "sepolia";
// create sepolia rpc url from the environment variable
const sepoliaRpcUrl = process.env.NEXT_PUBLIC_INFURA_RPC_URL || "";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [networkName === "mainnet" ? mainnet : sepolia],
    transports: {
      // RPC URL for each chain
      //   [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`),
      [sepolia.id]: http(sepoliaRpcUrl),
    },

    // Required API Keys
    walletConnectProjectId: projectId,

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

// through an error on the console if projectId or sepoliaRpcUrl is empty
if (!projectId) {
  console.error("WalletConnect Project ID is not defined");
}
if (!sepoliaRpcUrl) {
  console.error("Sepolia RPC URL is not defined");
}

const queryClient = new QueryClient();

import { ReactNode } from "react";

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  // check if projectId is empty then throw an error in the console
  if (!projectId) {
    console.error("WAlletConnect Project ID is not defined");
  }
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
