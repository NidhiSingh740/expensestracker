
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
 
  const [activeCard, setActiveCard] = useState(null);

  const reviews = [
    {
      id: 1,
      name: "Ananya Sharma",
      handle: "@ananya_codes",
      text: "Literally just text 'Spent 400 on blue bottle coffee' and it's filed. The Gemini parsing logic is insanely fast. Best financial interface period.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 2,
      name: "Rohan Das",
      handle: "@rohan_builds",
      text: "The MERN dashboard charts look gorgeous, but typing conversational updates without rigid forms completely changed how I manage freelance cashflows.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 3,
      name: "Nisha Patel",
      handle: "@nishadesigns",
      text: "Bento grid features, smooth active-pill navigation, and dark glassmorphic layers make this look like an Apple product. Visual execution is beautiful.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
    },
    {
      id: 4,
      name: "Kabir Singh",
      handle: "@kabir_fintech",
      text: "No complex bank scraping sync breaks, no spreadsheets. Just simple textual balance modifiers. Exactly what the personal asset space needed.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#050505] text-white px-4 sm:px-6 relative overflow-hidden border-b border-white/5">
      {/* Background glow mesh layer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Text */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter"
          >
            Endorsed by <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Modern Builders</span>
          </motion.h2>
          <p className="text-gray-400 mt-3 text-xs sm:text-sm md:text-base max-w-md mx-auto">
            What early users are saying about conversational budget tracking.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {reviews.map((user) => (
            <motion.div 
              key={user.id}
              onClick={() => setActiveCard(user.id === activeCard ? null : user.id)}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full rounded-2xl bg-[#09090b] border p-6 shadow-xl cursor-pointer select-none transition-all duration-300 relative ${
                activeCard === user.id 
                  ? 'border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.25)] bg-[#0c0c12]' 
                  : 'border-white/10 hover:border-purple-500/40'
              }`}
            >
              
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
              
              <div className="flex items-center gap-3 mb-4">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0" />
                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-white tracking-tight truncate">{user.name}</h4>
                  <p className="text-[11px] text-gray-500 font-mono truncate">{user.handle}</p>
                </div>
              </div>

             
              <div className="flex items-center gap-0.5 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>

              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                "{user.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;