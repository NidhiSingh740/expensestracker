import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, DollarSign, Activity, Zap } from 'lucide-react';

const CTACloser = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="py-16 md:py-32 px-4 sm:px-6 relative flex justify-center items-center bg-[#050505] text-white overflow-hidden">
      
      {/* Background static vector grid matrix overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 pointer-events-none" />

      <div 
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-[#09090b]/40 backdrop-blur-xl p-8 sm:p-12 md:p-20 text-center overflow-hidden group shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
      >
        {/* Interactive Mouse Tracking Spotlight Beam */}
        <div 
          className="absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none hidden md:block"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168,85,247,0.15), transparent 40%)`
          }}
        />

        {/* Ambient background soft radial aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Outer decorative floating graphics */}
        <div className="absolute top-8 left-8 text-purple-500/10 animate-pulse hidden lg:block"><DollarSign size={36} /></div>
        <div className="absolute bottom-10 right-10 text-pink-500/20 animate-bounce hidden lg:block" style={{ animationDuration: '5s' }}><Activity size={28} /></div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-5 sm:gap-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-3.5 py-1.5 text-[10px] font-semibold text-purple-300 uppercase tracking-widest">
            <Zap className="w-3 h-3 text-pink-400 fill-current" /> Instant Deployment
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter leading-tight sm:leading-none">
            Take Absolute Control <br className="hidden sm:block" /> of Your <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
              Financial Horizon
            </span>
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-md leading-relaxed">
            Join the future of frictionless accounting. Completely open-source, fast, and entirely powered by Gemini AI.
          </p>

          {/* Scalable Call to Action Button */}
          <motion.div 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 relative group w-full sm:w-auto"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-300" />
            
            <button className="relative w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white text-black font-bold px-8 py-3.5 rounded-full text-sm tracking-wide overflow-hidden shadow-2xl">
              <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-purple-400/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              Start Tracking for Free 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTACloser;