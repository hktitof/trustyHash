import { useState } from "react";

// import components
import UploadFile from "../uploadFile/UploadFile";
export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark");
  };

  return (
    <section className="w-full bg-gray-100 py-20 flex flex-col justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Secure Your Digital Asset Proof with Confidence.
          </h1>
          <h2 className="text-lg  text-gray-600 mb-8">
            Ensuring the authenticity and ownership of your digital assets can be challenging. Whether you&apos;re
            storing or verifying proof, our platform combines advanced blockchain technology with user-friendly tools to
            make the process simple and secure.
          </h2>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <UploadFile />
        {/* <div>
          <h4 className="text-base text-gray-600 font-semibold">Uploading</h4>
          <div className="space-y-8 mt-4">
            <div className="flex flex-col">
              <div className="flex mb-2">
                <p className="text-sm text-gray-500 font-semibold flex-1">
                  Photo.png <span className="ml-2">1.5 mb</span>
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 cursor-pointer shrink-0 fill-black hover:fill-red-500"
                  viewBox="0 0 320.591 320.591"
                >
                  <path
                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
              <div className="bg-gray-300 rounded-full w-full h-2.5">
                <div className="w-1/3 h-full rounded-full bg-blue-600 flex items-center relative">
                  <span className="absolute text-xs right-0.5 bg-white w-2 h-2 rounded-full"></span>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-semibold flex-1 mt-2">35% done</p>
            </div>

            <div className="flex flex-col">
              <div className="flex mb-2">
                <p className="text-sm text-gray-500 font-semibold flex-1">
                  Photo2.jpg <span className="ml-2">2.5 mb</span>
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 cursor-pointer shrink-0 fill-black hover:fill-red-500"
                  viewBox="0 0 320.591 320.591"
                >
                  <path
                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
              <div className="bg-gray-300 rounded-full w-full h-2.5">
                <div className="w-2/3 h-full rounded-full bg-blue-600 flex items-center relative">
                  <span className="absolute text-xs right-0.5 bg-white w-2 h-2 rounded-full"></span>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-semibold flex-1 mt-2">70% done</p>
            </div>

            <div className="flex flex-col">
              <div className="flex mb-2">
                <p className="text-sm text-gray-500 font-semibold flex-1">
                  Photo3.png <span className="ml-2">2.9 mb</span>
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 cursor-pointer shrink-0 fill-black hover:fill-red-500"
                  viewBox="0 0 320.591 320.591"
                >
                  <path
                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
              <div className="bg-gray-300 rounded-full w-full h-2.5">
                <div className="w-11/12 h-full rounded-full bg-blue-600 flex items-center relative">
                  <span className="absolute text-xs right-0.5 bg-white w-2 h-2 rounded-full"></span>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-semibold flex-1 mt-2">90% done</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
