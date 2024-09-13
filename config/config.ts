import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

import { http, createConfig } from "@wagmi/core";
import { mainnet, sepolia } from "@wagmi/core/chains";

// import project id from .env
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;


declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
