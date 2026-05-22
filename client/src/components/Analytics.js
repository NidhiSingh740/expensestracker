import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2, Cpu, Activity, Sparkles } from 'lucide-react';

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState({ totalSpent: 0, avgDaily: 0, topCategory: 'None', runwayDays: 'Infinite' });
  const [cashFlow, setCashFlow] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/analytics/dashboard', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        if (data.success) {
          setCards(data.cards);
          setCashFlow(data.cashFlow);
          setDistribution(data.distribution);
          setInsights(data.insights);
        }
      } catch (err) {
        console.error("Pipeline breakdown:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-gray-500 font-mono gap-2">
        <Loader2 className="animate-spin text-pink-500" />
        <span>Syncing Proportional Matrices...</span>
      </div>
    );
  }

  const maxSpentVal = distribution.length > 0 ? Math.max(...distribution.map(d => d.spent), 0) : 0;

  return (
    <div className="min-h-screen bg-[#020203] text-white p-4 lg:p-6 font-sans flex flex-col gap-6 select-none">
      

      <div className="w-full bg-[#070709]/60 border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="bg-pink-500/10 p-2 rounded-xl border border-pink-500/20 text-pink-400">
            <Cpu size={18} className="animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white">Predictive Matrix Workspace</h1>
            <p className="text-[11px] text-gray-500 font-mono tracking-wider uppercase mt-0.5">Statistical Financial Engine Log</p>
          </div>
        </div>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {[
          { label: 'Cumulative Volume', val: `₹${cards.totalSpent.toLocaleString('en-IN')}` },
          { label: 'Daily Burn Speed', val: `₹${cards.avgDaily.toLocaleString('en-IN')}` },
          { label: 'Dominant Category', val: cards.topCategory, color: 'text-purple-400' },
          { label: 'Liquidity Runway', val: typeof cards.runwayDays === 'number' ? `${cards.runwayDays} Days` : cards.runwayDays, color: 'text-pink-400' }
        ].map((c, i) => (
          <div key={i} className="bg-[#08080a] border border-white/5 p-4 rounded-xl flex flex-col gap-1 shadow-md">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider">{c.label}</span>
            <h3 className={`text-lg font-black ${c.color || 'text-white'} mt-0.5`}>{c.val}</h3>
          </div>
        ))}
      </div>


      <div className="w-full bg-[#08080a] border border-white/5 rounded-2xl p-5 shadow-2xl h-[340px] flex flex-col justify-between">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">Cash Flow Projection Vectors</span>
        <div className="w-full h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlow} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
              <XAxis dataKey="month" stroke="#374151" fontSize={11} tickLine={false} />
              <YAxis stroke="#374151" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#070709', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', fontSize: '11px' }} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', fontFamily: 'monospace' }} />
              <Bar dataKey="Income" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={16} />
              <Bar dataKey="Expense" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
        
    
        <div className="lg:col-span-6 bg-[#08080a] border border-white/5 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">Asymmetric Asset Rails</span>
          <div className="space-y-4 flex-grow flex flex-col justify-around">
            {distribution.map((d) => {
         
              const trackRatio = maxSpentVal > 0 ? (d.spent / maxSpentVal) * 100 : 0;
              return (
                <div key={d.name} className="space-y-1 w-full">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-400">{d.name}</span>
                    <span className="font-mono text-white">₹{d.spent.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/40 border border-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${trackRatio}%` }} 
                      transition={{ duration: 1 }} 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-6 bg-[#08080a] border border-white/5 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">Gemini Optimization Clusters</span>
          <div className="space-y-3 flex-grow flex flex-col justify-center">
            {insights.map((ins, i) => (
              <div key={i} className={`p-4 rounded-xl border bg-black/40 ${ins.type === 'alert' ? 'border-pink-500/10' : 'border-purple-500/10'} flex flex-col gap-1.5 hover:border-white/10 transition-colors duration-300`}>
                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${ins.type === 'alert' ? 'text-pink-400' : 'text-purple-400'}`}>
                  {ins.type === 'alert' ? <Activity size={14} /> : <Sparkles size={14} />}
                  <span>{ins.title}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">{ins.message}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AnalyticsPage;