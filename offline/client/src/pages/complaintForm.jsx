import React, { useState, useEffect } from 'react';
import './FeedbackForm.css'; // Import custom CSS for animations
import { useNavigate, useParams } from 'react-router-dom';

const FeedbackForm = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const { language } = useParams();
  const navigate = useNavigate();

  const translations = {
    en: {
      title: 'How would you like to leave feedback?',
      apology: 'We sincerely apologize for any inconveniences you\'ve experienced. Our goal is to make all of our customers happy, and we take complaints very seriously. It’s up to you how you would like to express it.',
      privateComplaint: 'Private complaint & Response',
      publicComplaint: 'Public Complaint on Google',
    },
    fr: {
      title: 'Comment souhaitez-vous laisser un retour d\'information?',
      apology: 'Nous nous excusons sincèrement pour les inconvénients que vous avez rencontrés. Notre objectif est de satisfaire tous nos clients, et nous prenons les plaintes très au sérieux. C\'est à vous de décider comment vous souhaitez l\'exprimer.',
      privateComplaint: 'Plainte privée et réponse',
      publicComplaint: 'Plainte publique sur Google',
    },
  };

  const text = translations[language] || translations.en;

  const handleFeedbackClick = (type) => {
    setSelectedFeedback(type);
    navigate(`/privateform/${language}`);
    window.location.reload();
  };

  useEffect(() => {
    if (selectedFeedback) {
      console.log("Selected Feedback Type:", selectedFeedback);
    }
  }, [selectedFeedback]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4 text-center">{text.title}</h1>

        <div className="mb-4 text-xs text-gray-700">
          <p className="mb-2">{text.apology}</p>
        </div>

        <div className="mb-4 space-y-2">
          <button
            type="button"
            onClick={() => handleFeedbackClick(text.privateComplaint)}
            className={`w-full px-4 py-2 font-medium rounded-md shadow-sm transition-transform duration-300 ease-in-out transform ${selectedFeedback === text.privateComplaint ? 'scale-105 bg-blue-100' : 'scale-100 bg-white'} hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {text.privateComplaint}
          </button>
          <button
            type="button"
            onClick={() => handleFeedbackClick(text.publicComplaint)}
            className={`w-full px-4 py-2 font-medium rounded-md shadow-sm transition-transform duration-300 ease-in-out transform ${selectedFeedback === text.publicComplaint ? 'scale-105 bg-blue-100' : 'scale-100 bg-white'} hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {text.publicComplaint}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
