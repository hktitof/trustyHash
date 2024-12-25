"use client";

import { useState } from "react";
// import { Search } from 'lucide-react';

interface HashEntry {
  hash: string;
  date: string;
  address: string;
}

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

        <button className="px-5 py-2 flex space-x-2 items-center font-extrabold bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
            <path d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 2.201 1.794 3 3 3h15c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zm-2 9h-2v-4h2v4zM5 7a1.001 1.001 0 010-2h13v2H5z" />
          </svg>
          <div className="flex whitespace-nowrap">
            <span className="text-white">Connect Wallet</span>
          </div>
        </button>
      </nav>

      <div className="max-w-4xl mx-auto">
        <div className="w-full flex justify-center">
          <div className="w-4/6">
            <div className="border-2 border-dashed bg-gray-800 border-gray-500 rounded-lg p-12 text-center mb-4">
              <div className="flex justify-center mb-4">
                <svg
                  viewBox="0 0 1000 1000"
                  fill="currentColor"
                  className="h-24 w-24 text-emerald-400" // Tailwind classes for size
                >
                  <path d="M760 356c66.667 0 123.333 22.667 170 68s70 100.667 70 166-23.333 120.667-70 166-103.333 68-170 68H570V634h106L500 404 326 634h104v190H182c-49.333 0-92-17.333-128-52S0 696 0 648c0-49.333 17.667-91.333 53-126s78.333-52 129-52c9.333 0 16 .667 20 2-1.333-8-2-20.667-2-38 0-72 26-133.333 78-184s114.667-76 188-76c60 0 113.333 17.333 160 52s78 79.333 94 134c18.667-2.667 32-4 40-4" />
                </svg>
              </div>
              <p className="text-white font-bold mb-2 ">Drop your file here or click to upload</p>
              <p className="text-sm text-gray-400">Supported formats: .pdf, .doc, .txt (max 10MB)</p>
            </div>

            <button className="flex justify-center space-x-2 w-full bg-gradient-to-r from-emerald-400 to-blue-500 text-white py-3 rounded-lg mb-8">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6" // Tailwind classes for size
              >
                <path d="M3 4v5h2V5h4V3H4a1 1 0 00-1 1zm18 5V4a1 1 0 00-1-1h-5v2h4v4h2zm-2 10h-4v2h5a1 1 0 001-1v-5h-2v4zM9 21v-2H5v-4H3v5a1 1 0 001 1h5zM2 11h20v2H2z" />
              </svg>

              <span className="font-extrabold text-md">Hash & Verify</span>
            </button>
          </div>
        </div>

        <section className="mt-16">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-semibold">Recent Hashes</h2>
            <div className="relative">
              {/* <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" /> */}
              <input
                type="text"
                placeholder="Search hashes..."
                className="bg-gray-800 text-gray-300 pl-10 pr-4 py-2 rounded-lg text-sm"
              />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm">
                  <th className="text-left p-4">Hash</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Wallet Address</th>
                </tr>
              </thead>
              <tbody>
                {recentHashes.map((item, index) => (
                  <tr key={index} className="border-t border-gray-700 text-gray-300">
                    <td className="p-4 font-mono text-emerald-400">{item.hash}</td>
                    <td className="p-4">{item.date}</td>
                    <td className="p-4 font-mono">{item.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="text-center text-gray-500 text-sm mt-8">© 2025 Trusty Hash. All rights reserved.</footer>
      </div>
    </main>
  );
}
