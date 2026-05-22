import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Plus, X, Target, Calendar, Coins, Flame, Trash2, CheckCircle2 } from 'lucide-react';

const SavingGoalsPage = () => {
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  
  const [nameInput, setNameInput] = useState('');
  const [targetInput, setTargetInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [allocateInput, setAllocateInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchSavingsData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/savings/list', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (data.success) setGoals(data.goals);
    } catch (err) {
      console.error("Failed fetching savings target vectors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSavingsData(); }, []);

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    if (!nameInput || !targetInput || !dateInput) return;
    setSubmitting(true);

   
    const cleanDateString = dateInput.replace(/\s+/g, '');

    try {
      const response = await fetch('http://localhost:5000/api/savings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          goalName: nameInput.trim(), 
          targetAmount: Number(targetInput), 
          targetDate: cleanDateString 
        })
      });
      const data = await response.json();
      if (data.success) {
        setNameInput(''); setTargetInput(''); setDateInput('');
        setIsCreateOpen(false);
        fetchSavingsData();
      } else {
        alert(`Server Refusal: ${data.message}`);
      }
    } catch (err) {
      alert("Error adding savings goal to cloud cluster.");
    } finally { setSubmitting(false); }
  };

  const handleAllocateFunds = async (e) => {
    e.preventDefault();
    if (!allocateInput || Number(allocateInput) <= 0) return;
    setSubmitting(true);

    try {
      const response = await fetch(`http://localhost:5000/api/savings/allocate/${selectedGoal._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ amount: Number(allocateInput) })
      });
      const data = await response.json();
      if (data.success) {
        setAllocateInput('');
        setIsAllocateOpen(false);
        fetchSavingsData();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Allocation pipeline transaction error.");
    } finally { setSubmitting(false); }
  };

  const handleDissolveGoal = async (id) => {
    if (!window.confirm("Dissolve this savings track? All locked cash tokens will instantly be returned to your main fluid wallet statement.")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/savings/dissolve/${id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (data.success) fetchSavingsData();
    } catch (err) {
      alert("Error dissolving target model.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-gray-500 font-mono gap-2">
        <Loader2 className="animate-spin text-indigo-500" />
        <span>Syncing Vault Asset Portfolios...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020203] text-white p-4 lg:p-6 font-sans flex flex-col gap-6 select-none relative">
      
      {/* HEADER ACTIONS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">Savings Targets</h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">Isolate and fuel dynamic capitalization containers for your milestones.</p>
        </div>

        <button 
          onClick={() => setIsCreateOpen(true)}
          className="bg-white hover:bg-gray-200 text-black px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
        >
          <Plus size={14} /> Provision New Target
        </button>
      </div>

      {/* TARGET TILES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
        {goals.length === 0 ? (
          <div className="col-span-3 text-center py-24 text-xs font-mono text-gray-600 border border-dashed border-white/5 rounded-2xl">
            No long-term asset targets provisioned yet. Click above to isolate capital tracking streams.
          </div>
        ) : (
          goals.map((g) => {
            const ratioPercentage = Math.min((g.currentAmount / g.targetAmount) * 100, 100);
            const isCompleted = g.currentAmount >= g.targetAmount;
            const remainingDays = Math.max(Math.ceil((new Date(g.targetDate) - new Date()) / (1000 * 60 * 60 * 24)), 0);

            return (
              <div key={g._id} className="bg-[#08080a] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[196px] relative overflow-hidden shadow-xl hover:border-white/10 transition-colors group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/[0.01] rounded-full blur-2xl pointer-events-none" />

                <div className="w-full flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-black/40 border border-white/5 rounded-xl text-indigo-400"><Target size={16} /></div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight text-gray-200">{g.goalName}</h3>
                      <span className="text-[9px] font-mono text-gray-600 block mt-0.5 flex items-center gap-1">
                        <Calendar size={10} /> Target: {new Date(g.targetDate).toLocaleDateString('en-IN', {month:'short', year:'numeric'})}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDissolveGoal(g._id)}
                    className="text-gray-700 hover:text-rose-400 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-150"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <div className="space-y-3 mt-auto">
                  <div className="flex items-baseline justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider">Accumulated Equity</span>
                      <span className="text-lg font-black text-white mt-0.5">
                        {isCompleted ? <span className="text-emerald-400 flex items-center gap-1 text-sm font-bold"><CheckCircle2 size={14} /> Fulfilled</span> : `₹${g.currentAmount.toLocaleString('en-IN')}`} 
                        <span className="text-xs text-gray-600 font-normal"> / ₹{(g.targetAmount/1000).toFixed(0)}k</span>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-indigo-400 block">{ratioPercentage.toFixed(0)}%</span>
                      <span className="text-[9px] font-mono text-gray-600 uppercase block mt-0.5 flex items-center gap-0.5 justify-end">
                        <Flame size={10} className="text-amber-500" /> {remainingDays} Days Left
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-1.5 bg-black/40 border border-white/5 rounded-full overflow-hidden flex items-center">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${ratioPercentage}%` }} 
                      transition={{ duration: 0.8 }}
                      className={`h-full rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`} 
                    />
                  </div>

                  {!isCompleted && (
                    <button 
                      onClick={() => { setSelectedGoal(g); setIsAllocateOpen(true); }}
                      className="w-full bg-white/[0.02] border border-white/5 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 py-1.5 rounded-xl hover:bg-white hover:text-black hover:border-white transition-all duration-200"
                    >
                      Fund Target Slot
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

   
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCreateOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="bg-[#0b0b0d] border border-white/10 rounded-2xl p-6 max-w-sm w-full relative z-10 shadow-2xl">
              <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-4">
                <h3 className="text-xs font-mono font-bold uppercase text-indigo-400 tracking-wider">Initialize Goal Vault</h3>
                <X size={16} className="text-gray-500 hover:text-white cursor-pointer" onClick={() => setIsCreateOpen(false)} />
              </div>
              <form onSubmit={handleCreateGoal} className="space-y-4">
                <div className="space-y-1"><label className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Goal Target Name</label>
                  <input type="text" required placeholder="e.g. Laptop Upgrade" value={nameInput} onChange={(e) => setNameInput(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div className="space-y-1"><label className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Target Value (INR)</label>
                  <input type="number" required placeholder="e.g. 100000" value={targetInput} onChange={(e) => setTargetInput(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm font-mono text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <div className="space-y-1"><label className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Target Maturity Date (YYYY-MM-DD)</label>
                  <input type="text" required placeholder="2026-10-30" value={dateInput} onChange={(e) => setDateInput(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm font-mono text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-white text-black py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-opacity">
                  {submitting ? <Loader2 size={14} className="animate-spin mx-auto" /> : 'Provision Vault'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    
      <AnimatePresence>
        {isAllocateOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsAllocateOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="bg-[#0b0b0d] border border-white/10 rounded-2xl p-6 max-w-sm w-full relative z-10 shadow-2xl">
              <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-4">
                <div className="flex items-center gap-1.5 text-indigo-400"><Coins size={14} /><h3 className="text-xs font-mono font-bold uppercase tracking-wider">Allocate Capital Token</h3></div>
                <X size={16} className="text-gray-500 hover:text-white cursor-pointer" onClick={() => setIsAllocateOpen(false)} />
              </div>
              <form onSubmit={handleAllocateFunds} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-mono tracking-widest text-gray-500">Inject Capital Amount (INR)</label>
                  <input type="number" required placeholder="e.g. 5000" value={allocateInput} onChange={(e) => setAllocateInput(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm font-mono text-white focus:outline-none focus:border-indigo-500" />
                </div>
                <button type="submit" disabled={submitting || !allocateInput} className="w-full bg-white text-black py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-opacity">
                  {submitting ? <Loader2 size={14} className="animate-spin mx-auto" /> : `Confirm Injection`}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SavingGoalsPage;