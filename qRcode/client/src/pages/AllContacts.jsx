// src/pages/AllContacts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('https://crm.qrps.ca:5000/api/contact');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Failed to fetch contacts.');
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <h1 className="text-2xl font-semibold mb-4">All Contacts</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Message</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact._id} className='center'>
                <td className="py-2 px-4 border-b">{contact.username}</td>
                <td className="py-2 px-4 border-b">{contact.email}</td>
                <td className="py-2 px-4 border-b">{contact.message}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-2 px-4 border-b text-center">No contacts found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllContacts;
