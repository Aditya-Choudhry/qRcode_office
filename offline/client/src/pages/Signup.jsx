import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginComponent from '../components/GoogleLoginComponent';

const Signup = () => {
  const navigate = useNavigate();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [currentIP, setCurrentIP] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Function to get current IP address
  const getCurrentIP = async () => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      setCurrentIP(response.data.ip);
    } catch (error) {
      setCurrentIP('Unavailable');
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform validation
    let errorsObj = {};

    if (first_name.trim() === '') {
      errorsObj.first_name = 'First Name is required';
    }

    if (last_name.trim() === '') {
      errorsObj.last_name = 'Last Name is required';
    }

    if (email.trim() === '') {
      errorsObj.email = 'Email is required';
    }

    if (address.trim() === '') {
      errorsObj.address = 'Address is required';
    }

    if (phone_number.trim() === '') {
      errorsObj.phone_number = 'Phone Number is required';
    }

    if (password.trim() === '') {
      errorsObj.password = 'Password is required';
    }

    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
    } else {
      const formData = { first_name, last_name, email, address, phone_number, password, ipAddress: currentIP };

      try {
        await axios.post('http://localhost:5000/api/auth/signup', formData);
        setShowSuccessPopup(true);
        setTimeout(() => {
          navigate('/login'); 
        }, 3000);
      } catch (error) {
        setErrors({ general: 'Signup error. Please try again later.' });
      }
    }
  };

  useEffect(() => {
    getCurrentIP();
  }, []);

  const handleGoogleData = (data) => {
    if (data && data.email) {
      setEmail(data.email);
      setFirstName(data.given_name || '');
      setLastName(data.family_name || '');
    } else {
      console.error('Invalid Google data:', data);
    }
  };

  return (
    <GoogleOAuthProvider clientId="468316523645-t7jjsq0prc8q9fgm6goeg9q8u9nsqi0n.apps.googleusercontent.com">
      <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full sm:w-96">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
          <GoogleLoginComponent onGoogleData={handleGoogleData} />
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className={`w-full p-2 border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600`}
                type="text"
                placeholder="First Name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                className={`w-full p-2 border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600`}
                type="text"
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600`}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                className={`w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600`}
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                className={`w-full p-2 border ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600`}
                type="tel"
                placeholder="Phone Number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>
              )}
            </div>
            <div className="mb-6">
              <input
                className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600`}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-md hover:from-purple-700 hover:to-pink-700 transition duration-300"
              type="submit"
            >
              Sign Up
            </button>
            {errors.general && (
              <p className="mt-4 text-red-500 text-center">{errors.general}</p>
            )}
          </form>
          {showSuccessPopup && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-md shadow-lg">
              <p>Signup successful! Redirecting to login...</p>
            </div>
          )}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="./login" className="text-purple-600 hover:underline">
              Log in
            </a>
          </p>
          <div className="mt-4 text-center text-sm text-gray-600">
            Your IP Address: {currentIP}
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
