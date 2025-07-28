export interface TesterInfo {
  name: string;
  role: 'QA' | 'Developer' | 'Driver Tester' | 'Passenger Tester';
  date: string;
}

export interface TestResult {
  status: 'Pass' | 'Fail' | 'Not Tested';
}

export interface SectionResults {
  [feature: string]: TestResult;
}

export interface UIUXRating {
  rating: number; // 0-100
}

export interface BugReport {
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  screenshot?: File;
}

export interface TestFormData {
  testerInfo: TesterInfo;
  passengerApp: {
    features: SectionResults;
    uiuxRating: UIUXRating;
    comments: string;
    screenshots: File[];
  };
  driverApp: {
    features: SectionResults;
    uiuxRating: UIUXRating;
    comments: string;
    screenshots: File[];
  };
  crossApp: {
    features: SectionResults;
    uiuxRating: UIUXRating;
    screenshots: File[];
  };
  bugReports: BugReport[];
  finalFeedback: {
    overallRating: number;
    suggestions: string;
  };
}

export interface DashboardData {
  passRate: number;
  uiuxAverage: number;
  bugCount: number;
  criticalBugs: number;
  highBugs: number;
  mediumBugs: number;
  lowBugs: number;
  submissions: TestFormData[];
}

export const passengerAppFeatures = [
  'Registration/Login',
  'Normal Ride Booking',
  'Group Ride Booking',
  'Shared Ride Booking',
  'Dispatch Delivery',
  'Fare Estimation',
  'Driver Tracking',
  'Payment',
  'Ride History',
  'Referral System',
  'Push Notifications',
  'Profile & Settings',
  'Customer Support'
];

export const driverAppFeatures = [
  'Driver Registration/Onboarding',
  'Accept/Reject Ride',
  'Group Ride Acceptance',
  'Shared Ride Acceptance',
  'Dispatch Delivery Acceptance',
  'Navigation to Pickup/Dropoff',
  'Earnings & Wallet',
  'Daily Fee Payment',
  'Rating/Feedback',
  'Referral Rewards',
  'Availability Status',
  'Notifications',
  'Support & Complaints'
];

export const crossAppFeatures = [
  'Ride Matching (Normal)',
  'Ride Matching (Group)',
  'Ride Matching (Shared)',
  'Ride Matching (Dispatch)',
  'Fare Splitting Logic',
  'Wallet Integration (paystack)',
  'Referral Points Allocation',
  'Sabi Cash Conversion',
  'Admin Dashboard Monitoring'
];