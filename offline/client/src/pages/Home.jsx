
import React from "react";
import { FaCheckCircle, FaChartBar, FaUsers, FaHeadset } from "react-icons/fa"; 

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-purple-800 to-indigo-600 min-h-screen text-white">
      {/* Navbar */}
      <nav className="bg-transparent absolute top-0 left-0 w-full z-20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="text-lg font-bold">Barqon</div>
          <div className="space-x-6 hidden sm:block">
            <a href="#contact" className="text-gray-200 hover:text-white transition">Contact</a>
          </div>
          
        </div>
        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden sm:hidden">
          <a href="#contact" className="block text-gray-200 hover:text-white px-4 py-2">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-900 to-transparent opacity-80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Empower Your Business with Barqon
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10">
            The ultimate solution to manage your customers, track your sales, and grow your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="./signup"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-md text-lg font-medium transition"
            >
              Get Started
            </a>
            <a
              href="./login"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-white hover:text-indigo-500 transition"
            >
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="bg-white text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold">Why Choose Barqon CRM?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover the powerful features designed to help you succeed.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <FaCheckCircle className="mx-auto text-indigo-500 w-12 h-12 sm:w-16 sm:h-16 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold">Comprehensive Dashboard</h3>
              <p className="mt-2 text-gray-600">
                Gain insights with an intuitive, real-time dashboard.
              </p>
            </div>
            <div className="text-center">
              <FaChartBar className="mx-auto text-indigo-500 w-12 h-12 sm:w-16 sm:h-16 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold">Advanced Analytics</h3>
              <p className="mt-2 text-gray-600">
                Track your business growth with detailed reports and analytics.
              </p>
            </div>
            <div className="text-center">
              <FaUsers className="mx-auto text-indigo-500 w-12 h-12 sm:w-16 sm:h-16 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold">Customer Management</h3>
              <p className="mt-2 text-gray-600">
                Manage customer relationships efficiently.
              </p>
            </div>
            <div className="text-center">
              <FaHeadset className="mx-auto text-indigo-500 w-12 h-12 sm:w-16 sm:h-16 mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold">24/7 Support</h3>
              <p className="mt-2 text-gray-600">
                Get support whenever you need it.
              </p>
            </div>
          </div>
        </div>
      </div>

     

      {/* Contact Section */}
      <div id="contact" className="bg-indigo-700 py-16 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold">Get in Touch</h2>
            <p className="mt-4 text-lg text-indigo-100">
              We'd love to hear from you! Reach out to us today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-6">
            <a
              href="mailto:contact@barqon.com"
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-md text-lg font-medium transition"
            >
              Email Us
            </a>
            <a
              href="tel:+123456789"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-white hover:text-indigo-500 transition"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 text-center">
        <p>&copy; 2024 Barqon CRM. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
