import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-grow p-4 md:p-8 bg-gray-100 overflow-y-auto mt-16">
          <Outlet />
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
