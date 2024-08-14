import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PrivateForm = () => {
  const { language } = useParams();
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({
    feedback: '',
    name: '',
    email: '',
    phone: '',
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const translations = {
    en: {
      title: 'We Are Here to Help',
      description: 'Thank you for choosing to resolve this privately. It truly helps us make things right and constantly improve our services. If you are comfortable, please provide us with your contact information so that we can reach out to you.',
      feedbackLabel: 'Enter Your Feedback',
      nameLabel: 'Name (optional)',
      emailLabel: 'Email (optional)',
      phoneLabel: 'Phone Number (optional)',
      submitButton: 'Submit',
      feedbackRequired: 'Feedback is required',
      emailInvalid: 'Email is not valid',
      successMessage: 'Feedback submitted successfully!',
      errorMessage: 'Failed to submit feedback. Please try again later.',
    },
    fr: {
      title: 'Nous sommes là pour aider',
      description: 'Merci d\'avoir choisi de résoudre cela en privé. Cela nous aide vraiment à bien faire les choses et à améliorer constamment nos services. Si vous êtes à l\'aise, veuillez nous fournir vos coordonnées afin que nous puissions vous contacter.',
      feedbackLabel: 'Entrez vos commentaires',
      nameLabel: 'Nom (facultatif)',
      emailLabel: 'Email (facultatif)',
      phoneLabel: 'Numéro de téléphone (facultatif)',
      submitButton: 'Soumettre',
      feedbackRequired: 'Les commentaires sont obligatoires',
      emailInvalid: 'L\'email n\'est pas valide',
      successMessage: 'Commentaires soumis avec succès!',
      errorMessage: 'Échec de la soumission des commentaires. Veuillez réessayer plus tard.',
    },
  };

  const text = translations[language] || translations.en;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({ feedback: '', name: '', email: '', phone: '' });
    setSubmitStatus('');
    let valid = true;
    const newErrors = { feedback: '', name: '', email: '', phone: '' };

    if (!feedback) {
      newErrors.feedback = text.feedbackRequired;
      valid = false;
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = text.emailInvalid;
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post('https://crm.qrps.ca:5000/api/privateform', { feedback, name, email, phone });
      setSubmitStatus(text.successMessage);
      setFeedback('');
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus(text.errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-4">{text.title}</h1>
          <p className="text-gray-700 mb-6 text-center">
            {text.description}
          </p>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">{text.feedbackLabel}</label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          {errors.feedback && <div className="text-red-500 text-sm mt-2">{errors.feedback}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{text.nameLabel}</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <div className="text-red-500 text-sm mt-2">{errors.name}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{text.emailLabel}</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <div className="text-red-500 text-sm mt-2">{errors.email}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">{text.phoneLabel}</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <div className="text-red-500 text-sm mt-2">{errors.phone}</div>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {text.submitButton}
        </button>

        {submitStatus && (
          <div className={`mt-4 text-sm ${submitStatus.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
            {submitStatus}
          </div>
        )}
      </form>
    </div>
  );
};

export default PrivateForm;

