
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Plus, X, ShieldAlert, CheckCircle2, Sliders, Utensils, ShoppingBag, Plane, Film, HelpCircle } from 'lucide-react';

const BudgetPage = () => {
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const [selectedCategory, setSelectedCategory] = useState('Food & Drinks');
  const [inputLimit, setInputLimit] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchBudgetSystemData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/budgets/status', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (data.success) {
        setBudgets(data.budgets);
      }
    } catch (err) {
      console.error("Error linking to budget pipeline matrix nodes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetSystemData();
  }, []);

  const handleFormUpsertSubmit = async (e) => {
    e.preventDefault();
    if (!inputLimit || Number(inputLimit) < 0) return;
    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/budgets/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ category: selectedCategory, limitAmount: Number(inputLimit) })
      });
      const data = await response.json();
      if (data.success) {
        setInputLimit('');
        setIsModalOpen(false);
        fetchBudgetSystemData();
      }
    } catch (err) {
      alert("Error pushing constraint variables into DB cache arrays.");
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Food & Drinks': return <Utensils size={16} className="text-purple-400" />;
      case 'Shopping': return <ShoppingBag size={16} className="text-blue-400" />;
      case 'Travel': return <Plane size={16} className="text-indigo-400" />;
      case 'Entertainment': return <Film size={16} className="text-pink-400" />;
      default: return <HelpCircle size={16} className="text-emerald-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-gray-500 font-mono gap-2">
        <Loader2 className="animate-spin text-purple-500" />
        <span>Synchronizing Account Guardrails...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020203] text-white p-4 lg:p-6 font-sans flex flex-col gap-6 select-none relative">
      

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">Budget Guardrails</h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">Configure proactive spending ceiling constraints per transactional channel.</p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white hover:bg-gray-200 text-black px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
        >
          <Plus size={14} /> Adjust Custom Rule
        </button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
        {budgets.map((b) => {
          const ratioPercentage = Math.min((b.spent / b.limitAmount) * 100, 100);
          const isOverflown = b.spent > b.limitAmount;
          const remainingAmount = b.limitAmount - b.spent;

          return (
            <div 
              key={b.category}
              className={`border rounded-2xl p-5 flex flex-col justify-between h-[174px] relative overflow-hidden shadow-xl transition-all duration-300 ${
                isOverflown 
                  ? 'bg-rose-950/5 border-rose-500/20 shadow-rose-950/5' 
                  : 'bg-[#08080a] border-white/5 hover:border-white/10'
              }`}
            >
              
              <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl pointer-events-none ${isOverflown ? 'bg-rose-500/5' : 'bg-white/[0.01]'}`} />

              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-black/40 border border-white/5 rounded-xl">{getCategoryIcon(b.category)}</div>
                  <h3 className="text-sm font-bold tracking-tight text-gray-200">{b.category}</h3>
                </div>
                
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                  b.isCustom 
                    ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' 
                    : 'bg-gray-500/5 border-white/5 text-gray-500'
                }`}>
                  {b.isCustom ? 'Manual Lock' : 'System Default'}
                </span>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="flex items-baseline justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-gray-500 uppercase">Current Capacity Usage</span>
                    <span className={`text-xl font-black ${isOverflown ? 'text-rose-400' : 'text-white'}`}>
                      ₹{b.spent.toLocaleString('en-IN')} <span className="text-xs text-gray-600 font-normal">/ ₹{(b.limitAmount / 1000).toFixed(0)}k</span>
                    </span>
                  </div>

                  <span className={`text-xs font-mono font-bold flex items-center gap-1 ${isOverflown ? 'text-rose-400 animate-pulse' : 'text-gray-400'}`}>
                    {isOverflown ? <ShieldAlert size={12} /> : <CheckCircle2 size={12} className="text-emerald-500" />}
                    {isOverflown ? 'Over Limit' : `₹${remainingAmount.toLocaleString('en-IN')} Left`}
                  </span>
                </div>

             
                <div className="w-full h-2 bg-black/50 border border-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${ratioPercentage}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full rounded-full ${isOverflown ? 'bg-rose-500' : 'bg-gradient-to-r from-purple-500 to-indigo-500'}`} 
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
              onClick={() => setIsModalOpen(false)} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 10 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.96, y: 10 }} 
              className="bg-[#0b0b0d] border border-white/10 rounded-2xl p-6 max-w-sm w-full relative z-10 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-5">
                <div className="flex items-center gap-2 text-purple-400">
                  <Sliders size={16} />
                  <h3 className="text-xs font-mono font-bold tracking-wider uppercase">Configure Cap Overrides</h3>
                </div>
                <X size={18} className="text-gray-500 hover:text-white cursor-pointer transition-colors" onClick={() => setIsModalOpen(false)} />
              </div>

              <form onSubmit={handleFormUpsertSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500">Target Channel</label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-purple-500 text-gray-300"
                  >
                    {['Food & Drinks', 'Entertainment', 'Shopping', 'Travel', 'Others'].map(cat => (
                      <option key={cat} value={cat} className="bg-[#0b0b0d]">{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500">Maximum Ceiling Limit (INR)</label>
                  <input 
                    type="number" 
                    required 
                    placeholder="e.g. 15000" 
                    value={inputLimit} 
                    onChange={(e) => setInputLimit(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-purple-500 text-white font-mono" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submitting || !inputLimit}
                  className="w-full bg-white hover:bg-gray-200 text-black py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest disabled:opacity-30 transition-colors mt-2"
                >
                  {submitting ? <Loader2 size={14} className="animate-spin mx-auto" /> : 'Commit Restriction Rule'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BudgetPage;