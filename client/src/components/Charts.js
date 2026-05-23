

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { BarChart3, TrendingUp, DollarSign, Award, ShoppingBag, Loader2, AlertCircle } from 'lucide-react';


const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 4}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const ChartsPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  

  const [metrics, setMetrics] = useState({ totalIncome: 0, totalExpense: 0, netSavingsMargin: 0, topCategory: 'None' });
  const [pieData, setPieData] = useState([]);
  const [topVendors, setTopVendors] = useState([]);

  const fetchChartsAnalytics = async () => {
    try {
      const response = await fetch('https://expensestracker-qqri.onrender.com/api/charts/breakdown', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (data.success) {
        setMetrics(data.summary);
        setPieData(data.pieData);
        setTopVendors(data.topMerchants);
      }
    } catch (err) {
      console.error("Error loading structural chart frameworks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartsAnalytics();
  }, []);

  
  const totalLifetimeSpend = pieData.reduce((sum, item) => sum + item.value, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-gray-400 font-mono gap-3">
        <Loader2 className="animate-spin text-purple-500 w-8 h-8" />
        <span>Compiling Macro Financial Distribution Models...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white p-4 lg:p-6 font-sans flex flex-col gap-6 select-none">
      
    
      <div className="flex flex-col gap-1">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-500">Analytics Workspace</span>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Macro Expense Distribution Matrix</h1>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
       
        <div className="bg-[#09090b]/40 border border-white/5 p-4 rounded-xl flex items-center gap-4 relative overflow-hidden shadow-lg">
          <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-400"><TrendingUp size={18} /></div>
          <div>
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Net Savings Margin</span>
            <h3 className={`text-lg font-black ${metrics.netSavingsMargin < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              ₹{metrics.netSavingsMargin.toLocaleString('en-IN')}
            </h3>
          </div>
        </div>

      
        <div className="bg-[#09090b]/40 border border-white/5 p-4 rounded-xl flex items-center gap-4 relative overflow-hidden shadow-lg">
          <div className="bg-purple-500/10 p-2.5 rounded-xl border border-purple-500/20 text-purple-400"><DollarSign size={18} /></div>
          <div>
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Total Tracked Income</span>
            <h3 className="text-lg font-black text-white">₹{metrics.totalIncome.toLocaleString('en-IN')}</h3>
          </div>
        </div>

        
        <div className="bg-[#09090b]/40 border border-white/5 p-4 rounded-xl flex items-center gap-4 relative overflow-hidden shadow-lg">
          <div className="bg-pink-500/10 p-2.5 rounded-xl border border-pink-500/20 text-pink-400"><Award size={18} /></div>
          <div>
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider block">Highest Drain Sector</span>
            <h3 className="text-lg font-black text-pink-400 tracking-tight">{metrics.topCategory}</h3>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
        
      
        <div className="lg:col-span-7 bg-[#09090b]/20 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-8 shadow-2xl relative min-h-[380px]">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          
          {pieData.length === 0 ? (
            <div className="flex flex-col items-center gap-2 text-gray-600 font-mono text-xs py-20 w-full text-center">
              <AlertCircle size={20} className="text-gray-700" />
              <span>Insufficient database logs to compile asset vectors.</span>
            </div>
          ) : (
            <>
             
              <div className="w-56 h-56 shrink-0 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={68}
                      outerRadius={84}
                      dataKey="value"
                      onMouseEnter={(_, idx) => setActiveIndex(idx)}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.4)" strokeWidth={2} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
               
                <div className="absolute flex flex-col items-center text-center max-w-[110px] overflow-hidden pointer-events-none">
                  <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider truncate w-full">
                    {pieData[activeIndex]?.name}
                  </span>
                  <span className="text-xl font-black text-white tracking-tight mt-0.5">
                    {totalLifetimeSpend > 0 ? `${((pieData[activeIndex]?.value / totalLifetimeSpend) * 100).toFixed(0)}%` : '0%'}
                  </span>
                </div>
              </div>

              
              <div className="flex-grow space-y-3.5 w-full">
                <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block pb-2 border-b border-white/5">Absolute Metrics</span>
                <div className="space-y-2.5">
                  {pieData.map((item, index) => (
                    <div 
                      key={item.name}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex items-center justify-between p-2 rounded-xl transition-all duration-200 cursor-pointer border ${
                        activeIndex === index ? 'bg-white/[0.02] border-white/10' : 'border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs font-medium text-gray-300">{item.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-white">₹{item.value.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

      
        <div className="lg:col-span-5 bg-[#09090b]/20 border border-white/5 rounded-2xl p-6 flex flex-col justify-between shadow-2xl min-h-[380px]">
          <div className="w-full">
            <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block pb-3 border-b border-white/5 mb-4">Top Burner Vendor Nodes</span>
            <div className="space-y-5">
              {topVendors.length === 0 ? (
                <div className="text-center text-xs text-gray-600 font-mono pt-16">No merchant parameters grouped yet.</div>
              ) : (
                topVendors.map((vendor) => {
                  const ratioFraction = totalLifetimeSpend > 0 ? Math.min((vendor.spent / totalLifetimeSpend) * 100, 100) : 0;
                  return (
                    <div key={vendor.name} className="space-y-2 group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 bg-black/50 border border-white/5 rounded-lg text-purple-400 group-hover:border-purple-500/20 transition-colors"><ShoppingBag size={14} /></div>
                          <h4 className="text-xs font-bold text-gray-200">{vendor.name}</h4>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-white block">₹{vendor.spent.toLocaleString('en-IN')}</span>
                          <span className="text-[9px] font-mono text-gray-600 uppercase block">{vendor.count} Transactions</span>
                        </div>
                      </div>
                   
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${ratioFraction}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          
          <div className="text-[10px] font-mono text-gray-600 leading-normal border-t border-white/5 pt-4 mt-4 hidden md:block">
            * Systems cluster vendor metrics based on natural intent strings processed via Gemini extraction layers automatically.
          </div>
        </div>

      </div>

    </div>
  );
};

export default ChartsPage;