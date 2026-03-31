import React from 'react';
import { AI_MODES } from '../../constants/modes';
import { Shield, Lightbulb, FileText, Sparkles, Command, Scale, Target, Archive } from 'lucide-react';

const Sidebar = ({ currentMode, onModeChange }) => {
  return (
    <aside className="w-72 border-r border-stone-200 bg-stone-50/50 backdrop-blur-xl p-6 flex flex-col h-screen sticky top-0">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-2 mb-12">
        <div className="bg-orange-600 p-2 rounded-xl shadow-lg shadow-orange-200">
          <Command size={20} className="text-white" />
        </div>
        <div className="font-bold text-xl tracking-tight text-stone-900">
          Advocacy<span className="text-orange-600">OS</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1.5">
        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-4 mb-4">Analysis Suites</p>
        {Object.values(AI_MODES).map((mode) => {
          const isActive = currentMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                ? 'bg-white border-stone-200 shadow-sm text-stone-900 ring-1 ring-stone-200/50' 
                : 'text-stone-500 hover:bg-stone-200/50 hover:text-stone-900'
              }`}
            >
              <div className={`transition-colors ${isActive ? 'text-orange-600' : 'group-hover:text-stone-700'}`}>
                {mode.id === 'legal' && <Shield size={18} strokeWidth={2.5}/>}
                {mode.id === 'mom_test' && <Lightbulb size={18} strokeWidth={2.5}/>}
                {mode.id === 'summary' && <FileText size={18} strokeWidth={2.5}/>}
                {mode.id === 'numerology' && <Sparkles size={18} strokeWidth={2.5}/>}
                {/* New Advocacy OS Icons */}
  {mode.id === 'compliance' && <Scale size={18} strokeWidth={2.5}/>}
  {mode.id === 'strategy' && <Target size={18} strokeWidth={2.5}/>}
  {mode.id === 'vault' && <Archive size={18} strokeWidth={2.5}/>}
              </div>
              <span className="text-sm font-semibold tracking-tight">{mode.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-600" />}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto p-4 bg-stone-200/40 rounded-2xl border border-stone-200/50">
        <div className="text-[10px] text-stone-400 uppercase tracking-widest font-black"></div>
        <div className="text-xs text-stone-700 mt-1 font-mono flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          RITIK_Sharma | Connected
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;