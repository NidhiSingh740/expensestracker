import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareCode, Cpu, LayoutDashboard, Sparkles, CheckCircle2 } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: <MessageSquareCode className="w-6 h-6 text-purple-400" />,
      title: 'Type or Speak Naturally',
      description: 'Simply tell SpendSense what you did. Use plain conversational English or Hindi sentences like "Paid 2500 for electricity bill today" or "Spent 300 on movie tickets yesterday".',
      glowColor: 'from-purple-600/20',
      badge: 'INPUT STAGE'
    },
    {
      number: '02',
      icon: <Cpu className="w-6 h-6 text-pink-400" />,
      title: 'Gemini AI Parsing Core',
      description: 'Our system instantly routes your text through the Google Gemini API. Within milliseconds, the AI contextually extracts the precise amount, identifies the merchant, converts the currency, and isolates the metric.',
      glowColor: 'from-pink-600/20',
      badge: 'INTELLIGENCE CORE'
    },
    {
      number: '03',
      icon: <LayoutDashboard className="w-6 h-6 text-indigo-400" />,
      title: 'Automated Dashboard Update',
      description: 'The database is automatically modified, adjusting your real-time total bank balance, allocating the spend to standard bento categories, and refreshing your dynamic analytics curves instantly.',
      glowColor: 'from-indigo-600/20',
      badge: 'LIVE SYNCHRONIZATION'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.3 }
    }
  };

  const textVariants = (direction) => ({
    hidden: { opacity: 0, x: direction === 'left' ? -50 : 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', stiffness: 50, damping: 15 } 
    }
  });

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.2 } 
    }
  };

  return (
    <section id="how-it-works" className="relative min-h-screen bg-[#050505] text-white py-32 px-6 overflow-hidden">
      
     
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-purple-900/10 via-transparent to-pink-900/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        
       
        <div className="text-center mb-28">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-purple-400 text-xs font-semibold mb-4 tracking-widest uppercase"
          >
            <Sparkles className="w-3 h-3" /> The Workflow
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
            How It <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500">Works</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base md:text-lg max-w-xl mx-auto">
            Three simple, automated phases turning loose statements into deep mathematical structures.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          className="relative"
        >
          
          <div className="absolute left-4 md:left-1/2 top-12 bottom-12 w-[2px] bg-gradient-to-b from-purple-500 via-pink-500 to-indigo-500 opacity-20 hidden sm:block -translate-x-1/2" />

         
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={step.number} className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-24 md:mb-32 group">
                
               
                <motion.div 
                  variants={textVariants(isEven ? 'left' : 'right')}
                  className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:text-right md:order-1' : 'md:order-3'}`}
                >
                  <div className="relative rounded-3xl bg-[#09090b] border border-white/10 p-8 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-purple-500/30 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                    
                    
                    <div className={`absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${step.glowColor} to-transparent rounded-full blur-2xl transition-opacity opacity-40 group-hover:opacity-100`} />
                    
                    <span className="text-[10px] tracking-widest font-mono text-gray-500 font-bold uppercase mb-2 block">{step.badge}</span>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3 flex items-center gap-3 md:justify-start justify-start group-hover:text-purple-300 transition-colors">
                      <span className="text-sm font-mono text-purple-500/60 bg-purple-500/5 px-2 py-0.5 rounded-md border border-purple-500/10">{step.number}</span>
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>

                
                <motion.div 
                  variants={nodeVariants}
                  className="absolute left-4 md:left-1/2 top-8 md:top-auto md:order-2 -translate-x-1/2 z-10 hidden sm:block"
                >
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-12 h-12 bg-white/5 border border-white/10 rounded-full animate-ping opacity-20 pointer-events-none" style={{ animationDuration: '3s' }} />
                    <div className="relative bg-[#050505] border-2 border-white/20 group-hover:border-purple-500 p-4 rounded-2xl shadow-xl transition-all duration-300 transform group-hover:rotate-12">
                      {step.icon}
                    </div>
                  </div>
                </motion.div>

                
                <div className={`w-full md:w-[45%] hidden md:block ${isEven ? 'md:order-3' : 'md:order-1'}`} />

              </div>
            );
          })}
        </motion.div>

        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center justify-center text-center relative z-10"
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-6 py-3 flex items-center gap-3 backdrop-blur-xl shadow-2xl">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-gray-200">Ready to track assets automatically.</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;