import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDownIcon, ChartBarIcon, GlobeAltIcon, ChevronUpIcon  } from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/outline';

const data = [
  { name: 'Jan', users: 4000, sales: 2400 },
  { name: 'Feb', users: 3000, sales: 1398 },
  { name: 'Mar', users: 2000, sales: 9800 },
  { name: 'Apr', users: 2780, sales: 3908 },
  { name: 'May', users: 1890, sales: 4800 },
  { name: 'Jun', users: 2390, sales: 3800 },
  { name: 'Jul', users: 3490, sales: 4300 },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col space-y-6 p-4 md:p-8 lg:ml-20">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 md:p-6 rounded-lg shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-xl md:text-2xl font-semibold">Barqon CRM Dashboard</div>
          <div className="flex space-x-4">
            <button className="flex items-center text-gray-400 hover:text-gray-200">
              <UserIcon className="h-6 w-6" />
              <span className="ml-2">Users</span>
            </button>
            <button className="flex items-center text-gray-400 hover:text-gray-200">
              <ChartBarIcon className="h-6 w-6" />
              <span className="ml-2">Reports</span>
            </button>
            <button className="flex items-center text-gray-400 hover:text-gray-200">
              <GlobeAltIcon className="h-6 w-6" />
              <span className="ml-2">Global</span>
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-lg md:text-xl font-semibold">Total Users</div>
            <div className="text-green-500 flex items-center">
              <ChevronUpIcon className="h-6 w-6" />
              <span className="ml-1">+12%</span>
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-bold mt-4">8,654</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-lg md:text-xl font-semibold">Total Sales</div>
            <div className="text-red-500 flex items-center">
              <ChevronDownIcon className="h-6 w-6" />
              <span className="ml-1">-8%</span>
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-bold mt-4">$45,678</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="text-lg md:text-xl font-semibold">New Orders</div>
            <div className="text-yellow-500 flex items-center">
              <ChevronUpIcon className="h-6 w-6" />
              <span className="ml-1">+25%</span>
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-bold mt-4">1,234</div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-xl font-semibold mb-4">Sales Overview</div>
        <div className="w-full h-64">
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;