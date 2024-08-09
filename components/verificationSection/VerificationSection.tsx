import { useState } from 'react';

export default function VerificationSection({ contract }) {
  const [fileToVerify, setFileToVerify] = useState(null);
  const [contentToVerify, setContentToVerify] = useState('');

  const handleFileUpload = (event) => {
    setFileToVerify(event.target.files[0]);
  };

  const handleContentChange = (event) => {
    setContentToVerify(event.target.value);
  };

  const verifyProofOfWork = async () => {
    try {
      // Add logic to verify proof of work using the contract instance
      console.log('Verifying proof of work...');
    } catch (error) {
      console.error('Error verifying proof of work:', error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 shadow-md rounded-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Verify Proof of Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 text-gray-800 dark:text-white">File Upload</label>
          <input
            type="file"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            onChange={handleFileUpload}
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-800 dark:text-white">Content Input</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            rows={3}
            value={contentToVerify}
            onChange={handleContentChange}
          ></textarea>
        </div>
      </div>
      <button
        onClick={verifyProofOfWork}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Verify Proof of Work
      </button>
    </section>
  );
}