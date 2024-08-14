import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KeywordPopup from './KeywordPopup';

const KeywordSection = () => {
  const [keywords, setKeywords] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingKeyword, setEditingKeyword] = useState(null); // State for the keyword being edited
  const [alertMessage, setAlertMessage] = useState('');

  const ownerId = localStorage.getItem('ownerId');
  const businessId = localStorage.getItem('businessId');

  useEffect(() => {
    fetchKeywords();
  }, [businessId]); // Re-fetch keywords when businessId changes

  const fetchKeywords = async () => {
    if (!businessId) {
      setAlertMessage('Please select a business to view keywords.');
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/apii/keywords', {
        params: {
          businessId
        }
      });
      setKeywords(response.data);
    } catch (error) {
      console.error('Error fetching keywords:', error);
    }
  };

  const addKeyword = async (keyword, language) => {
    if (!businessId) {
      setAlertMessage('Please select a business before adding a keyword.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/apii/keywords', {
        keyword,
        language,
        businessId,
        ownerId
      });
      setKeywords([...keywords, response.data]);
      setAlertMessage(''); // Clear alert message on success
    } catch (error) {
      console.error('Error adding keyword:', error);
    }
  };

  const deleteKeyword = async (id) => {
    try {
      console.log(`Deleting keyword with ID: ${id}`);
      await axios.delete(`http://localhost:5000/apii/keywords/${id}`);
      setKeywords(keywords.filter((keyword) => keyword._id !== id));
    } catch (error) {
      console.error('Error deleting keyword:', error);
    }
  };

  const editKeyword = async (id, newKeyword, newLanguage) => {
    try {
      console.log(`Editing keyword with ID: ${id}, newKeyword: ${newKeyword}, newLanguage: ${newLanguage}`);
      const response = await axios.put(`http://localhost:5000/apii/keywords/${id}`, {
        keyword: newKeyword,
        language: newLanguage,
        businessId,
        ownerId
      });
      console.log('Edit response:', response.data);
      setKeywords(keywords.map((keyword) => (keyword._id === id ? response.data : keyword)));
    } catch (error) {
      console.error('Error editing keyword:', error);
    }
  };

  const handleEditClick = (keyword) => {
    setEditingKeyword(keyword);
    setIsPopupOpen(true);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      {alertMessage && (
        <div className="bg-red-500 text-white p-2 rounded-md mb-4">
          {alertMessage}
        </div>
      )}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Keywords</h2>
        <button
          onClick={() => {
            if (!businessId) {
              setAlertMessage('Please select a business before adding a keyword.');
              return;
            }
            setEditingKeyword(null);
            setIsPopupOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          + Add Keyword
        </button>
      </div>
      <table className="w-full text-left bg-white rounded-md shadow-md overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Keyword</th>
            <th className="py-2 px-4">Edit</th>
            <th className="py-2 px-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map((keyword) => (
            <tr key={keyword._id}>
              <td className="py-2 px-4">{keyword.keyword}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEditClick(keyword)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Edit
                </button>
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => deleteKeyword(keyword._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isPopupOpen && (
        <KeywordPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSave={editingKeyword ? (newKeyword, newLanguage) => editKeyword(editingKeyword._id, newKeyword, newLanguage) : addKeyword}
          existingKeyword={editingKeyword}
        />
      )}
    </div>
  );
};

export default KeywordSection;
