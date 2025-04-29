import React, { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import UserProfilePage from './pages/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Don't import directly - we'll use script tag loading
import  { Clickstream } from '../../../src/index';

function App() {
  const isRecording = useRef(false);

  useEffect(() => {
    if(!isRecording.current) {
      isRecording.current = new Clickstream({
        environmentId: 'react-app-example',
        samplingRate: 1,
        blockClass: 'body',
        maskAllInputs: false,
        maskTextClass: 'body',
        remoteEndpoint: 'http://localhost:3001/events',
      });
      isRecording.current.start();
    }

    return () => {
      // console.log("✋ Stopping tracker");
      // isRecording.current.stop();
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-6 px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile/:userId" element={<UserProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>Clickstream Tracker React Example - {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 