import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState(''); 
  const [businessCount, setBusinessCount] = useState(0);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deletingBusinessId, setDeletingBusinessId] = useState(null);
  
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        // Fetch businesses
        const businessesResponse = await axios.get(`https://crm.qrps.ca:5000/api/business/user/${userId}`);
        setBusinesses(businessesResponse.data);
        setBusinessCount(businessesResponse.data.length);

        // Fetch user subscription plan
        const userResponse = await axios.get(`https://crm.qrps.ca:5000/api/user/${userId}`);
        setPlan(userResponse.data.subscriptionType); // Assuming subscription plan is returned in this response

      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      }
    };

    fetchBusinessData();
  }, [userId]);

  const getBusinessLimit = (plan) => {
    switch (plan) {
      case 'essential':
        return 2;
      case 'perform':
        return 4;
      case 'enterprise':
        return 6;
      default:
        return 0;
    }
  };

  const handleAddBusiness = () => {
    localStorage.removeItem('businessId');
    navigate(`/business`);
  };

  const handleEditClick = (businessId) => {
    localStorage.setItem('businessId', businessId);
    navigate(`/business/${businessId}`);
  };

  const handleDeleteClick = (businessId) => {
    setDeletingBusinessId(businessId);
    setShowConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`https://crm.qrps.ca:5000/api/business/${deletingBusinessId}`);
      setBusinesses(businesses.filter(business => business._id !== deletingBusinessId));
      setBusinessCount(businessCount - 1); // Decrement business count
      setDeletingBusinessId(null);
      setShowConfirmDelete(false);
    } catch (err) {
      setError('Error deleting business');
      console.error(err);
    }
  };

  const handleCancelDelete = () => {
    setDeletingBusinessId(null);
    setShowConfirmDelete(false);
  };

  const businessLimit = getBusinessLimit(plan);
  const canAddBusiness = businessCount < businessLimit;

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-400 min-h-screen lg:ml-20">
      {/* Businesses Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-extrabold text-gray-900">Your Businesses</h2>
              <p className="mt-4 text-lg text-gray-600">
                Here are your businesses in the account
              </p>
            </div>
            {canAddBusiness && (
              <button
              className="mt-6 sm:mt-0 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-teal-400 hover:to-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform"
                onClick={handleAddBusiness}
              >
                Add Business
              </button>
            )}
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {businesses.length > 0 ? (
              businesses.map((business) => (
                <div key={business._id} className="relative p-4 border rounded-lg shadow-md bg-white">
                  {/* Delete Icon */}
                  <button
                    onClick={() => handleDeleteClick(business._id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-800"
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <p className="mt-2 text-lg font-bold">{business.businessName}</p>
                  <p className="text-gray-600">{business.businessType}</p>
                  <button
                    onClick={() => handleEditClick(business._id)}
                    className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-teal-400 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform"
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No businesses found</p>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-4">Do you really want to delete this business? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBusinesses;



