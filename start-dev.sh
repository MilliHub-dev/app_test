#!/bin/bash

echo "🚀 Starting QA Testing Application with Neon Database"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

echo "🔧 Building backend..."
cd backend && npm run build && cd ..

# Start backend server in background
echo "🚀 Starting backend server on port 5000..."
cd backend && npm start &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Test backend connection
echo "🔍 Testing backend connection..."
if curl -f http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ Backend server is running and healthy"
else
    echo "⚠️  Backend server may still be starting..."
fi

# Start frontend server
echo "🚀 Starting frontend server on port 3000..."
npm start &
FRONTEND_PID=$!

echo ""
echo "🎉 Application started successfully!"
echo "=================================================="
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo "📊 Backend Health: http://localhost:5000/health"
echo "🗄️  Database: Neon PostgreSQL (Production)"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait