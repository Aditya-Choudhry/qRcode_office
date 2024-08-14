import React, { useState } from 'react';

const AIResponseSection = () => {
  const [yourResponse, setYourResponse] = useState('');
  const [getResponse, setGetResponse] = useState('');

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <div className="flex flex-col mb-4">
        <label htmlFor="yourResponse" className="text-gray-700">Your Responses</label>
        <textarea
          id="yourResponse"
          value={yourResponse}
          onChange={(e) => setYourResponse(e.target.value)}
          className="border border-gray-300 rounded-md p-2 h-32 resize-none"
          placeholder="Enter your responses"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="getResponse" className="text-gray-700">Get Response</label>
        <textarea
          id="getResponse"
          value={getResponse}
          onChange={(e) => setGetResponse(e.target.value)}
          className="border border-gray-300 rounded-md p-2 h-32 resize-none"
          placeholder="Get the response"
        />
      </div>
    </div>
  );
};

export default AIResponseSection;
