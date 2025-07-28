# QA Testing Application - Production Setup

## Overview
This QA Testing Application has been upgraded to use a production Neon PostgreSQL database instead of localStorage. The application now consists of:

- **Frontend**: React TypeScript application (port 3000)
- **Backend**: Node.js Express API server (port 5000)
- **Database**: Neon PostgreSQL (production cloud database)

## Database Configuration
The application is configured to use your Neon database:
```
Database URL: postgresql://neondb_owner:npg_3fJrnNHYQph7@ep-royal-unit-aezr96es-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Internet connection (for Neon database access)

### 1. Start the Backend Server
```bash
cd backend
npm start
```
The backend server will:
- Connect to your Neon PostgreSQL database
- Initialize all required tables automatically
- Start the API server on port 5000

### 2. Start the Frontend Application
In a new terminal:
```bash
npm start
```
The React application will start on port 3000.

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## Current Status
✅ **Backend Server**: Running on port 5000
✅ **Frontend Server**: Running on port 3000
✅ **Database Connection**: Connected to Neon PostgreSQL
✅ **API Endpoints**: Working and accessible
✅ **Database Tables**: Automatically created and initialized

## Application Features
1. **Test Form Submission**: Data is now saved to the Neon database
2. **Dashboard**: Fetches real data from the database
3. **Data Persistence**: All submissions are permanently stored
4. **Production Ready**: Uses proper database transactions and error handling

## Database Schema
The application automatically creates these tables:
- `testers` - Tester information
- `submissions` - Test submissions
- `test_sections` - UI/UX ratings and comments for different app sections
- `feature_tests` - Individual feature test results
- `bug_reports` - Bug reports with priority levels
- `screenshots` - File upload metadata

## API Endpoints
- `GET /health` - Health check
- `GET /api/submissions` - Get all submissions
- `POST /api/submissions` - Create new submission
- `DELETE /api/submissions/:id` - Delete submission

## Environment Variables
The application uses these environment variables:
- `DATABASE_URL` - Neon PostgreSQL connection string
- `PORT` - Backend server port (default: 5000)
- `NODE_ENV` - Environment (production)

## Testing the Setup
1. Open http://localhost:3000
2. Fill out and submit a test form
3. Check the Dashboard to see the data
4. Verify the data persists after page refresh

## Troubleshooting
If you encounter issues:
1. Check that both servers are running
2. Verify the database connection at http://localhost:5000/health
3. Check browser console for any frontend errors
4. Check backend logs in `backend/server.log`

## Data Migration
Any existing localStorage data can be manually migrated through the application interface by resubmitting forms.

## Production Deployment
For production deployment:
1. Update CORS settings in `backend/src/server.ts`
2. Set proper environment variables
3. Use a process manager like PM2 for the backend
4. Build and serve the React app statically

## Success! 🎉
Your QA Testing Application is now running with a production Neon PostgreSQL database. All form submissions will be permanently stored and can be accessed through the dashboard.