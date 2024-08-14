import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
 
      if (response.status === 200) {
        const { token, isSubscribed, userId, isAdmin } = response.data;
        sessionStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('ownerId' , userId);
        
 
        if (isSubscribed && !isAdmin) {
          navigate('/mybusinesses');
          window.location.reload();
        
        } 
        else if (isAdmin){
          navigate('/admin');
          window.location.reload();
        }else {
          alert("You are not subscribed. Redirecting to subscription page.");
          navigate('/unsubscribed');
          window.location.reload();
        
        }
      }
    } catch (error) {
      const { message, lockTimeRemaining } = error.response.data;
      setError(message);
      if (lockTimeRemaining) {
        setLockTimeRemaining(lockTimeRemaining);
      }
    }
  };
 
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
 
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (validateEmail(newEmail)) {
      setEmailError('');
    }
  };
 
  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Log In
        </h2>
        <form>
          <input
            className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
          <input
            className="w-full mb-6 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-md hover:from-blue-700 hover:to-indigo-700 transition duration-300"
            type="submit"
            onClick={handleSubmit}
          >
            Log In
          </button>
          {error && (
            <div>
              <p className="mt-4 text-red-500 text-center">{error}</p>
              {lockTimeRemaining > 0 && (
                <p className="mt-2 text-red-500 text-center">
                  Time remaining: {formatTime(lockTimeRemaining)}
                </p>
              )}
            </div>
          )}
        </form>
        {showSuccessPopup && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-md shadow-lg">
            <p>Login successful! Redirecting...</p>
          </div>
        )}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="./signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
 
export default Login;