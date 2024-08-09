import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Web3ModalProvider from "../components/Web3ModalProvider/Web3ModalProvider";

import { IncomingHttpHeaders } from "http";

import { cookieToInitialState } from "wagmi";

import { config } from "../config";



function MyApp({ Component, pageProps }) {
  const headers: IncomingHttpHeaders = {};
  const initialState = cookieToInitialState(config, headers.cookie);

  return (
    <Web3ModalProvider initialState={initialState}>
      <Component {...pageProps} />
    </Web3ModalProvider>
  );
}

export default MyApp;
