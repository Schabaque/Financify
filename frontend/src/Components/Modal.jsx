// src/components/Modal.jsx

import React from 'react';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null; // Don't render the modal if `show` is false

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-indigo-600">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close Modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

        <div className="mb-6">{children}</div>

        <div className="flex justify-end space-x-4">
          <button
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
