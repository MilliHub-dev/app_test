import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Save, Send, User, Smartphone, Car, Settings, Bug } from 'lucide-react';
import FormSection from '../components/FormSection';
import { 
  TestFormData, 
  passengerAppFeatures, 
  driverAppFeatures, 
  crossAppFeatures 
} from '../types';

const TestForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<TestFormData>({
    testerInfo: {
      name: '',
      role: 'QA',
      date: new Date().toISOString().split('T')[0]
    },
    passengerApp: {
      features: {},
      uiuxRating: { rating: 50 },
      comments: '',
      screenshots: []
    },
    driverApp: {
      features: {},
      uiuxRating: { rating: 50 },
      comments: '',
      screenshots: []
    },
    crossApp: {
      features: {},
      uiuxRating: { rating: 50 },
      screenshots: []
    },
    bugReports: [],
    finalFeedback: {
      overallRating: 50,
      suggestions: ''
    }
  });

  const [bugReport, setBugReport] = useState({
    priority: 'Medium' as 'Critical' | 'High' | 'Medium' | 'Low',
    description: '',
    screenshot: null as File | null
  });

  const steps = [
    { 
      title: 'Tester Info', 
      icon: User,
      description: 'Your details and role'
    },
    { 
      title: 'Passenger App', 
      icon: Smartphone,
      description: 'Test passenger features'
    },
    { 
      title: 'Driver App', 
      icon: Car,
      description: 'Test driver features'
    },
    { 
      title: 'Cross-App/Backend', 
      icon: Settings,
      description: 'Test backend systems'
    },
    { 
      title: 'Bug Reports', 
      icon: Bug,
      description: 'Report issues found'
    },
    { 
      title: 'Final Feedback', 
      icon: Send,
      description: 'Overall assessment'
    }
  ];

  const handleFeatureResultChange = (
    section: 'passengerApp' | 'driverApp' | 'crossApp',
    feature: string,
    status: 'Pass' | 'Fail' | 'Not Tested'
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        features: {
          ...prev[section].features,
          [feature]: { status }
        }
      }
    }));
  };

  const handleUIUXRatingChange = (
    section: 'passengerApp' | 'driverApp' | 'crossApp',
    rating: number
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        uiuxRating: { rating }
      }
    }));
  };

  const handleCommentsChange = (
    section: 'passengerApp' | 'driverApp',
    comments: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        comments
      }
    }));
  };

  const handleScreenshotsChange = (
    section: 'passengerApp' | 'driverApp' | 'crossApp',
    files: File[]
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        screenshots: files
      }
    }));
  };

  const addBugReport = () => {
    if (bugReport.description.trim()) {
      const newBugReport = {
        priority: bugReport.priority,
        description: bugReport.description,
        screenshot: bugReport.screenshot || undefined
      };
      
      setFormData(prev => ({
        ...prev,
        bugReports: [...prev.bugReports, newBugReport]
      }));

      setBugReport({
        priority: 'Medium',
        description: '',
        screenshot: null
      });
    }
  };

  const removeBugReport = (index: number) => {
    setFormData(prev => ({
      ...prev,
      bugReports: prev.bugReports.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    // Here you would typically send the data to a backend/database
    console.log('Form submitted:', formData);
    
    // Store in localStorage for demo purposes
    const existingData = localStorage.getItem('qa-submissions');
    const submissions = existingData ? JSON.parse(existingData) : [];
    submissions.push({
      ...formData,
      submittedAt: new Date().toISOString()
    });
    localStorage.setItem('qa-submissions', JSON.stringify(submissions));
    
    alert('Form submitted successfully!');
    
    // Reset form
    setCurrentStep(0);
    setFormData({
      testerInfo: {
        name: '',
        role: 'QA',
        date: new Date().toISOString().split('T')[0]
      },
      passengerApp: {
        features: {},
        uiuxRating: { rating: 50 },
        comments: '',
        screenshots: []
      },
      driverApp: {
        features: {},
        uiuxRating: { rating: 50 },
        comments: '',
        screenshots: []
      },
      crossApp: {
        features: {},
        uiuxRating: { rating: 50 },
        screenshots: []
      },
      bugReports: [],
      finalFeedback: {
        overallRating: 50,
        suggestions: ''
      }
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Stepper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl p-6"
      >
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-500 text-white' 
                        : isCompleted 
                        ? 'bg-green-500 text-white'
                        : 'bg-white/20 text-white/60'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-center mt-2">
                    <div className={`text-sm font-medium ${isActive ? 'text-white' : 'text-white/70'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-white/50">{step.description}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-white/20'}`} />
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Tester Information */}
          {currentStep === 0 && (
            <div className="glass-effect rounded-2xl p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Tester Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.testerInfo.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      testerInfo: { ...prev.testerInfo, name: e.target.value }
                    }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 form-input focus:outline-none"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Role *</label>
                  <select
                    value={formData.testerInfo.role}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      testerInfo: { ...prev.testerInfo, role: e.target.value as any }
                    }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-black form-input focus:outline-none"
                  >
                    <option value="QA">QA</option>
                    <option value="Developer">Developer</option>
                    <option value="Driver Tester">Driver Tester</option>
                    <option value="Passenger Tester">Passenger Tester</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.testerInfo.date}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      testerInfo: { ...prev.testerInfo, date: e.target.value }
                    }))}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white form-input focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Passenger App */}
          {currentStep === 1 && (
            <FormSection
              title="Passenger App Features"
              features={passengerAppFeatures}
              results={formData.passengerApp.features}
              onResultChange={(feature, status) => handleFeatureResultChange('passengerApp', feature, status)}
              uiuxRating={formData.passengerApp.uiuxRating.rating}
              onUIUXRatingChange={(rating) => handleUIUXRatingChange('passengerApp', rating)}
              comments={formData.passengerApp.comments}
              onCommentsChange={(comments) => handleCommentsChange('passengerApp', comments)}
              screenshots={formData.passengerApp.screenshots}
              onScreenshotsChange={(files) => handleScreenshotsChange('passengerApp', files)}
            />
          )}

          {/* Driver App */}
          {currentStep === 2 && (
            <FormSection
              title="Driver App Features"
              features={driverAppFeatures}
              results={formData.driverApp.features}
              onResultChange={(feature, status) => handleFeatureResultChange('driverApp', feature, status)}
              uiuxRating={formData.driverApp.uiuxRating.rating}
              onUIUXRatingChange={(rating) => handleUIUXRatingChange('driverApp', rating)}
              comments={formData.driverApp.comments}
              onCommentsChange={(comments) => handleCommentsChange('driverApp', comments)}
              screenshots={formData.driverApp.screenshots}
              onScreenshotsChange={(files) => handleScreenshotsChange('driverApp', files)}
            />
          )}

          {/* Cross-App/Backend */}
          {currentStep === 3 && (
            <FormSection
              title="Cross-App/Backend Features"
              features={crossAppFeatures}
              results={formData.crossApp.features}
              onResultChange={(feature, status) => handleFeatureResultChange('crossApp', feature, status)}
              uiuxRating={formData.crossApp.uiuxRating.rating}
              onUIUXRatingChange={(rating) => handleUIUXRatingChange('crossApp', rating)}
              screenshots={formData.crossApp.screenshots}
              onScreenshotsChange={(files) => handleScreenshotsChange('crossApp', files)}
              showComments={false}
            />
          )}

          {/* Bug Reports */}
          {currentStep === 4 && (
            <div className="glass-effect rounded-2xl p-8 space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">Bug Reports</h2>
              
              {/* Add New Bug */}
              <div className="space-y-6 p-6 bg-white/5 rounded-xl">
                <h3 className="text-lg font-semibold text-white">Report New Bug</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Priority</label>
                    <select
                      value={bugReport.priority}
                      onChange={(e) => setBugReport(prev => ({ 
                        ...prev, 
                        priority: e.target.value as any 
                      }))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-black form-input focus:outline-none"
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Bug Description</label>
                  <textarea
                    value={bugReport.description}
                    onChange={(e) => setBugReport(prev => ({ 
                      ...prev, 
                      description: e.target.value 
                    }))}
                    placeholder="Describe the bug in detail..."
                    rows={4}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 form-input focus:outline-none"
                  />
                </div>
                
                <button
                  onClick={addBugReport}
                  disabled={!bugReport.description.trim()}
                  className="btn-primary text-white font-semibold px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Bug Report
                </button>
              </div>

              {/* Existing Bug Reports */}
              {formData.bugReports.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Reported Bugs</h3>
                  {formData.bugReports.map((bug, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-white/10 rounded-lg border border-white/20"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 ${getPriorityColor(bug.priority)} rounded-full`}></div>
                          <span className="text-white font-medium">{bug.priority} Priority</span>
                        </div>
                        <button
                          onClick={() => removeBugReport(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-white/80">{bug.description}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Final Feedback */}
          {currentStep === 5 && (
            <div className="glass-effect rounded-2xl p-8 space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">Final Feedback</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-4">Overall Rating (0-100)</label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-white text-sm w-8">0</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.finalFeedback.overallRating}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          finalFeedback: {
                            ...prev.finalFeedback,
                            overallRating: Number(e.target.value)
                          }
                        }))}
                        className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-white text-sm w-8">100</span>
                    </div>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-white">{formData.finalFeedback.overallRating}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Final Suggestions or Comments</label>
                  <textarea
                    value={formData.finalFeedback.suggestions}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      finalFeedback: {
                        ...prev.finalFeedback,
                        suggestions: e.target.value
                      }
                    }))}
                    placeholder="Any final thoughts, suggestions, or overall feedback..."
                    rows={6}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 form-input focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center space-x-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <div className="flex space-x-4">
          <button
            onClick={() => {
              // Save progress to localStorage
              localStorage.setItem('qa-form-progress', JSON.stringify({ currentStep, formData }));
              alert('Progress saved!');
            }}
            className="flex items-center space-x-2 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Save Progress</span>
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 btn-primary text-white font-semibold px-6 py-3 rounded-lg"
            >
              <Send className="w-5 h-5" />
              <span>Submit Form</span>
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex items-center space-x-2 btn-primary text-white font-semibold px-6 py-3 rounded-lg"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestForm;