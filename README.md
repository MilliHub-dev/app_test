# Sabi-Ride QA Testing Platform

A modern, responsive React application for QA testing workflows built with TypeScript, Tailwind CSS, and Framer Motion. This platform provides a comprehensive solution for testing mobile ride-sharing applications with features for test management, bug reporting, and analytics dashboard.

## 🚀 Features

### 📋 Test Guide
- **Interactive Quick Guide**: Step-by-step instructions for testers
- **Bug Priority Classification**: Color-coded priority levels (Critical, High, Medium, Low)
- **Testing Sections Overview**: Passenger App, Driver App, Cross-App/Backend features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 📝 QA Testing Form
- **Multi-Step Form**: Progressive stepper interface with 6 sections
- **Tester Information**: Name, role, and date capture
- **Feature Testing Grid**: Pass/Fail/Not Tested options for each feature
- **UI/UX Rating**: 0-100 scale with visual feedback
- **Screenshot Upload**: Drag & drop file upload with preview
- **Bug Reporting**: Priority-based bug tracking with descriptions
- **Final Feedback**: Overall rating and suggestions
- **Progress Saving**: Save and resume functionality
- **Form Validation**: Client-side validation and error handling

### 📊 Analytics Dashboard
- **Overview Metrics**: Total submissions, pass rates, UI/UX scores, bug counts
- **Interactive Charts**: Bar charts, pie charts, and line graphs using Recharts
- **Pass Rate Analysis**: Section-wise performance breakdown
- **Bug Priority Distribution**: Visual representation of bug severity
- **UI/UX Trends**: Track improvements over time
- **Tabbed Interface**: Separate views for different aspects of testing

### 🎨 Modern UI/UX
- **Glass Morphism Design**: Translucent cards with backdrop blur effects
- **Gradient Backgrounds**: Beautiful purple-to-teal gradient themes
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Custom Components**: Reusable UI components with consistent styling
- **Responsive Layout**: Mobile-first design approach
- **Loading States**: Elegant loading spinners and skeleton screens

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom utility classes
- **Animations**: Framer Motion for smooth transitions
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for modern iconography
- **File Upload**: React Dropzone for drag & drop functionality
- **Form Handling**: React Hook Form with Yup validation
- **Routing**: React Router DOM for navigation
- **Database**: Neon PostgreSQL (schema provided)
- **Deployment**: Ready for Vercel, Netlify, or AWS deployment

## 🏗️ Project Structure

```
sabi-ride-qa/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx      # Navigation bar
│   │   └── FormSection.tsx # Form section component
│   ├── pages/              # Main page components
│   │   ├── TestGuide.tsx   # Quick guide page
│   │   ├── TestForm.tsx    # Multi-step form page
│   │   └── Dashboard.tsx   # Analytics dashboard
│   ├── types/              # TypeScript interfaces
│   │   └── index.ts        # Type definitions
│   ├── utils/              # Utility functions
│   │   └── database.ts     # Database utilities
│   ├── App.tsx             # Main app component
│   ├── index.tsx           # App entry point
│   └── index.css           # Global styles
├── tailwind.config.js      # Tailwind configuration
├── package.json            # Dependencies
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sabi-ride-qa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Environment Variables

Create a `.env` file in the root directory for production database connection:

```env
REACT_APP_NEON_DATABASE_URL=postgresql://username:password@ep-example.us-east-1.aws.neon.tech/dbname?sslmode=require
```

## 📦 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

## 🗄️ Database Setup (Neon PostgreSQL)

The application includes a complete SQL schema for Neon PostgreSQL. Check `src/utils/database.ts` for the full schema including:

- **testers**: Store tester information
- **submissions**: Main submission records
- **test_sections**: Passenger/Driver/Cross-app test results
- **feature_tests**: Individual feature test results
- **bug_reports**: Bug tracking with priority levels
- **screenshots**: File upload metadata

### Setting up Neon Database

1. Create a Neon account at [neon.tech](https://neon.tech)
2. Create a new project and database
3. Copy the connection string to your `.env` file
4. Run the SQL schema from `database.ts` in your Neon console

## 🔧 Customization

### Theming
Modify `tailwind.config.js` to customize colors, animations, and design tokens:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Custom color palette
      }
    }
  }
}
```

### Features
Add new testing features by:
1. Updating the feature arrays in `src/types/index.ts`
2. The form will automatically include new features in the testing grid

### Branding
- Update the logo and company name in `Navbar.tsx`
- Modify the footer branding in `App.tsx`
- Customize colors and gradients in `index.css`

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px (sm)
- **Tablet**: 768px - 1024px (md)
- **Desktop**: > 1024px (lg, xl)

## 🧪 Testing Features

### Passenger App Features (13 features)
- Registration/Login
- Ride Booking (Normal, Group, Shared)
- Dispatch Delivery
- Fare Estimation
- Driver Tracking
- Payment
- Ride History
- Referral System
- Push Notifications
- Profile & Settings
- Customer Support

### Driver App Features (13 features)
- Driver Registration/Onboarding
- Ride Acceptance (Normal, Group, Shared, Dispatch)
- Navigation
- Earnings & Wallet
- Daily Fee Payment
- Rating/Feedback
- Referral Rewards
- Availability Status
- Notifications
- Support & Complaints

### Cross-App/Backend Features (9 features)
- Ride Matching (All Types)
- Fare Splitting Logic
- Wallet Integration (Flutterwave)
- Referral Points Allocation
- Sabi Cash Conversion
- Admin Dashboard Monitoring

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Configure environment variables

### Custom Server
1. Build: `npm run build`
2. Serve the `build` folder with any static file server
3. Configure your web server for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Millihub** - Platform development and design
- **Sabi-Ride** - QA testing requirements and specifications
- **React Community** - Amazing ecosystem and tools
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Beautiful animations library

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact: [your-email@example.com]
- Documentation: [your-docs-url]

---

**Powered by Millihub** 🚀
