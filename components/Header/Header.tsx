import { useState } from "react";

// import components
import UploadFile from "../uploadFile/UploadFile";
export default function Header({ hashes }) {
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
        <UploadFile hashes={hashes} />
      </div>
    </section>
  );
}
