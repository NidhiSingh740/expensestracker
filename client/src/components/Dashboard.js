import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Mic, ArrowRight, Utensils, ShoppingBag, 
  Plane, Film, HelpCircle, PlusCircle, Loader2, Sliders, X, HelpCircle as OthersIcon
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [greeting, setGreeting] = useState('Good Evening');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);


  const [inputBalance, setInputBalance] = useState('');
  const [inputCap, setInputCap] = useState('');

  const [balance, setBalance] = useState(0);
  const [monthlyCap, setMonthlyCap] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [activities, setActivities] = useState([]);
  

  const [categories, setCategories] = useState([
    { name: 'Food & Drinks', spent: 0, max: 0, color: '#a855f7', glow: 'rgba(168,85,247,0.03)' },
    { name: 'Entertainment', spent: 0, max: 0, color: '#ec4899', glow: 'rgba(236,72,153,0.03)' },
    { name: 'Shopping', spent: 0, max: 0, color: '#3b82f6', glow: 'rgba(59,130,246,0.03)' },
    { name: 'Travel', spent: 0, max: 0, color: '#6366f1', glow: 'rgba(99,102,241,0.03)' },
    { name: 'Others', spent: 0, max: 0, color: '#10b981', glow: 'rgba(16,185,129,0.03)' },
  ]);


  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const txDate = new Date(timestamp);
    const diffMs = now - txDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 1) return 'Just Now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    
   
    return txDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  const fetchDashboardSummary = async () => {
    try {
      const response = await fetch('https://expensestracker-qqri.onrender.com/api/dashboard/summary', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (data.success) {
        setBalance(data.balance);
        setMonthlyCap(data.monthlyCap);
        setTotalSpent(data.totalSpent);
        setGraphData(data.graphData);
        setActivities(data.recentActivities);
        
        setCategories(prev => prev.map(cat => {
          let proportion = 0.10;
          if (cat.name === 'Food & Drinks') proportion = 0.25;
          else if (cat.name === 'Shopping') proportion = 0.35;
          else if (cat.name === 'Travel') proportion = 0.20;
          else if (cat.name === 'Entertainment') proportion = 0.10;

          return {
            ...cat,
            spent: data.categoryData[cat.name] || 0,
            max: Math.round(data.monthlyCap * proportion)
          };
        }));
      }
    } catch (err) {
      console.error("Dashboard error mapping logic fields:", err);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning');
    else if (hours < 16) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    fetchDashboardSummary();
  }, []);

  const handleManualSettingsUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://expensestracker-qqri.onrender.com/api/dashboard/update-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ balance: inputBalance, monthlyCap: inputCap })
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        setIsSettingsOpen(false);
        fetchDashboardSummary();
      }
    } catch (err) {
      alert("Error setting financial balance bounds.");
    }
  };

  const handleAIFormSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setIsLoading(true);

    try {
      const response = await fetch('https://expensestracker-qqri.onrender.com/api/dashboard/process-input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ text: inputText })
      });
      const data = await response.json();

      if (data.success) {
        setInputText('');
        fetchDashboardSummary();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error reaching AI processing clusters.");
    } finally {
      setIsLoading(false);
    }
  };

  const getCleanIcon = (category) => {
    switch (category) {
      case 'Food & Drinks': return <Utensils size={14} className="text-purple-400" />;
      case 'Shopping': return <ShoppingBag size={14} className="text-blue-400" />;
      case 'Travel': return <Plane size={14} className="text-indigo-400" />;
      case 'Entertainment': return <Film size={14} className="text-pink-400" />;
      default: return <OthersIcon size={14} className="text-emerald-400" />;
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-gray-400 font-mono gap-3">
        <Loader2 className="animate-spin text-purple-500 w-8 h-8" />
        <span>Syncing Executive Control Metrics...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white p-4 lg:p-6 font-sans flex flex-col gap-6 relative select-none">
      
     
      <div className="w-full bg-[#09090b]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-500/20 p-2.5 rounded-xl border border-purple-500/30">
            <Sliders size={20} className="text-purple-400 cursor-pointer hover:rotate-45 transition-transform duration-300" onClick={() => setIsSettingsOpen(true)} />
          </div>
          <div>
            <h2 className="text-sm font-mono font-bold text-gray-500 uppercase tracking-widest">{greeting}</h2>
            <h1 className="text-xl font-black text-white tracking-tight">Executive Control Panel</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-8 bg-black/40 border border-white/5 px-6 py-2.5 rounded-xl w-full sm:w-auto justify-around">
          <div>
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase block">Liquid Balance</span>
            <span className={`text-base font-black ${balance < 0 ? 'text-rose-400' : 'text-white'}`}>₹{balance.toLocaleString('en-IN')}</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
          <div>
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase block">Monthly Burn Ratio</span>
            <span className={`text-base font-black ${totalSpent > monthlyCap ? 'text-rose-400 text-shadow-glow' : 'text-pink-400'}`}>
              ₹{totalSpent.toLocaleString('en-IN')} <span className="text-xs text-gray-600 font-normal">/ ₹{(monthlyCap/1000).toFixed(0)}k</span>
            </span>
          </div>
        </div>
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
        
        
        <div className="lg:col-span-3 bg-[#09090b]/20 border border-white/5 rounded-2xl p-5 shadow-2xl h-[584px] flex flex-col overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4 shrink-0">
            <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">Live Database Ledger</span>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          </div>

          <div className="space-y-3 overflow-y-auto flex-grow pr-1">
            {activities.length === 0 ? (
              <div className="text-center text-xs text-gray-600 mt-20 font-mono">No logged entries found in DB records.</div>
            ) : (
              activities.map((act) => (
                <div key={act._id} className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex flex-col gap-2 group hover:border-purple-500/20 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">
                        {getCleanIcon(act.category)}
                      </div>
                      <h4 className="text-xs font-bold text-gray-200 truncate max-w-[120px]">{act.merchant_name}</h4>
                    </div>
                    <span className={`text-xs font-mono font-bold ${act.transaction_type === 'expense' ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {act.transaction_type === 'expense' ? '-' : '+'}₹{act.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-gray-600">
                    <span>{act.category}</span>
                    <span>{formatRelativeTime(act.timestamp)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        
        <div className="lg:col-span-6 flex flex-col gap-6">
          <form onSubmit={handleAIFormSubmit} className="relative group w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-focus-within:opacity-100 transition duration-300" />
            <div className="relative bg-[#09090b]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <input 
                type="text"
                required
                disabled={isLoading}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Gemini Core to record logs... (e.g. Spent 1200 on travel at Uber)"
                className="w-full bg-transparent border-none outline-none text-sm text-gray-200 focus:ring-0"
              />
              <button type="submit" disabled={isLoading || !inputText.trim()} className="bg-white text-black p-2 rounded-xl disabled:opacity-30">
                {isLoading ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
              </button>
            </div>
          </form>

          <div className="bg-[#09090b]/30 border border-white/5 rounded-2xl p-5 shadow-2xl h-[502px] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block">Comparative Projections</span>
              <h3 className="text-sm font-bold text-white tracking-tight">Weekly Volatility Wave Matrix</h3>
            </div>
            
            <div className="w-full h-80 mt-auto">
              <ResponsiveContainer width="100%" height="100%">
               
                <AreaChart data={graphData} margin={{ top: 10, right: 5, left: -25, bottom: 15 }}>
                  <defs>
                    <linearGradient id="spendWave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.01)" />
                  <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} />
                  <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#09090c', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', fontSize: '11px' }} />
                  <Area type="monotone" dataKey="Spent" stroke="#a855f7" strokeWidth={2.5} fillOpacity={1} fill="url(#spendWave)" />
                  <Area type="monotone" dataKey="BudgetLimit" stroke="rgba(255,255,255,0.12)" strokeWidth={1} strokeDasharray="4 4" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-3.5 w-full">
          {categories.map((cat) => {
            const ratio = cat.max > 0 ? Math.min((cat.spent / cat.max) * 100, 100) : 0;
            const isNearingLimit = ratio >= 90;
            
            return (
              <div key={cat.name} className="bg-[#09090b]/40 border border-white/5 rounded-2xl p-3.5 flex flex-col justify-between h-[110px] overflow-hidden transition-all shadow-lg" style={{ backgroundColor: cat.glow }}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-400 tracking-tight">{cat.name}</span>
                  <div className="p-1 rounded-md bg-black/40 border border-white/5">{getCleanIcon(cat.name)}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className={`text-lg font-black ${isNearingLimit ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
                      ₹{cat.spent.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-mono text-gray-600">Max ₹{(cat.max / 1000).toFixed(1)}k</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/50 border border-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${ratio}%` }} 
                      transition={{ duration: 1 }} 
                      className="h-full rounded-full" 
                      style={{ backgroundColor: isNearingLimit ? '#f43f5e' : cat.color }} // Dynamically flips context alert tracks to solid red if cap crosses bounds
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsSettingsOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0c0c0e] border border-white/10 rounded-2xl p-6 max-w-sm w-full relative z-10 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold tracking-wider font-mono text-purple-400 uppercase">Initialize Ledger Balances</h3>
                <X size={18} className="text-gray-500 hover:text-white cursor-pointer" onClick={() => setIsSettingsOpen(false)} />
              </div>
              <form onSubmit={handleManualSettingsUpdate} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 font-mono tracking-wider">Baseline Starting Balance</label>
                  <input type="number" required placeholder="e.g. 50000" value={inputBalance} onChange={(e) => setInputBalance(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-purple-500 text-white" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 font-mono tracking-wider">Global Target Monthly Cap</label>
                  <input type="number" required placeholder="e.g. 20000" value={inputCap} onChange={(e) => setInputCap(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-purple-500 text-white" />
                </div>
                <button type="submit" className="w-full bg-white text-black py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors">Commit Structural Updates</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Dashboard;