import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 font-bold text-xl">Clickstream Demo</span>
            </div>
            <div className="hidden md:ml-6 md:flex space-x-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    isActive ? 'text-blue-600 active-nav-link' : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    isActive ? 'text-blue-600 active-nav-link' : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                About
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    isActive ? 'text-blue-600 active-nav-link' : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                Contact
              </NavLink>
              <NavLink 
                to="/profile/user123" 
                className={({ isActive }) => 
                  `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    isActive ? 'text-blue-600 active-nav-link' : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                Profile
              </NavLink>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button className="bg-blue-600 p-1 rounded-full text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 