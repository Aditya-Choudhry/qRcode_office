import React, { useState } from 'react';

const TagSection = () => {
  const [metaTag, setMetaTag] = useState('');
  const [personalTag, setPersonalTag] = useState('');

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <div className="flex flex-col mb-4">
        <label htmlFor="metaTag" className="text-gray-700">Meta Tag</label>
        <input
          type="text"
          id="metaTag"
          value={metaTag}
          onChange={(e) => setMetaTag(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
          placeholder="Enter meta tag"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="personalTag" className="text-gray-700">Personal Tag</label>
        <input
          type="text"
          id="personalTag"
          value={personalTag}
          onChange={(e) => setPersonalTag(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
          placeholder="Enter personal tag"
        />
      </div>
    </div>
  );
};

export default TagSection;
