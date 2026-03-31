import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ListChecks, Quote } from 'lucide-react';

const SummaryResults = ({ data }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* TL;DR Header */}
      <div className="cosmic-card border-blue-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10"><Zap size={40} /></div>
        <div className="flex items-center gap-2 mb-4 text-blue-400">
          <Quote size={16} />
          <span className="terminal-text font-bold uppercase tracking-widest">The "TL;DR"</span>
        </div>
        <p className="text-xl font-medium text-slate-200 leading-relaxed italic">
          "{data.summary || "No summary generated."}"
        </p>
      </div>

      {/* Key Takeaways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.key_points?.map((point, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/5 p-5 rounded-2xl hover:border-blue-500/30 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mb-3">
              <span className="text-[10px] font-mono text-blue-400">{i + 1}</span>
            </div>
            <p className="text-xs text-slate-400 leading-loose">{point}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SummaryResults;