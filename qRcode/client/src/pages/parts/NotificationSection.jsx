import React, { useState } from 'react';

const NotificationSection = () => {
  const [notifications] = useState([
    "Notification 1: Your account has been updated.",
    "Notification 2: New feature available.",
    "Notification 3: System maintenance scheduled."
  ]);

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <ul className="list-disc pl-5 space-y-2">
        {notifications.map((notification, index) => (
          <li key={index} className="bg-white p-3 rounded-md shadow-md">{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationSection;
