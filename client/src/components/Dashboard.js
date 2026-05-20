import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  Sparkles, 
  Mic, 
  ArrowRight,
  Utensils,
  ShoppingBag,
  Plane,
  Film,
  HelpCircle,
  TrendingUp,
  Sliders,
  Maximize2,
  Cpu,
  Loader2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Dashboard = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [greeting, setGreeting] = useState('Good Evening');
  
  // Simulated State Values
  const [balance, setBalance] = useState(45250);
  const [monthlyCap, setMonthlyCap] = useState(20000);
  const [totalSpent, setTotalSpent] = useState(14700);

  // Advanced Multi-Line Comparative Analytics Array Data Structure
  const [analyticsData] = useState([
    { name: 'Mon', Spent: 400, BudgetLimit: 1500 },
    { name: 'Tue', Spent: 900, BudgetLimit: 1500 },
    { name: 'Wed', Spent: 2100, BudgetLimit: 1500 },
    { name: 'Thu', Spent: 600, BudgetLimit: 1500 },
    { name: 'Fri', Spent: 1800, BudgetLimit: 2000 },
    { name: 'Sat', Spent: 3300, BudgetLimit: 2000 },
    { name: 'Sun', Spent: 1200, BudgetLimit: 2000 },
  ]);

  const [categories] = useState([
    { name: 'Food & Drinks', spent: 4500, max: 6000, color: '#a855f7', glow: 'rgba(168,85,247,0.1)' },
    { name: 'Entertainment', spent: 1200, max: 3000, color: '#ec4899', glow: 'rgba(236,72,153,0.1)' },
    { name: 'Shopping', spent: 8000, max: 10000, color: '#3b82f6', glow: 'rgba(59,130,246,0.1)' },
    { name: 'Travel', spent: 2000, max: 5000, color: '#6366f1', glow: 'rgba(99,102,241,0.1)' },
  ]);

  const [activities, setActivities] = useState([
    { id: 1, merchant: 'Zepto Grocery', category: 'Food & Drinks', amount: -450, time: '3m ago', node: 'API Node 01' },
    { id: 2, merchant: 'Freelance Pay', category: 'Income', amount: 12000, time: '2h ago', node: 'System Core' },
    { id: 3, merchant: 'Apple Music', category: 'Entertainment', amount: -99, time: '1d ago', node: 'API Node 02' },
  ]);

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning');
    else if (hours < 16) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const getCleanIcon = (category) => {
    switch (category) {
      case 'Food & Drinks': return <Utensils size={14} className="text-purple-400" />;
      case 'Shopping': return <ShoppingBag size={14} className="text-blue-400" />;
      case 'Travel': return <Plane size={14} className="text-indigo-400" />;
      case 'Entertainment': return <Film size={14} className="text-pink-400" />;
      default: return <HelpCircle size={14} className="text-emerald-400" />;
    }
  };

  const handleAIFormSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/dashboard/process-input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ text: inputText })
      });
      const data = await response.json();

      if (data.success) {
        setBalance(data.newBalance);
        if (data.extracted.transaction_type === 'expense') {
          setTotalSpent(prev => prev + data.extracted.amount);
        }
        setActivities([
          {
            id: Date.now(),
            merchant: data.extracted.merchant_name,
            category: data.extracted.category,
            amount: data.extracted.transaction_type === 'expense' ? -data.extracted.amount : data.extracted.amount,
            time: 'Just Now',
            node: 'Gemini Core'
          },
          ...activities
        ]);
        setInputText('');
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error linking to AI stream models.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white p-4 lg:p-6 font-sans flex flex-col gap-6">
      
      {/* ================= RE-ENGINEERED TOP HORIZONTAL COCKPIT BAR ================= */}
      <div className="w-full bg-[#09090b]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-500/20 p-2.5 rounded-xl border border-purple-500/30">
            <Cpu className="text-purple-400 w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-mono font-bold text-gray-500 uppercase tracking-widest">{greeting}</h2>
            <h1 className="text-xl font-black text-white tracking-tight">Executive Control Panel</h1>
          </div>
        </div>

        {/* Dynamic Metric Streams inline */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-8 bg-black/40 border border-white/5 px-6 py-2.5 rounded-xl w-full sm:w-auto justify-around">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase block">Liquid Balance</span>
            <span className="text-base font-black text-white">₹{balance.toLocaleString('en-IN')}</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase block">Monthly Capital Burn</span>
            <span className="text-base font-black text-pink-400">₹{totalSpent.toLocaleString('en-IN')} <span className="text-xs text-gray-600 font-normal">/ ₹{monthlyCap / 1000}k</span></span>
          </div>
        </div>
      </div>

      {/* ================= THE ASYMMETRIC 3-COLUMN CORE SYSTEM ================= */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start w-full">
        
        {/* PANEL 1: LEFT SIDEBAR HIGH-DENSITY LEDGER (Spans 3 Columns) */}
        <div className="md:col-span-4 lg:col-span-3 bg-[#09090b]/20 border border-white/5 rounded-2xl p-5 shadow-2xl h-[560px] flex flex-col justify-between">
          <div className="overflow-hidden flex flex-col h-full">
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <span className="text-xs font-mono font-bold tracking-widest text-gray-400 uppercase">Transaction Stream</span>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            </div>

            <div className="space-y-3 overflow-y-auto flex-grow pr-1">
              <AnimatePresence initial={false}>
                {activities.map((act) => (
                  <motion.div 
                    key={act.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col gap-2 group hover:border-purple-500/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">
                          {getCleanIcon(act.category)}
                        </div>
                        <h4 className="text-xs font-bold text-gray-200 truncate max-w-[110px]">{act.merchant}</h4>
                      </div>
                      <span className={`text-xs font-mono font-bold ${act.amount < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {act.amount < 0 ? '-' : '+'}₹{Math.abs(act.amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] font-mono text-gray-600">
                      <span>{act.node}</span>
                      <span>{act.time}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* PANEL 2: MAIN CENTER VISUAL INTERFACE (Spans 6 Columns) */}
        <div className="md:col-span-8 lg:col-span-6 flex flex-col gap-6 h-full">
          
          {/* THE MASTER AI BOX INPUT CARD */}
          <form onSubmit={handleAIFormSubmit} className="relative group w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-focus-within:opacity-100 transition duration-300" />
            <div className="relative bg-[#09090b]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <input 
                type="text"
                required
                disabled={isLoading}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask Gemini Core to record updates... (e.g. Spent 350 at Starbucks)"
                className="w-full bg-transparent border-none outline-none text-sm text-gray-200 placeholder-gray-600 focus:ring-0 font-sans"
              />
              <div className="flex items-center gap-2">
                <button type="button" className="p-2 rounded-lg bg-white/5 text-gray-500 hover:text-white transition-colors">
                  <Mic size={16} />
                </button>
                <button 
                  type="submit"
                  disabled={isLoading || !inputText.trim()}
                  className="bg-white text-black font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-30"
                >
                  {isLoading ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
                </button>
              </div>
            </div>
          </form>

          {/* COMPACT ANALYTICAL COMPARATIVE CHART VIEWPORT */}
          <div className="bg-[#09090b]/30 border border-white/5 rounded-2xl p-5 shadow-2xl relative flex-grow flex flex-col justify-between h-[478px]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest block">Core Models</span>
                <h3 className="text-sm font-bold text-white tracking-tight">System Volatility Variance</h3>
              </div>
              <div className="flex gap-4 text-[10px] font-mono text-gray-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /> Spending</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-white/20" /> Safety Roof</span>
              </div>
            </div>

            <div className="w-full h-80 mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="spendWave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} />
                  <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#09090c', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="Spent" stroke="#a855f7" strokeWidth={2.5} fillOpacity={1} fill="url(#spendWave)" />
                  <Area type="monotone" dataKey="BudgetLimit" stroke="rgba(255,255,255,0.15)" strokeWidth={1} strokeDasharray="4 4" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* PANEL 3: RIGHT BENTO GAUGES SYSTEM NODES (Spans 3 Columns) */}
        <div className="md:col-span-12 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full">
          {categories.map((cat) => {
            const ratio = Math.min((cat.spent / cat.max) * 100, 100);
            return (
              <div 
                key={cat.name} 
                className="bg-[#09090b]/40 border border-white/5 rounded-2xl p-4 flex flex-col justify-between h-[126px] relative overflow-hidden group hover:border-white/10 transition-colors shadow-lg"
                style={{ backgroundColor: cat.glow }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-400 tracking-tight">{cat.name}</span>
                  <div className="p-1 rounded-md bg-black/40 border border-white/5">
                    {getCleanIcon(cat.name)}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-black text-white">₹{cat.spent}</span>
                    <span className="text-[10px] font-mono text-gray-600">Max ₹{cat.max / 1000}k</span>
                  </div>
                  {/* Specialized Micro Tracking Rail */}
                  <div className="w-full h-1.5 bg-black/50 border border-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${ratio}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

export default Dashboard;