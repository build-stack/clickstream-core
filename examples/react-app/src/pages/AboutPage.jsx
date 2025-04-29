import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Clickstream Tracker</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">What is Clickstream Tracking?</h2>
        <p className="mb-4">
          Clickstream tracking is the process of recording and analyzing the sequence of clicks or interactions
          that users make while navigating through a website or application. This data provides valuable insights
          into user behavior, preferences, and pain points.
        </p>
        <p>
          With the Clickstream Tracker library, you can easily implement this functionality in your web applications
          and capture detailed information about how users interact with your interface.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Automatic tracking of user interactions (clicks, form inputs, navigation)</li>
          <li>Session-based tracking with persistent session IDs</li>
          <li>Environment identification for multi-domain applications</li>
          <li>Data storage in session storage with configurable limits</li>
          <li>Option to send data to a remote endpoint for analysis</li>
          <li>Privacy controls with input masking capabilities</li>
          <li>Customizable sampling rates for high-volume events</li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Implementation Details</h2>
        <p className="mb-4">
          This React example demonstrates how to integrate the Clickstream Tracker into a modern web application.
          The tracker is initialized in the main App component and automatically captures user interactions
          throughout the application lifecycle.
        </p>
        <div className="bg-gray-100 p-4 rounded">
          <pre className="text-sm overflow-x-auto">
{`// Initialize the tracker
const tracker = new ClickstreamTracker({
  samplingRate: 1,
  maskAllInputs: false,
  environmentId: 'react-app-example',
  maxEvents: 50,
  remoteEndpoint: 'https://api.example.com/events'
});

// Start tracking
tracker.start();

// Stop tracking when component unmounts
return () => {
  tracker.stop();
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 