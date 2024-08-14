import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewForm = () => {
  const location = useLocation();
  const { language } = useParams();
  const [review, setReview] = useState('');
  const [isReviewCopied, setIsReviewCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const textareaRef = useRef(null);

  const translations = {
    en: {
      title: 'Your Review',
      copyButton: 'Copy Review & Continue',
      regenerateButton: 'Regenerate Review',
      termsText: 'By continuing, you agree with the generated sentiments. For an explanation, please click here.',
    },
    fr: {
      title: 'Votre avis',
      copyButton: 'Copier l\'avis et continuer',
      regenerateButton: 'Régénérer l\'avis',
      termsText: 'En continuant, vous acceptez les sentiments générés. Pour une explication, veuillez cliquer ici.',
    },
  };

  const text = translations[language] || translations.en;

  useEffect(() => {
    if (location.state?.review) {
      simulateTyping(location.state.review);
    }
  }, [location.state]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [review]);

  const simulateTyping = (text) => {
    setIsTyping(true);
    let index = 0;
    const typeInterval = setInterval(() => {
      setReview((prev) => text.slice(0, index + 1));
      index += 1;
      if (index >= text.length) {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 50);
  };

  const handleCopyAndContinue = () => {
    navigator.clipboard.writeText(review).then(() => {
      const encodedReview = encodeURIComponent(review);
      const googleSearchUrl = `https://search.google.com/local/writereview?placeid=ChIJQZNfCVMZDTkRp37TGN9wgVo`;
      
      // Open Google Search in a new tab
      window.open(googleSearchUrl, '_blank');
      
      setIsReviewCopied(true);
    });
  };
  
  const handleRegenerateReview = async () => {
    try {
      const response = await axios.post('https://crm.qrps.ca:5000/review/generate_review', {
        keywords: location.state?.keywords || [],
        language // Pass the language to the backend if needed
      });
      simulateTyping(response.data.review);
      setIsReviewCopied(false);
    } catch (error) {
      console.error('Error regenerating review:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold mb-4 text-center">{text.title}</h1>
        <div className="mb-4">
          <textarea
            ref={textareaRef}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Enter your review here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none overflow-hidden"
            rows="3"
            readOnly
          />
        </div>
        <div className="mb-4 text-xs text-gray-700">
          <p>{text.termsText}</p>
        </div>
        <div className="mb-4 space-y-2">
          <button
            type="button"
            onClick={handleCopyAndContinue}
            className={`w-full px-4 py-2 font-medium rounded-md shadow-sm ${isTyping ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'} transition-colors duration-150`}
            disabled={isTyping}
          >
            {text.copyButton}
          </button>
          <button
            type="button"
            onClick={handleRegenerateReview}
            className={`w-full px-4 py-2 font-medium rounded-md shadow-sm ${isTyping ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'} transition-colors duration-150`}
            disabled={isTyping}
          >
            {text.regenerateButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
