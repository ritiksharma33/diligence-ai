import React from 'react';
import { ShieldX, RotateCcw } from 'lucide-react';

const ErrorDisplay = ({ error, reset }) => {
  const isRateLimit = error?.includes('429');

  return (
    <div className="cosmic-card border-red-500/20 bg-red-500/5 flex flex-col items-center justify-center p-10 text-center animate-in fade-in zoom-in duration-300">
      <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-4 border border-red-500/20">
        <ShieldX className="text-red-500" size={32} />
      </div>
      
      <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-red-400 mb-2">
        {isRateLimit ? "Quota Depleted" : "Neural Link Severed"}
      </h2>
      
      <p className="text-xs text-slate-500 max-w-sm mb-6 leading-relaxed">
        {isRateLimit 
          ? "The AI Engine is currently processing too many requests. Please wait 60 seconds for the cooldown." 
          : "An unexpected error occurred during document parsing. Ensure the PDF is not encrypted."}
      </p>

      <button 
        onClick={reset}
        className="flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-slate-300"
      >
        <RotateCcw size={12} /> Re-Initialize Link
      </button>
    </div>
  );
};

export default ErrorDisplay;