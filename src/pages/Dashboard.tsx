import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Bug, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Calendar,
  Filter,
  Settings
} from 'lucide-react';
import { TestFormData } from '../types';

const Dashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<TestFormData[]>([]);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from production Neon database
    const loadSubmissions = async () => {
      try {
        const { getSubmissions } = await import('../utils/database');
        const data = await getSubmissions();
        setSubmissions(data);
      } catch (error) {
        console.error('Error loading submissions:', error);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };

    loadSubmissions();
  }, []);

  // Calculate metrics
  const calculateMetrics = () => {
    if (submissions.length === 0) {
      return {
        totalSubmissions: 0,
        passRate: 0,
        avgUIUX: 0,
        totalBugs: 0,
        criticalBugs: 0,
        highBugs: 0,
        mediumBugs: 0,
        lowBugs: 0
      };
    }

    const totalFeatures = submissions.reduce((acc, submission) => {
      const passengerFeatures = Object.keys(submission.passengerApp.features).length;
      const driverFeatures = Object.keys(submission.driverApp.features).length;
      const crossAppFeatures = Object.keys(submission.crossApp.features).length;
      return acc + passengerFeatures + driverFeatures + crossAppFeatures;
    }, 0);

    const passedFeatures = submissions.reduce((acc, submission) => {
      const passengerPassed = Object.values(submission.passengerApp.features).filter(f => f.status === 'Pass').length;
      const driverPassed = Object.values(submission.driverApp.features).filter(f => f.status === 'Pass').length;
      const crossAppPassed = Object.values(submission.crossApp.features).filter(f => f.status === 'Pass').length;
      return acc + passengerPassed + driverPassed + crossAppPassed;
    }, 0);

    const avgUIUX = submissions.reduce((acc, submission) => {
      const avg = (submission.passengerApp.uiuxRating.rating + 
                   submission.driverApp.uiuxRating.rating + 
                   submission.crossApp.uiuxRating.rating) / 3;
      return acc + avg;
    }, 0) / submissions.length;

    const bugCounts = submissions.reduce((acc, submission) => {
      const priorityMap: { [key: string]: keyof typeof acc } = {
        Critical: 'criticalBugs',
        High: 'highBugs',
        Medium: 'mediumBugs',
        Low: 'lowBugs'
      };
      submission.bugReports.forEach(bug => {
        const key = priorityMap[bug.priority];
        if (key) {
          acc[key]++;
        }
        acc.totalBugs++;
      });
      return acc;
    }, { totalBugs: 0, criticalBugs: 0, highBugs: 0, mediumBugs: 0, lowBugs: 0 });

    return {
      totalSubmissions: submissions.length,
      passRate: totalFeatures > 0 ? (passedFeatures / totalFeatures) * 100 : 0,
      avgUIUX: Math.round(avgUIUX),
      ...bugCounts
    };
  };

  const metrics = calculateMetrics();

  // Generate chart data
  const getPassRateBySection = () => {
    if (submissions.length === 0) return [];

    const sections = ['Passenger App', 'Driver App', 'Cross-App'];
    return sections.map(section => {
      const sectionKey = section === 'Passenger App' ? 'passengerApp' : 
                        section === 'Driver App' ? 'driverApp' : 'crossApp';
      
      const totalFeatures = submissions.reduce((acc, submission) => {
        return acc + Object.keys(submission[sectionKey].features).length;
      }, 0);

      const passedFeatures = submissions.reduce((acc, submission) => {
        return acc + Object.values(submission[sectionKey].features).filter(f => f.status === 'Pass').length;
      }, 0);

      const failedFeatures = submissions.reduce((acc, submission) => {
        return acc + Object.values(submission[sectionKey].features).filter(f => f.status === 'Fail').length;
      }, 0);

      const notTested = totalFeatures - passedFeatures - failedFeatures;

      return {
        section,
        passed: passedFeatures,
        failed: failedFeatures,
        notTested,
        passRate: totalFeatures > 0 ? Math.round((passedFeatures / totalFeatures) * 100) : 0
      };
    });
  };

  const getBugPriorityData = () => [
    { name: 'Critical', value: metrics.criticalBugs, color: '#ef4444' },
    { name: 'High', value: metrics.highBugs, color: '#f97316' },
    { name: 'Medium', value: metrics.mediumBugs, color: '#eab308' },
    { name: 'Low', value: metrics.lowBugs, color: '#22c55e' }
  ];

  const getUIUXTrend = () => {
    return submissions.map((submission, index) => ({
      submission: `Test ${index + 1}`,
      passengerApp: submission.passengerApp.uiuxRating.rating,
      driverApp: submission.driverApp.uiuxRating.rating,
      crossApp: submission.crossApp.uiuxRating.rating,
      overall: submission.finalFeedback.overallRating
    }));
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'passenger', name: 'Passenger', icon: Users },
    { id: 'driver', name: 'Driver', icon: Users },
    { id: 'crossapp', name: 'Cross-App', icon: Settings },
    { id: 'bugs', name: 'Bugs', icon: Bug }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">
          QA Testing Dashboard
        </h1>
        <p className="text-lg md:text-xl text-white/80">Analytics and Insights</p>
      </motion.div>

      {/* Metrics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        <div className="glass-effect rounded-xl p-4 md:p-6 card-hover">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold text-white">{metrics.totalSubmissions}</div>
            <div className="text-white/70 text-sm md:text-base">Total Submissions</div>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-4 md:p-6 card-hover">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold text-white">{Math.round(metrics.passRate)}%</div>
            <div className="text-white/70 text-sm md:text-base">Pass Rate</div>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-4 md:p-6 card-hover">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold text-white">{metrics.avgUIUX}/100</div>
            <div className="text-white/70 text-sm md:text-base">Avg UI/UX Score</div>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-4 md:p-6 card-hover">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <Bug className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-400" />
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold text-white">{metrics.totalBugs}</div>
            <div className="text-white/70 text-sm md:text-base">Total Bugs</div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-xl p-2"
      >
        <div className="flex space-x-1 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all whitespace-nowrap text-sm md:text-base ${
                  selectedTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={selectedTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pass Rate by Section */}
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Pass Rate by Section</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getPassRateBySection()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="section" stroke="rgba(255,255,255,0.7)" />
                  <YAxis stroke="rgba(255,255,255,0.7)" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Bar dataKey="passed" fill="#22c55e" name="Passed" />
                  <Bar dataKey="failed" fill="#ef4444" name="Failed" />
                  <Bar dataKey="notTested" fill="#6b7280" name="Not Tested" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Bug Priority Distribution */}
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Bug Priority Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getBugPriorityData()}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value = 0 }) => value > 0 ? `${name}: ${value}` : ''}
                  >
                    {getBugPriorityData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* UI/UX Trend */}
            {submissions.length > 1 && (
              <div className="lg:col-span-2 glass-effect rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">UI/UX Rating Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getUIUXTrend()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="submission" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Line type="monotone" dataKey="passengerApp" stroke="#3b82f6" name="Passenger App" />
                    <Line type="monotone" dataKey="driverApp" stroke="#10b981" name="Driver App" />
                    <Line type="monotone" dataKey="crossApp" stroke="#f59e0b" name="Cross-App" />
                    <Line type="monotone" dataKey="overall" stroke="#8b5cf6" name="Overall" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'bugs' && (
          <div className="space-y-6">
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Bug Reports</h3>
              
              {submissions.length === 0 ? (
                <div className="text-center py-12">
                  <Bug className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <p className="text-white/70">No bug reports available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.flatMap((submission, submissionIndex) => 
                    submission.bugReports.map((bug, bugIndex) => (
                      <motion.div
                        key={`${submissionIndex}-${bugIndex}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: bugIndex * 0.1 }}
                        className="p-4 bg-white/10 rounded-lg border border-white/20"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full ${
                              bug.priority === 'Critical' ? 'bg-red-500' :
                              bug.priority === 'High' ? 'bg-orange-500' :
                              bug.priority === 'Medium' ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}></div>
                            <span className="text-white font-medium">{bug.priority} Priority</span>
                          </div>
                          <div className="text-white/60 text-sm">
                            Reported by: {submission.testerInfo.name} ({submission.testerInfo.role})
                          </div>
                        </div>
                        <p className="text-white/80">{bug.description}</p>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Other tabs would show detailed breakdowns for each section */}
        {submissions.length === 0 && selectedTab !== 'overview' && selectedTab !== 'bugs' && (
          <div className="glass-effect rounded-xl p-12 text-center">
            <div className="text-white/30 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-white/70 text-lg">No data available yet</p>
            <p className="text-white/50">Submit some test results to see detailed analytics</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;