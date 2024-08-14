import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PositiveForm = () => {
  const navigate = useNavigate();
  const { businessId, language } = useParams();
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [businessName, setBusinessName] = useState('');

  const translations = {
    en: {
      title: 'Select the keywords',
      question: 'What did you like about your experience?',
      description: 'We\'ll create a review for you. If it doesn\'t meet your expectations, feel free to write your own instead of pasting it.',
      generateButton: 'Generate',
    },
    fr: {
      title: 'Sélectionnez les mots-clés',
      question: 'Qu\'avez-vous aimé de votre expérience?',
      description: 'Nous créerons un avis pour vous. S\'il ne répond pas à vos attentes, n\'hésitez pas à écrire le vôtre au lieu de le coller.',
      generateButton: 'Générer',
    },
  };

  const text = translations[language] || translations.en;
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/apii/keywords', {
          params: {
            businessId
          }
        });
        if (Array.isArray(response.data)) {
          setOptions(response.data);
        } else {
          setError('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching options:', error);
        setError('Error fetching options');
      } finally {
        setLoading(false);
      }
    };
  
    fetchOptions();
  }, [businessId]);
  

  const handleOptionClick = (value) => {
    setSelectedOptions(prevSelected =>
      prevSelected.includes(value)
        ? prevSelected.filter(option => option !== value)
        : [...prevSelected, value]
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Include the language in the request body
        const response = await axios.post('http://localhost:5000/review/generate_review', {
            keywords: selectedOptions,
            language  // Pass the language to the backend
        });
        const { review } = response.data;
        navigate(`/reviewForm/${language}`, { state: { review, keywords: selectedOptions } });
    } catch (error) {
        console.error('Error generating review:', error);
    }
};


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4 text-center">{text.title}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              {text.question}
            </label>
          </div>
          <div className="mb-4">
            <p className="text-xs text-gray-700">
              {text.description}
            </p>
          </div>
          <div className="mb-4 space-y-2">
            {options.map(option => (
              <button
                key={option._id}
                type="button"
                onClick={() => handleOptionClick(option.keyword)}
                aria-pressed={selectedOptions.includes(option.keyword)}
                className={`w-full px-4 py-2 font-medium rounded-md shadow-sm focus:outline-none flex items-center ${selectedOptions.includes(option.keyword) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'} `}
              >
                <span className="mr-2 text-lg">{selectedOptions.includes(option.keyword) ? '×' : '+'}</span>
                {option.keyword}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={selectedOptions.length === 0}
            className={`w-full px-4 py-2 ${selectedOptions.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'} text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {text.generateButton}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PositiveForm;
