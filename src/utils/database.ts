// Database utility functions for Neon PostgreSQL integration
import axios from 'axios';

export interface DatabaseConfig {
  connectionString: string;
}

// Backend API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Initialize database tables (handled by backend)
export const initDatabase = async () => {
  try {
    console.log('Database initialization handled by backend server');
    return { success: true };
  } catch (error) {
    console.error('Error initializing database:', error);
    return { success: false, error };
  }
};

export const saveSubmission = async (submission: any) => {
  try {
    console.log('Saving submission to Neon database via backend...', submission);
    
    const response = await axios.post(`${API_BASE_URL}/submissions`, submission, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 second timeout
    });
    
    if (response.data.success) {
      console.log('✅ Submission saved successfully to Neon database');
      return { 
        success: true, 
        id: response.data.submissionId,
        message: response.data.message 
      };
    } else {
      throw new Error(response.data.error || 'Failed to save submission');
    }
  } catch (error: any) {
    console.error('❌ Error saving submission to database:', error);
    
    // Return user-friendly error message
    const errorMessage = error.response?.data?.error || 
                        error.message || 
                        'Failed to save submission to database';
    
    return { 
      success: false, 
      error: errorMessage 
    };
  }
};

export const getSubmissions = async () => {
  try {
    console.log('Fetching submissions from Neon database via backend...');
    
    const response = await axios.get(`${API_BASE_URL}/submissions`, {
      timeout: 30000, // 30 second timeout
    });
    
    console.log('✅ Successfully fetched submissions from Neon database');
    return response.data || [];
  } catch (error: any) {
    console.error('❌ Error fetching submissions from database:', error);
    
    // Return empty array on error to prevent UI crashes
    return [];
  }
};

export const deleteSubmission = async (id: string) => {
  try {
    console.log(`Deleting submission ${id} from Neon database via backend...`);
    
    const response = await axios.delete(`${API_BASE_URL}/submissions/${id}`, {
      timeout: 30000, // 30 second timeout
    });
    
    if (response.data.success) {
      console.log('✅ Submission deleted successfully from Neon database');
      return { success: true, message: response.data.message };
    } else {
      throw new Error(response.data.error || 'Failed to delete submission');
    }
  } catch (error: any) {
    console.error('❌ Error deleting submission from database:', error);
    
    const errorMessage = error.response?.data?.error || 
                        error.message || 
                        'Failed to delete submission from database';
    
    return { 
      success: false, 
      error: errorMessage 
    };
  }
};

// Test backend connectivity
export const testBackendConnection = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL.replace('/api', '')}/health`, {
      timeout: 10000, // 10 second timeout
    });
    
    if (response.status === 200) {
      console.log('✅ Backend connection successful');
      return { success: true, data: response.data };
    } else {
      throw new Error('Backend health check failed');
    }
  } catch (error: any) {
    console.error('❌ Backend connection failed:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to connect to backend' 
    };
  }
};

// SQL Schema for Neon PostgreSQL (for reference - implemented in backend)
export const SQL_SCHEMA = `
-- Testers table
CREATE TABLE IF NOT EXISTS testers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  tester_id INTEGER REFERENCES testers(id),
  submission_date DATE NOT NULL,
  overall_rating INTEGER CHECK (overall_rating >= 0 AND overall_rating <= 100),
  final_suggestions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test sections table
CREATE TABLE IF NOT EXISTS test_sections (
  id SERIAL PRIMARY KEY,
  submission_id INTEGER REFERENCES submissions(id),
  section_name VARCHAR(50) NOT NULL, -- 'passenger_app', 'driver_app', 'cross_app'
  uiux_rating INTEGER CHECK (uiux_rating >= 0 AND uiux_rating <= 100),
  comments TEXT
);

-- Feature tests table
CREATE TABLE IF NOT EXISTS feature_tests (
  id SERIAL PRIMARY KEY,
  section_id INTEGER REFERENCES test_sections(id),
  feature_name VARCHAR(255) NOT NULL,
  test_status VARCHAR(20) NOT NULL CHECK (test_status IN ('Pass', 'Fail', 'Not Tested'))
);

-- Bug reports table
CREATE TABLE IF NOT EXISTS bug_reports (
  id SERIAL PRIMARY KEY,
  submission_id INTEGER REFERENCES submissions(id),
  priority VARCHAR(20) NOT NULL CHECK (priority IN ('Critical', 'High', 'Medium', 'Low')),
  description TEXT NOT NULL,
  screenshot_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Screenshots table
CREATE TABLE IF NOT EXISTS screenshots (
  id SERIAL PRIMARY KEY,
  section_id INTEGER REFERENCES test_sections(id),
  file_name VARCHAR(255) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_size INTEGER,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_submissions_tester_id ON submissions(tester_id);
CREATE INDEX IF NOT EXISTS idx_test_sections_submission_id ON test_sections(submission_id);
CREATE INDEX IF NOT EXISTS idx_feature_tests_section_id ON feature_tests(section_id);
CREATE INDEX IF NOT EXISTS idx_bug_reports_submission_id ON bug_reports(submission_id);
CREATE INDEX IF NOT EXISTS idx_bug_reports_priority ON bug_reports(priority);
CREATE INDEX IF NOT EXISTS idx_screenshots_section_id ON screenshots(section_id);
`;

// Environment variables for Neon connection (handled by backend)
export const NEON_CONFIG = {
  // Backend handles the database connection
  backendUrl: API_BASE_URL,
  frontendUrl: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000'
};