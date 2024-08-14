import React, { useState, useEffect } from 'react';

const KeywordPopup = ({ isOpen, onClose, onSave, existingKeyword }) => {
  const [keyword, setKeyword] = useState('');
  const [language, setLanguage] = useState('French');
  const [error, setError] = useState(''); // For handling error messages

  useEffect(() => {
    if (existingKeyword) {
      setKeyword(existingKeyword.keyword);
      setLanguage(existingKeyword.language || 'French');
    } else {
      setKeyword('');
      setLanguage('French');
    }
  }, [existingKeyword]);

  const handleSave = () => {
    if (keyword.trim() === '') {
      setError('Keyword cannot be empty.');
      return;
    }
    setError(''); // Clear any previous errors

    if (existingKeyword) {
      // Editing an existing keyword
      onSave(existingKeyword._id, keyword.trim(), language);
    } else {
      // Adding a new keyword
      onSave(keyword.trim(), language);
    }
    setKeyword('');
    setLanguage('French');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {existingKeyword ? 'Edit Keyword' : 'Add Keyword'}
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="keyword" className="block text-gray-700">Keyword</label>
          <input
            type="text"
            id="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            placeholder="Enter keyword"
            aria-required="true"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="language" className="block text-gray-700">Language</label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="French">French</option>
            {/* Add more language options here */}
            <option value="English">English</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeywordPopup;
