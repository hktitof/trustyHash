import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Web3ModalProvider from "../components/Web3ModalProvider/Web3ModalProvider";
import { IncomingHttpHeaders } from "http";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { cookieToInitialState } from "wagmi";

// 1. Import modules
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";
import { config } from "../config/config";

// 2. Set up a React Query client.
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const headers: IncomingHttpHeaders = {};
  const initialState = cookieToInitialState(config, headers.cookie);

  return (
    <Web3ModalProvider initialState={initialState}>
      <ToastContainer />
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </WagmiProvider>
    </Web3ModalProvider>
  );
}

export default MyApp;
