import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import TestGuide from './pages/TestGuide';
import TestForm from './pages/TestForm';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <Routes>
            <Route path="/" element={<TestGuide />} />
            <Route path="/form" element={<TestForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </motion.main>
        
        {/* Powered by Millihub Footer */}
        <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-4">
          <div className="container mx-auto px-4 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/80 text-sm"
            >
              Powered by{' '}
              <span className="font-bold gradient-text">MILLIHUB</span>
            </motion.p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
