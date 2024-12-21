import React, { useState } from "react";
import { useParams } from "react-router-dom";

interface CopyUrlProps {
  isOpen: boolean;
  onClose: () => void;
}

const CopyUrl: React.FC<CopyUrlProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const url = window.location.href; // The full URL of the current page
  const { id } = useParams<{ id: string }>(); // Room ID extracted from URL parameters

  const handleWholeCopy = async () => {
    try {
      await navigator.clipboard.writeText(url); // Copy the entire URL to clipboard
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reset "Copied" message after 3 seconds
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  const handleIdCopy = async () => {
    try {
      if (id) {
        await navigator.clipboard.writeText(id); // Copy only the room ID
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Reset "Copied" message after 3 seconds
      }
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
            Meeting Link and Room ID
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
            Share the meeting link with your friends or family:
          </label>
          <div className="relative mb-4">
            <input
              type="text"
              value={url}
              readOnly
              className="w-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400 p-2.5 rounded-md border dark:border-gray-600"
            />
            <button
              onClick={handleWholeCopy}
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

          {/* Room ID */}
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Or copy the Room ID:
          </label>
          <div className="relative">
            <input
              type="text"
              value={id || "No ID"} // Display ID if present, else show "No ID"
              readOnly
              className="w-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400 p-2.5 rounded-md border dark:border-gray-600"
            />
            <button
              onClick={handleIdCopy}
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
        </div>

        {/* Footer */}
        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyUrl;
