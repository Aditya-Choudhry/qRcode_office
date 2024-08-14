import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginComponent = ({ onGoogleData }) => {
  const handleSuccess = (response) => {
    // Extract the JWT token
    const token = response.credential;

    // Decode the JWT token
    if (token) {
      const decodedToken = decodeJwt(token);
      onGoogleData(decodedToken);
    } else {
      console.error('Google token is missing.');
    }
  };

  const handleFailure = (error) => {
    console.error('Google login failed:', error);
  };

  const decodeJwt = (token) => {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Failed to decode JWT:', error);
      return {};
    }
  };

  return (
    <div className="mb-6">
      <GoogleLogin
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        buttonText="Login with Google"
        className="w-full bg-gray-200 py-2 rounded-md text-center text-gray-800"
      />
    </div>
  );
};

export default GoogleLoginComponent;
