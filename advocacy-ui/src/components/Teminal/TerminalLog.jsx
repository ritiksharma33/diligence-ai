import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Loader2, Zap, Search, ShieldCheck, FileSearch } from 'lucide-react';

const ProcessEngine = ({ loading, hasData }) => {
  const stages = [
    { id: 'ingest', label: 'Ingestion', icon: <Zap size={12} /> },
    { id: 'ocr', label: 'Neural Parsing', icon: <Search size={12} /> },
    { id: 'entity', label: 'Entities', icon: <FileSearch size={12} /> },
    { id: 'risk', label: 'Risk Synthesis', icon: <ShieldCheck size={12} /> },
  ];

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col min-h-[260px]">
      {/* Tightened Header */}
      <div className="px-5 py-3 border-b border-stone-50 bg-stone-50/50 flex items-center justify-between">
        <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">Pipeline Status</span>
        {loading && (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 rounded-md">
            <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[8px] font-bold text-indigo-600 uppercase">Active</span>
          </div>
        )}
      </div>

      {/* Steps List - Reduced padding and spacing */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {stages.map((stage, index) => {
            // Updated Logic:
            // 1. isComplete: Data exists and we aren't loading, or we are loading and this step is already past.
            const isComplete = hasData && !loading; 
            const isActive = loading && index === Math.min(index, 1); // Mocking active state for UI
            const isPending = !hasData && !loading;

            return (
              <div key={stage.id} className="flex items-center gap-3 relative">
                {/* Connecting Line (shorter) */}
                {index !== stages.length - 1 && (
                  <div className={`absolute left-[9px] top-5 w-0.5 h-4 ${isComplete ? 'bg-indigo-500' : 'bg-stone-100'}`} />
                )}

                <div className="relative z-10">
                  {isComplete ? (
                    <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <CheckCircle2 size={12} />
                    </div>
                  ) : isActive ? (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
                      <Loader2 size={12} className="animate-spin" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-200">
                      <Circle size={6} fill="currentColor" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col min-w-0">
                  <span className={`text-[11px] font-bold tracking-tight truncate ${
                    isPending ? 'text-stone-300' : isComplete ? 'text-stone-800' : 'text-indigo-600'
                  }`}>
                    {stage.label}
                  </span>
                </div>

                <div className={`ml-auto ${isActive ? 'text-indigo-400' : 'text-stone-100'}`}>
                  {stage.icon}
                </div>
              </div>
            );
          })}
        </div>

        {/* Compressed Status Indicator */}
        <div className="mt-4 pt-4 border-t border-stone-50">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[8px] font-bold text-stone-400 uppercase tracking-widest">Process Load</span>
            <span className="text-[9px] font-mono font-bold text-indigo-600">{loading ? '74%' : hasData ? '100%' : '0%'}</span>
          </div>
          <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: loading ? '74%' : hasData ? '100%' : '0%' }}
              className="h-full bg-indigo-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessEngine;