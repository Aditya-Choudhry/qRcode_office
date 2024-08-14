import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaBusinessTime, FaUserTie, FaFileAlt, FaDollarSign, FaBuilding, FaEnvelope,FaDashcube } from 'react-icons/fa';
import useIsAuth from '../useIsAuth'; // Adjust the path if needed

function Sidebar({ isOpen, toggleSidebar }) {
 const { isAuthenticated, isAdmin } = useIsAuth();

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-900 text-white shadow-lg transform transition-all duration-300 ease-in-out z-40 
        ${isOpen ? 'translate-x-0 w-64 lg:w-72' : 'w-16 lg:w-20 -translate-x-full lg:translate-x-0'}`}
    >
      <div className="flex flex-col mt-8 space-y-4 px-4">
        <Link to="/dashboard" className="flex items-center p-3 mt-20 text-base font-medium text-white hover:bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition duration-300 ease-in-out" onClick={toggleSidebar}>
          <FaDashcube className={`mr-3 ${isOpen ? 'text-xl' : 'text-l transform scale-150'} flex-shrink-0`} />
          {isOpen && <span>Dashboard</span>}
        </Link>
        <Link to="/mybusinesses" className="flex items-center p-3 text-base font-medium text-white hover:bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition duration-300 ease-in-out" onClick={toggleSidebar}>
          <FaBusinessTime className={`mr-3 ${isOpen ? 'text-xl' : 'text-l transform scale-150'} flex-shrink-0`} />
          {isOpen && <span>My Businesses</span>}
        </Link>
        {isAuthenticated && isAdmin &&
        <Link to="/admin" className="flex items-center p-3 text-base font-medium text-white hover:bg-gradient-to-r from-green-500 to-teal-500 rounded-lg transition duration-300 ease-in-out" onClick={toggleSidebar}>
          <FaUserTie className={`mr-3 ${isOpen ? 'text-xl' : 'text-l transform scale-150'} flex-shrink-0`} />
          {isOpen && <span>Admin</span>}
        </Link>}
        <Link to="/complaints" className="flex items-center p-3 text-base font-medium text-white hover:bg-gradient-to-r from-red-500 to-pink-500 rounded-lg transition duration-300 ease-in-out" onClick={toggleSidebar}>
          <FaFileAlt className={`mr-3 ${isOpen ? 'text-xl' : 'text-l transform scale-150'} flex-shrink-0`} />
          {isOpen && <span>Complaints</span>}
        </Link>
        <Link to="/subscription" className="flex items-center p-3 text-base font-medium text-white hover:bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg transition duration-300 ease-in-out" onClick={toggleSidebar}>
          <FaDollarSign className={`mr-3 ${isOpen ? 'text-xl' : 'text-l transform scale-150'} flex-shrink-0`} />
          {isOpen && <span>Subscription</span>}
        </Link>
        <Link to="/contact" className="flex items-center p-3 text-base font-medium text-white hover:bg-gradient-to-r from-pink-500 to-red-500 rounded-lg transition duration-300 ease-in-out" onClick={toggleSidebar}>
          <FaEnvelope className={`mr-3 ${isOpen ? 'text-xl' : 'text-l transform scale-150'} flex-shrink-0`} />
          {isOpen && <span>Contact</span>}
        </Link>
      </div>
    </div>
  );

  
}

export default Sidebar;
