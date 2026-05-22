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

const ProtectedLayout = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="flex bg-[#050505] min-h-screen">

      <SidebarNavbar />
      
      
      <main className="flex-grow p-8 pl-[100px] md:pl-[280px] transition-all duration-300 overflow-y-auto">
        {children}
      </main>
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

      <Route path="/profile" element={<ProtectedLayout><ProfilePage /></ProtectedLayout>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;