import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart3, 
  TrendingUp, 
  WalletCards, 
  BrainCircuit, 
  UserCircle, 
  LogOut, 
  Wallet,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

const SidebarNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
 
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Controls dialog overlay

  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User', email: 'user@domain.com' };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Charts', icon: <BarChart3 size={20} />, path: '/charts' },
    { name: 'Analytics', icon: <TrendingUp size={20} />, path: '/analytics' },
    { name: 'Budget System', icon: <WalletCards size={20} />, path: '/budget' },
    { name: 'AI Insights', icon: <BrainCircuit size={20} />, path: '/ai-insights' },
    { name: 'Profile', icon: <UserCircle size={20} />, path: '/profile' },
  ];

  const executeLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLogoutModalOpen(false); // Close the dialog box container
    navigate('/'); // Instantly redirect back to the public landing page route
  };

  return (
    <>
     
      <motion.div 
        animate={{ width: isCollapsed ? '80px' : '260px' }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200, damping: 25 }}
        className="h-screen bg-[#09090b]/60 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between p-4 fixed left-0 top-0 z-50 group shadow-[5px_0_30px_rgba(0,0,0,0.8)] select-none"
      >
        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-purple-500/10 via-pink-500/10 to-transparent" />

        {/* Brand Header */}
        <div>
          <div className={`flex items-center justify-between mb-8 px-2 ${isCollapsed ? 'justify-center' : ''}`}>
            {!isCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2.5">
                <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-1.5 rounded-lg shadow-md border border-purple-400/20">
                  <Wallet className="text-white w-4 h-4" />
                </div>
                <span className="text-base font-bold tracking-tighter text-white">
                  SpendSense<span className="text-purple-500 italic">.AI</span>
                </span>
              </motion.div>
            )}

            {isCollapsed && (
              <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-2 rounded-xl shadow-md border border-purple-400/20">
                <Wallet className="text-white w-4 h-4" />
              </div>
            )}

            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-3 top-7 p-1 rounded-full bg-[#121214] border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/50 transition-colors shadow-xl"
            >
              {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          </div>

          {/* Navigation Links Mapping */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path} className="block relative">
                  <motion.div
                    whileHover={{ x: isCollapsed ? 0 : 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium transition-colors relative z-10 ${
                      isActive ? 'text-white font-bold' : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active-pill"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 rounded-xl -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`${isActive ? 'text-purple-400' : 'text-gray-400'}`}>
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tracking-tight">
                        {item.name}
                      </motion.span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>

     
        <div className="space-y-4 border-t border-white/5 pt-4">
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 px-2 bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center font-bold text-xs text-purple-400 uppercase font-mono">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-white tracking-tight truncate">{user.name}</h4>
                <p className="text-[10px] text-gray-500 font-mono truncate">{user.email}</p>
              </div>
            </motion.div>
          )}

          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-medium text-rose-400/80 hover:text-rose-400 hover:bg-rose-500/5 border border-transparent hover:border-rose-500/10 transition-all duration-200"
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLogoutModalOpen(false)} // Closes dialog safely if clicking outside
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-sm bg-[#0a0a0c] border border-white/10 rounded-2xl p-6 shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
              
              <div className="mx-auto bg-rose-500/10 border border-rose-500/20 w-12 h-12 rounded-xl flex items-center justify-center text-rose-400 mb-4">
                <AlertTriangle size={22} />
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight mb-1">Terminate Secure Session?</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Are you sure you want to log out? You will need to sign back in to access your AI tracking models.
              </p>

              <div className="grid grid-cols-2 gap-3">
              
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="w-full bg-white/5 border border-white/5 hover:border-white/10 text-gray-300 font-semibold py-3 rounded-xl text-xs tracking-wider uppercase transition-all active:scale-[0.98]"
                >
                  Cancel
                </button>

                <button
                  onClick={executeLogout}
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded-xl text-xs tracking-wider uppercase shadow-lg shadow-rose-600/10 transition-all active:scale-[0.98]"
                >
                  Logout
                </button>
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarNavbar;