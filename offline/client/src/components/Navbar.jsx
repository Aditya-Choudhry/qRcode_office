import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
 
  const handleLogout = () => {
    // Remove token from session storage
    sessionStorage.removeItem('authToken'); // Replace 'authToken' with the actual token key
 
    // Show popup
    setShowPopup(true);
 
    // Redirect after a delay
    setTimeout(() => {
      setShowPopup(false);
      navigate('/');
    }, 2000); // Adjust delay as needed
  };
 
  return (
    <nav className="bg-gray-900 text-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* App Name or Brand */}
        <div className="text-xl font-bold">
          <Link to="/mybusinesses">MyApp</Link>
        </div>
 
        {/* Mobile Menu Toggle Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-3 py-2 rounded text-white hover:text-gray-400 transition-colors duration-300"
          >
            <svg
              className={`fill-current h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
            <svg
              className={`fill-current h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
            </svg>
          </button>
        </div>
 
        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-grow items-center justify-center space-x-6">
          <Link
            to="/mybusinesses"
            className="text-white hover:bg-gray-700 transition-colors duration-300 text-lg px-3 py-2 rounded"
          >
            My Businesses
          </Link>
          <Link
            to="/subscription"
            className="text-white hover:bg-gray-700 transition-colors duration-300 text-lg px-3 py-2 rounded"
          >
            Subscription
          </Link>
          {/* <Link
            to="/business"
            className="text-white hover:bg-gray-700 transition-colors duration-300 text-lg px-3 py-2 rounded"
          >
            Businesses
          </Link> */}
          <Link
            to="/contact"
            className="text-white hover:bg-gray-700 transition-colors duration-300 text-lg px-3 py-2 rounded"
          >
            Contact
          </Link>
        </div>
 
        {/* Logout Button (Desktop View) */}
        <div className="hidden lg:flex items-center ml-auto">
          <button
            onClick={handleLogout}
            className="bg-blue-500 border-0 py-2 px-4 text-white hover:bg-blue-600 transition-colors duration-300 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
 
      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-800 p-4`}>
        <div className="flex flex-col items-center">
          <Link
            to="/mybusinesses"
            className="text-white hover:bg-gray-700 transition-colors duration-300 text-lg mb-2 px-3 py-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            My Businesses
          </Link>
          <Link
            to="/subscription"
            className="text-white hover:bg-gray-700 transition-colors duration-300 text-lg mb-2 px-3 py-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            Subscription
          </Link>
          {/* <Link
            to="/business"
            className="text-white hover:bg-gray-700 transition-colors duration-300 text-lg mb-2 px-3 py-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            Businesses
          </Link> */}
          <Link
            to="/contact"
            className="text-white hover:bg-gray-700 transition-colors duration-300 text-lg mb-2 px-3 py-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <button
            onClick={handleLogout}
            className="bg-blue-500 border-0 py-2 px-4 text-white hover:bg-blue-600 transition-colors duration-300 rounded-lg mt-4"
          >
            Logout
          </button>
        </div>
      </div>
 
      {/* Logout Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white text-black p-4 rounded-lg">
            <p>You are logged out</p>
          </div>
        </div>
      )}
    </nav>
  );
}
 
export default Navbar;
 