import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Landing Page Component & Layout Sections
import Navbar from "./pages/Navbar";
import HeroSection from "./pages/HeroSection";
import FeaturesSection from "./pages/FeaturesSection";
import HowItWorks from "./pages/HowItWorks";
import Testimonials from "./pages/Testimonials";
import CTA from "./pages/CTA";
import Footer from "./pages/Footer";

// Authentication Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Logged-in Core Structural Components
import SidebarNavbar from './components/SidebarNavbar';

// Private Workspace Component Placeholders
const DashboardPage = () => <div className="text-2xl font-bold text-white font-sans">Dashboard Workspace View</div>;
const ChartsPage = () => <div className="text-2xl font-bold text-white font-sans">Interactive Chart Coordinates</div>;
const AnalyticsPage = () => <div className="text-2xl font-bold text-white font-sans">Deep Financial Analytics Engine</div>;
const BudgetPage = () => <div className="text-2xl font-bold text-white font-sans">Bento Budget Allocation System</div>;
const AIInsightsPage = () => <div className="text-2xl font-bold text-white font-sans">Gemini AI Cognitive Insights</div>;
const ProfilePage = () => <div className="text-2xl font-bold text-white font-sans">User Account Settings & Configuration</div>;

// Public Landing Page Layout Shell
function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505]">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

// Authentication Guard Rule Frame Layer
const ProtectedLayout = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // If session authorization token is missing, redirect unauthenticated guests out to login
  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="flex bg-[#050505] min-h-screen">
      {/* Side left static workspace panel navigation */}
      <SidebarNavbar />
      
      {/* Dynamic content canvas panel handles shifting offset padding adjustments */}
      <main className="flex-grow p-8 pl-[100px] md:pl-[280px] transition-all duration-300 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Secure Dashboard Paths Guarded via Authentication Token Rules */}
      <Route path="/dashboard" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
      <Route path="/charts" element={<ProtectedLayout><ChartsPage /></ProtectedLayout>} />
      <Route path="/analytics" element={<ProtectedLayout><AnalyticsPage /></ProtectedLayout>} />
      <Route path="/budget" element={<ProtectedLayout><BudgetPage /></ProtectedLayout>} />
      <Route path="/ai-insights" element={<ProtectedLayout><AIInsightsPage /></ProtectedLayout>} />
      <Route path="/profile" element={<ProtectedLayout><ProfilePage /></ProtectedLayout>} />
      
      {/* Fallback Catch-All Strategy */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;