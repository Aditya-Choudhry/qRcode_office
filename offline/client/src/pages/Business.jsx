import React, { useState } from 'react';
import { FaCog, FaKey, FaTags, FaRobot, FaBell, FaRedo } from 'react-icons/fa';
import KeywordSection from './parts/KeywordSection';
import GeneralSection from './parts/GeneralSection';
import NotificationSection from './parts/NotificationSection';
import AIResponseSection from './parts/AIResponseSection';
import TagSection from './parts/TagSection';
import './Business.css'; // Custom styles

const tabs = [
    { id: 'general', name: 'General', icon: <FaCog /> },
    { id: 'keywords', name: 'Keywords', icon: <FaKey /> },
    { id: 'tags', name: 'Tags', icon: <FaTags /> },
    { id: 'aiResponses', name: 'AI Responses', icon: <FaRobot /> },
    { id: 'notifications', name: 'Notifications', icon: <FaBell />, badge: 5 },
];

const Business = () => {
    const [activeTab, setActiveTab] = useState('general');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleReset = () => {
        setActiveTab('general');
    };

    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg lg:ml-48">
            {/* Tabs Navigation */}
            <div className="mb-4 sm:mb-6 border-b border-gray-300 relative">
                <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-4 justify-center">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`flex items-center gap-1 sm:gap-2 py-1 px-2 sm:py-2 sm:px-3 md:px-4 rounded-md text-xs sm:text-sm md:text-base font-semibold transition duration-300 relative ${activeTab === tab.id ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            {tab.icon}
                            <span>{tab.name}</span>
                            {tab.badge && (
                                <span className="ml-1 sm:ml-2 text-xs sm:text-xs bg-red-500 text-white px-1 py-0.5 rounded-full">
                                    {tab.badge}
                                </span>
                            )}
                            {activeTab === tab.id && <div className="active-indicator"></div>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-4 sm:space-y-6 tab-content p-4 sm:p-6 bg-gray-50 rounded-lg shadow-inner">
                {activeTab === 'general' && <GeneralSection />}
                {activeTab === 'keywords' && <KeywordSection />}
                {activeTab === 'tags' && <TagSection />}
                {activeTab === 'aiResponses' && <AIResponseSection />}
                {activeTab === 'notifications' && <NotificationSection />}
            </div>
        </div>
    );
};

export default Business;