import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, ArrowRightCircle, AlertCircle } from 'lucide-react';

const MomTestResults = ({ data }) => {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <motion.div 
      variants={container} initial="hidden" animate="show"
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Market Score - Gauge Style */}
      <div className="cosmic-card md:col-span-1 flex flex-col items-center justify-center border-amber-500/20">
        <Target className="text-amber-400 mb-2" size={24} />
        <div className="text-4xl font-black text-amber-400 italic tracking-tighter">
          {data.market_score || 0}/10
        </div>
        <span className="terminal-text text-slate-500 uppercase mt-2">Market Potential Score</span>
      </div>

      {/* Mom Test Critique */}
      <div className="cosmic-card md:col-span-1">
        <div className="flex items-center gap-2 mb-4 text-amber-500">
          <AlertCircle size={18} />
          <span className="terminal-text font-bold uppercase">Mom Test Critique</span>
        </div>
        <p className="text-sm italic text-slate-400 leading-relaxed">
          "{data.mom_test_critique}"
        </p>
      </div>

      {/* Next Actions List */}
      <div className="cosmic-card md:col-span-2">
        <div className="flex items-center gap-2 mb-4 text-blue-400">
          <ArrowRightCircle size={18} />
          <span className="terminal-text font-bold uppercase">Deployment Strategy</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {data.first_three_steps?.map((step, index) => (
            <div key={index} className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <span className="text-[10px] text-slate-600 font-mono block mb-1">0{index + 1}</span>
              <p className="text-xs font-medium text-slate-300">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MomTestResults;