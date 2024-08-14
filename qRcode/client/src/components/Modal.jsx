import React from 'react';

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-sm">
        <h2 className="text-lg font-bold mb-4">{message}</h2>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
