
import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, BarChart3, Tag, Sparkles, MessageSquare, LineChart, ShieldCheck } from 'lucide-react';

const FeaturesSection = () => {
  // Animation configuration for scroll reveal
  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 60, damping: 20 } 
    }
  };

  return (
    <section id="features" className="relative min-h-screen bg-[#050505] text-white py-24 px-6 overflow-hidden">
      
      {/* Background glow ambient layers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Text */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tighter"
          >
            Revolutionary <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">AI Capabilities</span>
          </motion.h2>
          <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
            Experience financial management re-engineered from scratch using intelligence.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          
          {/* CARD 1: Natural Language Processing (Takes up 2 columns on medium screens up, height adjusted) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-2 group relative rounded-3xl bg-[#09090b] border border-white/10 p-8 flex flex-col justify-between overflow-hidden min-h-[480px]"
          >
            {/* Hover Gradient Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full text-purple-400 text-xs font-semibold mb-6">
                <BrainCircuit className="w-3.5 h-3.5" /> NLP ENGINE
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3">Natural Language Processing</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Forget rigid forms. Speak or type your expenses in pure conversational plain English.
              </p>
            </div>

            {/* Mock Visual Element Container */}
            <div className="relative mt-8 flex flex-col items-center justify-center bg-black/40 border border-white/5 rounded-2xl p-6 h-56 overflow-hidden">
              {/* Abstract Glassmorphism UI components */}
              <div className="absolute top-4 left-4 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-400 flex items-center gap-2 shadow-2xl">
                <MessageSquare className="w-3.5 h-3.5 text-purple-400" /> "Spent ₹1500 on dining..."
              </div>

              {/* Crystal / Geometrical wireframe simulation block via CSS gradients */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-purple-500/30 to-pink-500/30 blur-md animate-pulse absolute" />
              <div className="relative w-24 h-24 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm bg-white/5">
                <BrainCircuit className="w-10 h-10 text-white/80" />
              </div>

              <div className="absolute bottom-4 right-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-1.5 text-xs text-emerald-400 font-mono shadow-2xl">
                [Processed Successfully]
              </div>
            </div>
          </motion.div>

          {/* CARD 2: Real-time Analytics (Takes up 3 columns) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-3 group relative rounded-3xl bg-[#09090b] border border-white/10 p-8 flex flex-col justify-between overflow-hidden min-h-[480px]"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-pink-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full text-pink-400 text-xs font-semibold mb-6">
                <BarChart3 className="w-3.5 h-3.5" /> METRICS
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3">Real-time Analytics</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Monitor volatile spending dynamics immediately. Beautiful curves translate mathematical changes into dynamic insights.
              </p>
            </div>

            {/* Mock Dashboard Area Visual */}
            <div className="mt-8 relative bg-black/40 border border-white/5 rounded-2xl p-6 h-56 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs text-gray-500 font-mono">WEEKLY SPENDING TREND</span>
                <LineChart className="w-4 h-4 text-pink-400" />
              </div>
              
              {/* Simulated Wave Vector Using Clean CSS Layout Masks */}
              <div className="w-full h-24 flex items-end gap-2 px-2 relative">
                <div className="absolute inset-x-0 bottom-4 h-[1px] bg-white/10" />
                <div className="w-full h-12 bg-gradient-to-t from-purple-500/20 to-transparent rounded-t-md border-t-2 border-purple-500/60" />
                <div className="w-full h-20 bg-gradient-to-t from-pink-500/20 to-transparent rounded-t-md border-t-2 border-pink-500/60" />
                <div className="w-full h-10 bg-gradient-to-t from-purple-500/20 to-transparent rounded-t-md border-t-2 border-purple-500/60" />
                <div className="w-full h-16 bg-gradient-to-t from-pink-500/20 to-transparent rounded-t-md border-t-2 border-pink-500/60" />
              </div>

              <div className="flex justify-between text-[10px] text-gray-500 font-mono pt-2">
                <span>MON</span><span>WED</span><span>FRI</span><span>SUN</span>
              </div>
            </div>
          </motion.div>

          {/* CARD 3: Auto-Categorization (Spans all 5 columns horizontally for full layout variation) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-5 group relative rounded-3xl bg-[#09090b] border border-white/10 p-8 grid md:grid-cols-2 gap-8 items-center overflow-hidden min-h-[320px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-indigo-400 text-xs font-semibold mb-6">
                <Tag className="w-3.5 h-3.5" /> TAXONOMY SYSTEM
              </div>
              <h3 className="text-3xl font-bold tracking-tight mb-4">Auto-Categorization</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Every prompt splits down into designated records perfectly. Transactions automatically segment under Food, Bills, Rent or Travel based on context matching algorithms.
              </p>
            </div>

            {/* Micro Interactivity Sorting Node Display */}
            <div className="relative bg-black/40 border border-white/5 rounded-2xl p-6 h-48 flex items-center justify-around overflow-hidden">
              
              {/* Unstructured Incoming node */}
              <div className="flex flex-col items-center gap-2 z-10">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-purple-400 group-hover:border-purple-500/40 transition-colors duration-500">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-gray-500">Raw Data</span>
              </div>

              {/* Connecting animated vector simulations using flex bars */}
              <div className="flex-1 max-w-[80px] h-[2px] bg-gradient-to-r from-purple-500 to-transparent relative overflow-hidden hidden sm:block">
                <div className="absolute inset-0 w-1/2 bg-white/40 animate-shimmer" style={{animationDuration: '2s'}} />
              </div>

              {/* Mapped Categories Grid Block */}
              <div className="grid grid-cols-3 gap-3 z-10">
                <div className="flex flex-col items-center p-2 rounded-lg bg-white/5 border border-white/10 text-center min-w-[70px]">
                  <span className="text-xs font-semibold text-purple-400">🍔 Food</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-white/5 border border-white/10 text-center min-w-[70px]">
                  <span className="text-xs font-semibold text-pink-400">🏠 Rent</span>
                </div>
                <div className="flex flex-col items-center p-2 rounded-lg bg-white/5 border border-white/10 text-center min-w-[70px]">
                  <span className="text-xs font-semibold text-blue-400">✈️ Travel</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;