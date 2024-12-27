"use client";

import { useState } from "react";
// import { Search } from 'lucide-react';
import FileUpload from "./FileUpload";
import ConnectButton from "./ConnectButton";
import TableHashes from "./TableHashes";


export default function FileHashInterface() {
  const [recentHashes] = useState<HashEntry[]>([
    { hash: "0x7d8f...3e2a", date: "Jan 15, 2025", address: "0x1234...5678" },
    { hash: "0x9a2b...4c7d", date: "Jan 14, 2025", address: "0x8765...4321" },
    { hash: "0x3f5e...8b9a", date: "Jan 14, 2025", address: "0xabcd...efgh" },
  ]);

  return (
    <main className="min-h-screen bg-gray-900 p-6">
      <nav className="flex justify-around mb-8 border-b-2 border-gray-700 pb-4">
        <div className="w-full flex items-center text-emerald-400">
          <span className="text-xl mr-2">📦</span>
          <span className="font-semibold">Trusty Hash</span>
        </div>

        <ConnectButton />
      </nav>

      <div className="max-w-4xl mx-auto">
        <FileUpload />

        <TableHashes />

        <footer className="text-center text-gray-500 text-sm mt-8">© 2025 Trusty Hash. All rights reserved.</footer>
      </div>
    </main>
  );
}
