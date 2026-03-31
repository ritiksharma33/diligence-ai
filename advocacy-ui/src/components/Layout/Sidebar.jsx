import React from 'react';
import { AI_MODES } from '../../constants/modes';
import { Shield, Lightbulb, FileText } from 'lucide-react';

const Sidebar = ({ currentMode, onModeChange }) => {
  return (
    <aside className="w-72 border-r border-stone-200/60 bg-white/40 backdrop-blur-2xl p-8 flex flex-col gap-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="font-black text-2xl italic tracking-tighter text-stone-800">
        ADVOCACY<span className="text-stone-400 font-light">_OS</span>
      </div>
      
      <nav className="space-y-3">
        {Object.values(AI_MODES).map((mode) => {
          const isActive = currentMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-sm font-semibold ${
                isActive 
                ? 'bg-orange-500/10 border-orange-500/30 text-orange-600 shadow-[0_4px_20px_rgba(249,115,22,0.1)]' 
                : 'bg-transparent border-transparent text-stone-500 hover:bg-stone-100/50 hover:text-stone-800'
              }`}
            >
              {mode.id === 'legal' && <Shield size={18}/>}
              {mode.id === 'mom_test' && <Lightbulb size={18}/>}
              {mode.id === 'summary' && <FileText size={18}/>}
              {mode.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-stone-200/60 pt-6">
        <div className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Node Identity</div>
        <div className="text-xs text-stone-500 mt-1 font-mono">RITIK_CSE_JNU</div>
      </div>
    </aside>
  );
};

export default Sidebar;