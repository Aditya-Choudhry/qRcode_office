import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
  const [businessName, setBusinessName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { businessId, language } = useParams();
  const navigate = useNavigate();

  const translations = {
    en: {
      title: 'Tell us about your experience',
      description: 'How was your experience at',
      greatExperience: 'Great experience',
      complaint: 'I have a complaint',
    },
    fr: {
      title: 'Parlez-nous de votre expérience',
      description: 'Comment s\'est passée votre expérience chez',
      greatExperience: 'Super expérience',
      complaint: 'J\'ai une plainte',
    },
  };

  const text = translations[language] || translations.en;

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await axios.get(`https://crm.qrps.ca:5000/api/form/business/${businessId}`);
        setBusinessName(response.data.businessName);
      } catch (error) {
        console.error('Failed to fetch business details:', error);
        setError(error.message);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [businessId]);

  const handlePositive = () => {
    navigate(`/positiveForm/${language}/${businessId}`);
  };

  const handleComplaint = () => {
    navigate(`/complaintForm/${language}/${businessId}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-light-blue-50 px-4">
      <div className="bg-white bg-opacity-50 rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
        <h1 className="text-xl font-semibold mb-4 text-center text-gray-800">{text.title}</h1>
        <p className="text-gray-600 mb-6 text-center">{text.description} {businessName || '[Name]'}?</p>
        <div className="flex flex-col items-center gap-4">
          <button onClick={handlePositive} className="inline-flex py-2 px-10 text-sm bg-blue-500 text-white font-medium rounded-md hover:bg-blue-400 transition duration-300 ease-in-out transform hover:scale-105 hover:opacity-90 button-width animate-fadeIn">
            {text.greatExperience}
          </button>
          <button onClick={handleComplaint} className="inline-flex py-2 px-10 text-sm bg-gray-500 text-white font-medium rounded-md hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105 hover:opacity-90 button-width animate-fadeIn">
            {text.complaint}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
