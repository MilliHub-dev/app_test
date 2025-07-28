import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Upload, 
  AlertTriangle, 
  ArrowRight,
  Smartphone,
  Users,
  Car,
  Settings
} from 'lucide-react';

const TestGuide: React.FC = () => {
  const steps = [
    {
      icon: Users,
      title: 'Fill out your name and role',
      description: 'Identify yourself as QA, Developer, Driver Tester, or Passenger Tester'
    },
    {
      icon: CheckCircle,
      title: 'Test each feature',
      description: 'For each feature, select Pass, Fail, or Not Tested based on your experience'
    },
    {
      icon: AlertTriangle,
      title: 'Rate UI/UX',
      description: 'Rate the user interface and experience on a scale of 0-100 (0 = Bad, 100 = Excellent)'
    },
    {
      icon: Upload,
      title: 'Upload screenshots',
      description: 'Upload screenshots of any issues or bugs you encounter during testing'
    },
    {
      icon: Settings,
      title: 'Mark bug priority',
      description: 'Categorize bugs as Critical, High, Medium, or Low priority'
    },
    {
      icon: ArrowRight,
      title: 'Submit and continue',
      description: 'Submit each section (Passenger, Driver, Cross-App) and move to the next'
    }
  ];

  const priorities = [
    {
      level: 'Critical',
      color: 'bg-red-500',
      description: 'Blocks use of the application'
    },
    {
      level: 'High',
      color: 'bg-orange-500',
      description: 'Severe issue, but workaround exists'
    },
    {
      level: 'Medium',
      color: 'bg-yellow-500',
      description: 'Annoying but application is still usable'
    },
    {
      level: 'Low',
      color: 'bg-green-500',
      description: 'Minor cosmetic issue'
    }
  ];

  const sections = [
    {
      icon: Smartphone,
      title: 'Passenger App',
      description: 'Test ride booking, payments, tracking, and user features',
      features: 13
    },
    {
      icon: Car,
      title: 'Driver App',
      description: 'Test driver onboarding, ride acceptance, earnings, and navigation',
      features: 13
    },
    {
      icon: Settings,
      title: 'Cross-App/Backend',
      description: 'Test ride matching, fare splitting, wallet integration, and admin features',
      features: 9
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Sabi-Ride QA Testing
        </h1>
        <p className="text-xl text-white/80 mb-8">Quick Guide</p>
      </motion.div>

      {/* Quick Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          How to Test - Quick Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="card-hover bg-white/10 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-white/70 text-sm">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Bug Priority Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Bug Priority Levels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {priorities.map((priority, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className="card-hover bg-white/10 rounded-xl p-6 backdrop-blur-sm text-center"
            >
              <div className={`w-4 h-4 ${priority.color} rounded-full mx-auto mb-3`}></div>
              <h3 className="font-semibold text-white mb-2">{priority.level}</h3>
              <p className="text-white/70 text-sm">{priority.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testing Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-effect rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Testing Sections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="card-hover bg-white/10 rounded-xl p-6 backdrop-blur-sm text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{section.title}</h3>
                <p className="text-white/70 text-sm mb-3">{section.description}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-sm">
                  {section.features} features
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Start Testing Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <Link
          to="/form"
          className="inline-flex items-center space-x-3 btn-primary text-white font-semibold px-8 py-4 rounded-xl text-lg"
        >
          <span>Start Testing</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  );
};

export default TestGuide;