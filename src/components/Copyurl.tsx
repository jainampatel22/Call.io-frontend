import React, { useState } from "react";
interface CopyUrlProps {
    isOpen: boolean;
    onClose: () => void;
  }
const CopyUrl:React.FC<CopyUrlProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const url =window.location.href

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reset "Copied" after 2 seconds
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Meeting Url !
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Share the Meeting link to your friends or family:
          </label>
          <div className="relative">
            <input
              type="text"
              value={url}
              readOnly
              className="w-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400 p-2.5 rounded-md border dark:border-gray-600"
            />
            <button
              onClick={handleCopy}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-100 dark:bg-gray-700 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {copied ? (
                <svg
                  className="w-4 h-4 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917L5.724 10.5 15 1.5"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                </svg>
              )}
            </button>
          </div>
          {copied && (
            <p className="mt-2 text-green-500 text-sm">Copied to clipboard!</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyUrl;
