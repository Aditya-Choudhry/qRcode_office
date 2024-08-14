
// src/pages/AllUsers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://crm.qrps.ca:5000/api/user/alluser'); 
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users.');
      }
    };

    fetchUsers(); // Call the fetchUsers function on component mount
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">phone</th>
            <th className="py-2 px-4 border-b">Address</th>
            {/* Add other columns as needed */}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user.first_name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.phone_number}</td>
                <td className="py-2 px-4 border-b">{user.address}</td>
                {/* Add other fields as needed */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="py-2 px-4 border-b text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
