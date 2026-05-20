import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'How it Works', href: '#how-it-works' },
      { name: 'AI Core', href: '#analytics' },
    ],
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
    Developers: [
      { name: 'Documentation', href: '#' },
      { name: 'Open Source', href: '#' },
      { name: 'Gemini API', href: '#' },
    ],
  };

  return (
    <footer className="w-full bg-[#050505] text-white border-t border-white/5 pt-16 pb-8 px-4 sm:px-6 relative overflow-hidden mt-auto">
      {/* Subtle background ambient gradients */}
      <div className="absolute bottom-0 right-0 w-[250px] md:w-[300px] h-[150px] bg-pink-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[300px] h-[150px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Link Grid Area */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/5">
          
          {/* Brand/Identity Column */}
          <div className="col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2 group cursor-pointer w-fit">
              <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-1.5 rounded-lg border border-purple-400/20">
                {/* SVG Wallet Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 1-1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h15b"/><circle cx="16" cy="14" r="1"/></svg>
              </div>
              <span className="text-lg font-bold tracking-tighter text-white">
                SpendSense<span className="text-purple-500 italic">.AI</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xs leading-relaxed">
              Next-generation personal finance tracking powered by conversational artificial intelligence. Simplify your data horizon.
            </p>
            
            {/* Social Links Layout using raw SVGs */}
            <div className="flex items-center gap-3 mt-2">
              {/* Twitter/X */}
              <a href="#" className="p-2 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              {/* GitHub */}
              <a href="#" className="p-2 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="p-2 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Categorized Link Blocks */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-4 col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      {/* SVG Arrow Up Right */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all duration-200 text-purple-400"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Legal Credits Bottom Area */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-gray-500 font-mono text-center sm:text-left">
          <div>
            &copy; {currentYear} SpendSense.AI. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Built with 
            {/* SVG Pulsing Heart */}
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="red" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse mx-0.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            using the MERN Stack.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;