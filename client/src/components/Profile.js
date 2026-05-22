

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ShieldCheck, User, CreditCard, RefreshCw, database, Settings, Trash2 } from 'lucide-react';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ name: '', email: '', total_balance: 0, monthly_cap: 20000, base_currency: 'INR' });
  const [diagnostics, setDiagnostics] = useState({ totalTxCount: 0, totalGoalsCount: 0, financialTier: 'Standard Node', tierColor: '#3b82f6' });
  
  // State Input Modifications matrices
  const [editName, setEditName] = useState('');
  const [editCap, setEditCap] = useState('');
  const [editCurrency, setEditCurrency] = useState('INR');
  const [updating, setUpdating] = useState(false);
  const [purging, setPurging] = useState(false);

  const fetchProfileSystemData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profile/meta', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (data.success) {
        setProfile(data.profile);
        setDiagnostics(data.diagnostics);
        setEditName(data.profile.name);
        setEditCap(data.profile.monthly_cap);
        setEditCurrency(data.profile.base_currency);
      }
    } catch (err) {
      console.error("Error reading setup variables from cloud:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfileSystemData(); }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const response = await fetch('http://localhost:5000/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: editName, monthly_cap: Number(editCap), base_currency: editCurrency })
      });
      const data = await response.json();
      if (data.success) {
        fetchProfileSystemData();
        alert("Configuration constants applied successfully!");
      }
    } catch (err) {
      alert("Error synchronizing profile data adjustments.");
    } finally { setUpdating(false); }
  };

  const handleInfrastructurePurge = async () => {
    if (!window.confirm("CRITICAL WARNING: This action permanently wipes your entire transaction ledger history, active goals, and budget limits from MongoDB. Your balance will reset to zero. This cannot be undone. Proceed?")) return;
    setPurging(true);
    try {
      const response = await fetch('http://localhost:5000/api/profile/purge', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (data.success) {
        alert("Database ledger cleared cleanly. Workspace initialized to factory defaults.");
        window.location.reload();
      }
    } catch (err) {
      alert("Purge transaction execution dropped.");
    } finally { setPurging(false); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-gray-500 font-mono gap-2">
        <Loader2 className="animate-spin text-purple-500" />
        <span>Decrypting System Profiles...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020203] text-white p-4 lg:p-6 font-sans flex flex-col gap-6 select-none">
      
      {/* HEADER CONTROLS VIEW TITLE */}
      <div className="border-b border-white/5 pb-4">
        <h1 className="text-2xl font-black tracking-tight text-white">System Configuration</h1>
        <p className="text-xs text-gray-500 font-medium mt-0.5">Manage identity keys, global limits, and database state architectures.</p>
      </div>

      {/* TWO-COLUMN EXECUTIVE MANAGEMENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full">
        
        {/* LEFT COLUMN: PARAMETER RE-WRITER FORM (Spans 7 Columns) */}
        <form onSubmit={handleUpdateProfile} className="lg:col-span-7 bg-[#08080a] border border-white/5 rounded-2xl p-6 shadow-2xl flex flex-col justify-between min-h-[460px]">
          <div className="space-y-5">
            <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block border-b border-white/5 pb-2 flex items-center gap-2">
              <Settings size={14} className="text-purple-400" /> Identity Variables & Parameters
            </span>

            {/* Field A: Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500">Account Username</label>
              <input type="text" required value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-purple-500 text-gray-200" />
            </div>

            {/* Field B: Email (Locked Identity Key) */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono tracking-widest text-gray-600">Identity Email Key (Read-Only)</label>
              <div className="w-full bg-black/40 border border-white/5 rounded-xl p-3 text-sm text-gray-500 cursor-not-allowed select-text font-mono">{profile.email}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field C: Monthly Ceiling Limit */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500">Global Monthly Ceiling Cap (INR)</label>
                <input type="number" required value={editCap} onChange={(e) => setEditCap(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm font-mono focus:outline-none focus:border-purple-500 text-white" />
              </div>

              {/* Field D: System Base Currency */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono tracking-widest text-gray-500">Core Engine Base Currency</label>
                <select value={editCurrency} onChange={(e) => setEditCurrency(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-purple-500 text-gray-300">
                  <option value="INR">INR (₹) - Indian Rupee</option>
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="EUR">EUR (€) - Euro Matrix</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" disabled={updating} className="w-full bg-white hover:bg-gray-200 text-black py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors mt-6 flex items-center justify-center gap-2">
            {updating ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />} Commit System Changes
          </button>
        </form>

        {/* RIGHT COLUMN: RE-ACTIONARY METRICS AND DATA PURGING WINDOW (Spans 5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-6 items-stretch">
          
          {/* TOP INNER CARD: DIAGNOSTIC TELEMETRY CLUSTER */}
          <div className="bg-[#08080a] border border-white/5 rounded-2xl p-6 shadow-2xl flex flex-col justify-between flex-grow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${diagnostics.tierColor}10` }} />
            
            <div className="w-full">
              <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block border-b border-white/5 pb-2">System Health Diagnostics</span>
              
              <div className="mt-4 space-y-4">
                <div>
                  <span className="text-[9px] font-mono uppercase text-gray-500 block">Calculated Liquidity Status</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: diagnostics.tierColor }} />
                    <span className="text-sm font-black tracking-tight" style={{ color: diagnostics.tierColor }}>{diagnostics.financialTier}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-gray-500 block">Ledger Records</span>
                    <span className="text-base font-black text-white mt-0.5 block font-mono">{diagnostics.totalTxCount} Docs</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase text-gray-500 block">Active Milestones</span>
                    <span className="text-base font-black text-purple-400 mt-0.5 block font-mono">{diagnostics.totalGoalsCount} Slots</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 mt-6 bg-white/[0.01] p-2.5 rounded-xl border border-white/5">
              <ShieldCheck size={14} className="text-emerald-500 flex-shrink-0" />
              <span>Security Protocols Engaged. Node keys verified via cryptographically signed token streams.</span>
            </div>
          </div>

          {/* BOTTOM INNER CARD: THE CRITICAL DANGER MATRIX AREA */}
          <div className="bg-rose-950/[0.02] border border-rose-500/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-3">
            <div>
              <h4 className="text-xs font-black tracking-wider font-mono text-rose-400 uppercase flex items-center gap-1.5">
                <Trash2 size={14} /> Hazard Operations Matrix
              </h4>
              <p className="text-[11px] leading-relaxed text-gray-500 mt-1">Resetting completely wipes your database tables down to stock parameters. Balance pools drop immediately to ₹0.</p>
            </div>

            <button 
              type="button" 
              disabled={purging}
              onClick={handleInfrastructurePurge}
              className="w-full bg-rose-500/5 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 py-2.5 rounded-xl font-bold font-mono text-[10px] uppercase tracking-widest transition-all duration-200"
            >
              {purging ? <Loader2 size={12} className="animate-spin mx-auto" /> : 'Purge All Database Records'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProfilePage;