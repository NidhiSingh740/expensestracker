import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import Navbar from "./pages/Navbar";
import HeroSection from "./pages/HeroSection";
import FeaturesSection from "./pages/FeaturesSection";
import HowItWorks from "./pages/HowItWorks";
import Testimonials from "./pages/Testimonials";
import CTA from "./pages/CTA";
import Footer from "./pages/Footer";

import Signup from "./pages/Signup";
import Login from "./pages/Login";


import SidebarNavbar from './components/SidebarNavbar';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts';
import Analytics from './components/Analytics';
import Budget from './components/Budget';
import Expenses from './components/Expenses';
import SavingGoals from './components/SavingGoals';
import Profile from './components/Profile';



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

const ProtectedLayout = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="flex bg-[#050505] min-h-screen relative w-full overflow-x-hidden">
      {/* Permanent Fixed Sidebar Navigation Menu */}
      <div className="fixed top-0 left-0 h-full z-50">
        <SidebarNavbar />
      </div>
      
      {/* Structural Column Layout - Uses explicit margins to leave exact space for the sidebar */}
      <div className="flex flex-col min-h-screen w-full pl-[90px] md:pl-[260px] transition-all duration-300">
        {/* Main Workspace expands beautifully to absorb remaining empty spatial gaps */}
        <main className="flex-grow p-4 md:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
        
        {/* Protected view footer locked flat against the bottom grid */}
        <div className="border-t border-white/5 w-full bg-transparent">
          <Footer />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
     
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
      <Route path="/charts" element={<ProtectedLayout><Charts /></ProtectedLayout>} />
      <Route path="/analytics" element={<ProtectedLayout><Analytics /></ProtectedLayout>} />
      <Route path="/budget" element={<ProtectedLayout><Budget/></ProtectedLayout>} />
      <Route path="/expenses" element={<ProtectedLayout><Expenses /></ProtectedLayout>} />
      <Route path="/saving-goals" element={<ProtectedLayout><SavingGoals /></ProtectedLayout>} />

      <Route path="/profile" element={<ProtectedLayout><Profile /></ProtectedLayout>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;