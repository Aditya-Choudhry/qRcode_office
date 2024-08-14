import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './Header.css';
import { useNavigate } from 'react-router-dom';

function Header({ toggleSidebar }) {
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (showPopup && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      sessionStorage.removeItem('authToken');
      navigate('/');
    }
    return () => clearInterval(timer);
  }, [showPopup, countdown, navigate]);

  const handleLogout = () => {
    setShowPopup(true);
    setCountdown(5); // Reset countdown
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Hamburger Menu Icon */}
        <button
          className="menu-button md:hidden flex items-center p-2 text-gray-300 hover:text-white"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Brand Name */}
        <div className="brand text-2xl font-bold text-white">
          <Link to="/" className="hover:text-gray-300">Barqon</Link>
        </div>

        {/* Logout Button */}
        <button 
          className="logout-button flex items-center p-2 hover:bg-gray-700 rounded-full transition duration-300 ease-in-out"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="w-6 h-6 text-red-400 hover:text-red-500" />
          <span className="ml-2 text-sm">Logout</span>
        </button>
      </div>

      {showPopup && (
        <div className="fixed-popup">
          <div className="popup-content">
            <p>Logging out in {countdown} seconds...</p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
