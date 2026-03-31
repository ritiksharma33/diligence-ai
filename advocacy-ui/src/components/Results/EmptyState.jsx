import React from 'react';
import { motion } from 'framer-motion';
import { Atom } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="h-full min-h-[450px] flex flex-col items-center justify-center text-center p-8 border border-white/5 rounded-[2.5rem] bg-white/[0.01] relative overflow-hidden">
      {/* Animated Background Pulse */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full"
      />
      
      <div className="relative z-10">
        <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center mb-6 mx-auto bg-black/40">
          <Atom className="text-slate-700 animate-spin-slow" size={32} />
        </div>
        <h3 className="text-lg font-bold tracking-widest text-slate-400 uppercase">Neural Link Idle</h3>
        <p className="text-xs text-slate-600 font-mono mt-3 max-w-xs leading-relaxed">
          Select a protocol from the sidebar and upload a PDF to begin structural decomposition.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;