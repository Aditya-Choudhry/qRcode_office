import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get('https://crm.qrps.ca:5000/api/business/all');
        setBusinesses(response.data);
      } catch (error) {
        console.error('Error fetching businesses:', error);
        setError('Failed to fetch businesses.');
      }
    };

    fetchBusinesses(); // Call the fetchBusinesses function on component mount
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <h1 className="text-2xl font-semibold mb-4">All Businesses</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Business Name</th>
            <th className="py-2 px-4 border-b">Owner Id</th>
            <th className="py-2 px-4 border-b">Business Type</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {businesses.length > 0 ? (
            businesses.map((business) => (
              <tr key={business._id}>
                <td className="py-2 px-4 border-b">
                  {business.businessName}
                </td>
                <td className="py-2 px-4 border-b">
                  {business.ownerid}
                  
                </td>
                <td className="py-2 px-4 border-b">
                  {business.businessType}
                </td>
                <td className="py-2 px-4 border-b">
                  {business.businessAddress}
                </td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/business/${business._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-2 px-4 border-b text-center">No businesses found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllBusinesses;
