
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Rocket, Mic } from 'lucide-react';

import HeroIllustration from '../assets/expenseimg1.jpeg'; 

const HeroSection = () => {
 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  // The distinctive background effect
  const MovingMeshGradient = () => (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute -inset-[100%] opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.4),transparent_50%)] animate-mesh-shift-1"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.4),transparent_50%)] animate-mesh-shift-2"></div>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen bg-[#050505] text-white flex items-center pt-24 overflow-hidden">
      <MovingMeshGradient />
      
      {/* Visual background element: A faint large 'S' or abstract curve for depth */}
      <div className="absolute -bottom-10 -left-10 text-[600px] font-black text-white/5 select-none z-0 rotate-12">S</div>

      <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Content and Input */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/20 w-fit">
            <BrainCircuit className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-medium tracking-wide text-gray-300 uppercase">
                Now Integrated with Gemini 1.5 Pro
              </span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </motion.div>

          {/* Massive Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1]"
          >
            Master Your Money <br/>with the Power of <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Gemini AI
            </span>
          </motion.h1>

          {/* Descriptive Content */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
            Stop manually logging expenses. Just type or speak a simple sentence like, 
            <span className="text-white font-medium"> "Spent 1500 on dinner at O Pedro,"</span> and let SpendSense AI categorize and analyze it instantly.
          </motion.p>

          {/* Futuristic Mock-Input Field */}
          <motion.div variants={itemVariants} className="relative group max-w-xl">
            {/* The outer glowing 'border' */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            
            {/* The primary input interface */}
            <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex items-center gap-4">
              <div className="bg-gradient-to-br from-purple-600/30 to-pink-500/30 p-3 rounded-xl border border-purple-500/30">
                <BrainCircuit className="text-purple-400 w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Process Transaction</p>
                <div className="text-gray-300 text-lg flex items-center gap-2">
                  <span>Eg: spent</span>
                  <span className="inline-block w-[3px] h-6 bg-purple-500 animate-cursor-blink"></span>
                  <span className="text-white/40">₹2000 on groceries today...</span>
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/5 border border-white/10 p-3 rounded-full text-gray-500 hover:text-white"
              >
                <Mic className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Shimmer Primary CTA Button */}
          <motion.div variants={itemVariants} className="pt-4">
            <button className="relative group inline-flex items-center gap-2.5 px-10 py-4 overflow-hidden font-bold text-white bg-black rounded-full shadow-2xl border-2 border-purple-500 transition-all duration-300 hover:scale-105 active:scale-95">
              {/* The "Shimmer" overlay layer */}
              <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-purple-300/40 to-transparent -translate-x-full animate-shimmer"></span>
              
              Launch Your AI Dashboard 
              <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side: Gemini Core Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="relative flex justify-center items-center h-full"
        >
          {/* Glow effects behind the main graphic */}
          <div className="absolute w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] opacity-60"></div>
          
          {/* The main high-end illustration */}
          <img 
            src={HeroIllustration} 
            alt="Gemini AI Financial Brain Visualization" 
            className="w-full max-w-xl z-10 select-none pointer-events-none drop-shadow-[0_20px_50px_rgba(168,85,247,0.3)]"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;