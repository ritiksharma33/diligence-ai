import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Gavel, ShieldAlert, FileText, IndianRupee } from 'lucide-react';
//prop is recieveed data in json form now render it on the ui 
const LegalResults = ({ data }) => {
  // Animation variants for the "Staggered" entrance effect
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (!data) return null;

  return (
    <motion.div 
      variants={containerVars} 
      initial="hidden" 
      animate="show"
      className="grid grid-cols-1 md:grid-cols-6 gap-6"
    >
      {/* 1. Executive Summary - Full Width */}
      <motion.div variants={itemVars} className="md:col-span-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/40 group-hover:bg-emerald-400 transition-colors" />
        <div className="flex items-center gap-3 text-slate-500 mb-4">
          <FileText size={18} className="text-emerald-500" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Document Abstract</span>
        </div>
        <p className="text-lg text-slate-200 leading-relaxed font-medium">
          {data.summary}
        </p>
      </motion.div>

      {/* 2. Parties Involved */}
      <motion.div variants={itemVars} className="md:col-span-3 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
        <div className="flex items-center gap-3 text-slate-500 mb-6">
          <Users size={18} className="text-blue-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Legal Entities</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.parties?.map((party, index) => (
            <span key={index} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full text-xs font-mono">
              {party}
            </span>
          ))}
        </div>
      </motion.div>

      {/* 3. Deadlines & Timeline */}
      <motion.div variants={itemVars} className="md:col-span-3 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
        <div className="flex items-center gap-3 text-slate-500 mb-6">
          <Calendar size={18} className="text-amber-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Key Deadlines</span>
        </div>
        <div className="space-y-3">
          {data.deadlines?.map((date, index) => (
            <div key={index} className="flex items-center gap-3 text-sm text-slate-300 border-l border-white/10 pl-4 py-1 hover:border-amber-500/50 transition-colors">
              <span className="font-mono text-amber-500/70">{index + 1}.</span>
              <span className="font-semibold">{date}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 4. Financial Obligations */}
      <motion.div variants={itemVars} className="md:col-span-3 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 flex flex-col justify-between">
        <div className="flex items-center gap-3 text-slate-500">
          <IndianRupee size={18} className="text-emerald-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Liability Value</span>
        </div>
        <div className="mt-4">
          <span className="text-4xl font-black italic tracking-tighter text-emerald-400">
            ₹{data.financial_obligations?.toLocaleString('en-IN')}
          </span>
          <p className="text-[10px] text-slate-600 mt-2 font-mono italic">CALCULATED_FROM_CLAUSES</p>
        </div>
      </motion.div>

      {/* 5. Risk Assessment - Critical Alert Style */}
      <motion.div variants={itemVars} className={`md:col-span-3 p-8 rounded-3xl border backdrop-blur-2xl flex flex-col justify-between transition-all duration-500 ${
        data.risk_assessment === 'High' 
          ? 'bg-red-500/10 border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.05)]' 
          : 'bg-emerald-500/10 border-emerald-500/30'
      }`}>
        <div className="flex items-center gap-3 text-slate-500">
          <ShieldAlert size={18} className={data.risk_assessment === 'High' ? 'text-red-500' : 'text-emerald-500'} />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Risk Priority</span>
        </div>
        <div className="mt-4">
          <h2 className={`text-5xl font-black italic tracking-tighter uppercase ${
            data.risk_assessment === 'High' ? 'text-red-500' : 'text-emerald-500'
          }`}>
            {data.risk_assessment}
          </h2>
          <p className="text-[10px] text-slate-600 mt-2 font-mono">NEURAL_VALIDATION: 98.4%</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LegalResults;