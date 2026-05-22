import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
       
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        navigate('/dashboard'); 
      } else {
        alert(data.message); 
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not connect to the authentication server engine.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 relative overflow-hidden">
      
  
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
      
    
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-md bg-[#09090b]/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative group z-10"
      >
      
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />

        
        <div className="flex flex-col items-center gap-2 mb-8 text-center">
          <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-2.5 rounded-xl border border-purple-400/20 shadow-lg">
            <Wallet className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tighter mt-2">
            Welcome back
          </h2>
          <p className="text-xs text-gray-400">
            Sign in to resume tracking and monitoring your bento category scopes.
          </p>
        </div>

        
        <form onSubmit={handleSubmit} className="space-y-5">

         
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
            <div className="relative group/input">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within/input:text-pink-400 transition-colors" />
              <input 
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@domain.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/80 focus:ring-1 focus:ring-pink-500/50 transition-all duration-300 shadow-inner"
              />
            </div>
          </div>

          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
              <a href="#" className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors">Forgot password?</a>
            </div>
            <div className="relative group/input">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within/input:text-pink-400 transition-colors" />
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-11 pr-12 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-pink-500/80 focus:ring-1 focus:ring-pink-500/50 transition-all duration-300 shadow-inner"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

        
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full relative group mt-2 overflow-hidden bg-white text-black font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-2xl transition-all duration-300"
          >
            <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-pink-400/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            Access Account <LogIn size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </form>

        
        <p className="text-center text-xs text-gray-500 mt-6 font-medium">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-pink-400 hover:text-pink-300 underline underline-offset-4 font-bold transition-colors">
            Sign Up
          </Link>
        </p>

      </motion.div>
    </div>
  );
};

export default Login;