import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Menu, X, Sparkles } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Features');


 const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Analytics', href: '#analytics' },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center justify-between w-full max-w-6xl px-6 py-3 rounded-full border transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]' 
            : 'bg-white/5 backdrop-blur-md border-white/5'
        }`}
      >
        {/* LEFT: LOGO */}
        <div className="flex items-center gap-3 group cursor-pointer min-w-[150px]">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-black p-1.5 rounded-lg border border-white/10">
              <Wallet className="text-purple-500 w-5 h-5" />
            </div>
          </div>
          <span className="text-lg font-bold tracking-tighter text-white">
            SpendSense<span className="text-purple-500 italic">.AI</span>
          </span>
        </div>

        {/* CENTER: NAV LINKS */}
        <div className="hidden md:flex items-center gap-1 bg-black/20 p-1 rounded-full border border-white/5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setActiveTab(link.name)}
              className={`relative px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
                activeTab === link.name ? 'text-white' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {activeTab === link.name && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/40 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </a>
          ))}
        </div>

        {/* RIGHT: CTA BUTTON */}
       <div className="hidden md:flex justify-end min-w-[150px]">
  <motion.button 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => navigate("/login")}
    className="group relative px-5 py-2 rounded-full bg-white text-black font-bold text-xs overflow-hidden"
  >
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

    <span className="relative group-hover:text-white flex items-center gap-2">
      GET STARTED
      <Sparkles className="w-3.5 h-3.5" />
    </span>
  </motion.button>
</div>
        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* MOBILE DROPDOWN (Simplified) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-4 right-4 p-6 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-xl text-gray-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;