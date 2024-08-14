import React from 'react';
import './styles.css'; // Import the Tailwind CSS file (adjust path if needed)

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-400 min-h-screen">
      {/* Navbar */}
      <nav className="bg-transparent fixed top-0 inset-x-0 z-10 shadow-md transition-shadow duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Home</a>
                <a href="#" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Features</a>
                <a href="#" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">About</a>
                <a href="#" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover object-center" src="/hero-bg.jpg" alt="Hero Background" />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 animate-fade-in">
            Welcome to Our Software Company
          </h1>
          <p className="text-lg sm:text-xl text-white mb-8 animate-fade-in animation-delay-200">
            We provide cutting-edge solutions for your business needs.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="./signup" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium transition-transform transform hover:scale-105">
              Sign Up
            </a>
            <a href="./login" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-white hover:text-blue-500 transition-transform transform hover:scale-105">
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 animate-fade-in">
              Our Products
            </h2>
            <p className="mt-4 text-lg text-gray-600 animate-fade-in animation-delay-200">
              Check out some of our featured products.
            </p>
          </div>

          {/* Carousel (using Swiper.js or similar library) */}
          <div className="swiper-container mt-8">
            <div className="swiper-wrapper">
              <div className="swiper-slide transition-transform duration-500 transform hover:scale-105">
                <img src="/product1.jpg" alt="Product 1" className="rounded-lg shadow-lg mx-auto" />
                {/* Product description */}
              </div>
              <div className="swiper-slide transition-transform duration-500 transform hover:scale-105">
                <img src="/product2.jpg" alt="Product 2" className="rounded-lg shadow-lg mx-auto" />
                {/* Product description */}
              </div>
              {/* Add more slides as needed */}
            </div>
            {/* Pagination and Navigation Buttons */}
            <div className="swiper-pagination"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <p className="text-center text-sm animate-fade-in">
          &copy; {new Date().getFullYear()} Our Software Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
