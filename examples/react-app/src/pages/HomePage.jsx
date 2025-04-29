import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Clickstream Tracker Demo</h1>
        <p className="text-xl text-gray-600">
          Tracking user interactions in a React application
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="mb-4">
          This example demonstrates how to use the Clickstream Tracker in a React application.
          The tracker records user interactions like clicks, inputs, and navigation between pages.
        </p>
        <p className="mb-4">
          Try navigating around the site, clicking buttons, and filling out forms. 
          All these interactions are being tracked automatically.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <Link 
            to="/about" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Learn More
          </Link>
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            onClick={() => alert('Button clicked! This interaction is tracked.')}
          >
            Try Clicking Me
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-3">Track User Journeys</h3>
          <p>
            Understand how users navigate through your application and which features they interact with most.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-3">Privacy-Focused</h3>
          <p>
            Configure what data is tracked and mask sensitive information to protect user privacy.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-3">Session Storage</h3>
          <p>
            Events are stored in session storage and can be sent to a remote endpoint for analysis.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-3">Easy Integration</h3>
          <p>
            Simple setup process for any React application with minimal configuration required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 