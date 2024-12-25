// app/layout.tsx

// import { Inter } from "next/font/google";
import "./globals.css";

import { Web3Provider } from "../../components/Web3Provider";
// import { ConnectKitButton } from "connectkit";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
