import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, ShieldAlert, FileText, IndianRupee, ArrowRight } from 'lucide-react';

const LegalResults = ({ data }) => {
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  if (!data) return null;

  return (
    <motion.div 
      variants={containerVars} 
      initial="hidden" 
      animate="show"
      className="grid grid-cols-1 md:grid-cols-6 gap-4" // Reduced gap from 6 to 4
    >
      {/* 1. Executive Summary - Compressed Padding */}
      <motion.div variants={itemVars} className="md:col-span-6 bg-white border border-stone-200 rounded-2xl p-5 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/20 group-hover:bg-indigo-500 transition-all" />
        <div className="flex items-center gap-2 text-stone-400 mb-3">
          <FileText size={14} className="text-indigo-600" />
          <span className="font-bold text-[9px] uppercase tracking-widest">Intelligence Abstract</span>
        </div>
        <p className="text-base text-stone-800 leading-snug font-semibold tracking-tight">
          {data.summary}
        </p>
      </motion.div>

      {/* 2. Legal Entities - Tightened Pills */}
      <motion.div variants={itemVars} className="md:col-span-3 bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 text-stone-400 mb-4">
          <Users size={14} className="text-stone-600" />
          <span className="font-bold text-[9px] uppercase tracking-widest">Parties</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {data.parties?.map((party, index) => (
            <div key={index} className="flex items-center gap-1.5 px-3 py-1 bg-stone-50 border border-stone-100 rounded-lg">
              <div className="w-1 h-1 rounded-full bg-indigo-400" />
              <span className="text-[11px] font-bold text-stone-700">{party}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3. Deadlines - Compact Timeline */}
      <motion.div variants={itemVars} className="md:col-span-3 bg-white border border-stone-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 text-stone-400 mb-4">
          <Calendar size={14} className="text-stone-600" />
          <span className="font-bold text-[9px] uppercase tracking-widest">Timeline</span>
        </div>
        <div className="space-y-3">
          {data.deadlines?.map((date, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-[9px] font-mono text-indigo-500 bg-indigo-50 w-5 h-5 flex items-center justify-center rounded-md font-bold">
                {index + 1}
              </span>
              <span className="text-xs font-bold text-stone-800 tracking-tight">{date}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 4. Financial Obligations - Compact Dark Card */}
      <motion.div variants={itemVars} className="md:col-span-3 bg-stone-900 rounded-2xl p-6 flex flex-col justify-center shadow-lg relative overflow-hidden min-h-[120px]">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px]" />
        <div className="relative flex items-center gap-2 text-stone-500 mb-2">
          <IndianRupee size={14} className="text-indigo-400" />
          <span className="font-bold text-[9px] uppercase tracking-widest">Liability</span>
        </div>
        <div className="relative">
          <span className="text-4xl font-bold tracking-tighter text-white">
            ₹{data.financial_obligations?.toLocaleString('en-IN')}
          </span>
        </div>
      </motion.div>

      {/* 5. Risk Assessment - Compact Status */}
      <motion.div variants={itemVars} className={`md:col-span-3 p-6 rounded-2xl border-2 flex flex-col justify-center transition-all min-h-[120px] ${
        data.risk_assessment === 'High' ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert size={14} className={data.risk_assessment === 'High' ? 'text-red-600' : 'text-emerald-600'} />
          <span className={`font-bold text-[9px] uppercase tracking-widest ${data.risk_assessment === 'High' ? 'text-red-600' : 'text-emerald-600'}`}>
            Risk Level
          </span>
        </div>
        <h2 className={`text-4xl font-black tracking-tighter uppercase ${
          data.risk_assessment === 'High' ? 'text-red-600' : 'text-emerald-600'
        }`}>
          {data.risk_assessment}
        </h2>
      </motion.div>
    </motion.div>
  );
};

export default LegalResults;