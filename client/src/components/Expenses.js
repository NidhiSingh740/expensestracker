

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Trash2, Filter, ArrowUpDown, ChevronLeft, ChevronRight, ListFilter, AlertCircle } from 'lucide-react';

const ExpensesPage = () => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  
 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [evictingId, setEvictingId] = useState(null);

 const fetchLedgerData = async () => {
    setLoading(true);
    try {
     
      const safeCategory = encodeURIComponent(category);
      const safeType = encodeURIComponent(type);
      const safeSortBy = encodeURIComponent(sortBy);

      const url = `http://localhost:5000/api/expenses/ledger?page=${currentPage}&limit=8&category=${safeCategory}&type=${safeType}&sortBy=${safeSortBy}`;
      
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (data.success) {
        setRecords(data.records);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error("Ledger mapping failure:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchLedgerData();
  }, [currentPage, category, type, sortBy]);

  const handleRowEviction = async (id) => {
    if (!window.confirm("Evict this record permanently from the database? This action instantly recalculates your liquid account balance.")) return;
    setEvictingId(id);

    try {
      const response = await fetch(`http://localhost:5000/api/expenses/evict/${id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (data.success) {
       
        if (records.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        } else {
          fetchLedgerData();
        }
      }
    } catch (err) {
      alert("Error handling document deletion transaction.");
    } finally {
      setEvictingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#020203] text-white p-4 lg:p-6 font-sans flex flex-col gap-6 select-none">
   
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white">Account Ledger</h1>
        <p className="text-xs text-gray-500 font-medium mt-0.5">Audit, filter, and manage your complete multi-platform financial history.</p>
      </div>

     
      <div className="bg-[#08080a] border border-white/5 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-3">
   
          <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded-xl text-xs text-gray-400">
            <Filter size={12} className="text-purple-400" />
            <select value={category} onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }} className="bg-transparent border-none outline-none text-gray-200 cursor-pointer">
              {['All', 'Food & Drinks', 'Entertainment', 'Shopping', 'Travel', 'Income', 'Others'].map(cat => (
                <option key={cat} value={cat} className="bg-[#08080a]">{cat}</option>
              ))}
            </select>
          </div>

          {/* Transaction Type Filter */}
          <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded-xl text-xs text-gray-400">
            <ListFilter size={12} className="text-pink-400" />
            <select value={type} onChange={(e) => { setType(e.target.value); setCurrentPage(1); }} className="bg-transparent border-none outline-none text-gray-200 cursor-pointer">
              {['All', 'Expense', 'Income'].map(t => (
                <option key={t} value={t} className="bg-[#08080a]">{t}</option>
              ))}
            </select>
          </div>
        </div>

       
        <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded-xl text-xs text-gray-400">
          <ArrowUpDown size={12} className="text-blue-400" />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent border-none outline-none text-gray-200 cursor-pointer">
            <option value="newest" className="bg-[#08080a]">Newest Entry</option>
            <option value="oldest" className="bg-[#08080a]">Oldest Entry</option>
            <option value="highest" className="bg-[#08080a]">Highest Amount</option>
            <option value="lowest" className="bg-[#08080a]">Lowest Amount</option>
          </select>
        </div>
      </div>

   
      <div className="w-full bg-[#08080a] border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between min-h-[460px]">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-mono uppercase tracking-widest text-gray-500 bg-white/[0.01]">
                <th className="p-4 font-bold">Merchant / Origin</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Timestamp</th>
                <th className="p-4 font-bold">Flow Type</th>
                <th className="p-4 font-bold text-right">Magnitude</th>
                <th className="p-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-32 text-gray-500 font-mono">
                    <Loader2 className="animate-spin text-purple-500 mx-auto w-6 h-6 mb-2" />
                    Syncing Ledger State Vectors...
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-32 text-gray-600 font-mono">
                    <AlertCircle className="mx-auto w-6 h-6 mb-2 text-gray-700" />
                    No transactions matching your query filters exist inside database caches.
                  </td>
                </tr>
              ) : (
                records.map((tx) => {
                  const isExpense = tx.transaction_type === 'expense';
                  return (
                    <motion.tr 
                      key={tx._id} 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/[0.01] transition-colors duration-150 group"
                    >
                      <td className="p-4 font-bold text-gray-200">{tx.merchant_name}</td>
                      <td className="p-4">
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-gray-400">
                          {tx.category}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-gray-500">
                        {new Date(tx.timestamp).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${isExpense ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {tx.transaction_type}
                        </span>
                      </td>
                      <td className={`p-4 font-mono font-bold text-right text-sm ${isExpense ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {isExpense ? '-' : '+'}₹{tx.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          disabled={evictingId === tx._id}
                          onClick={() => handleRowEviction(tx._id)}
                          className="text-gray-600 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          {evictingId === tx._id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

       
        <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/[0.005] mt-auto">
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
            Showing page {currentPage} of {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1 || loading}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 border border-white/10 rounded-xl bg-black text-gray-400 hover:text-white disabled:opacity-20 disabled:hover:text-gray-400 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              disabled={currentPage === totalPages || loading}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 border border-white/10 rounded-xl bg-black text-gray-400 hover:text-white disabled:opacity-20 disabled:hover:text-gray-400 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ExpensesPage;