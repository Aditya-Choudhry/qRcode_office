import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        // Fetch all feedbacks from the backend
        const response = await axios.get('http://localhost:5000/api/allfeedbacks');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setError('Failed to fetch feedbacks. Please try again later.');
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Feedbacks</h1>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-md">
        {feedbacks.length === 0 ? (
          <p className="text-gray-700">No feedbacks available.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Feedback</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">BusinessId</th>

              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td className="border border-gray-300 p-2">{feedback.feedback}</td>
                  <td className="border border-gray-300 p-2">{feedback.name || '-'}</td>
                  <td className="border border-gray-300 p-2">{feedback.email || '-'}</td>
                  <td className="border border-gray-300 p-2">{feedback.phone || '-'}</td>
                  <td className="border border-gray-300 p-2">{feedback.businessId || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllFeedback;
