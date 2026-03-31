import React from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

const TerminalLog = ({ loading }) => {
  return (
    <div className="glass-card font-mono text-[11px] h-64 overflow-hidden flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      {/* Header */}
      <div className="flex items-center gap-2 text-stone-600 font-bold mb-4 border-b border-stone-200/60 pb-3 uppercase tracking-widest">
        <TerminalIcon size={14} className="text-orange-500" /> 
        <span>Active_Kernel_Log</span>
      </div>
      
      {/* Log Entries */}
      <div className="space-y-2 text-stone-500 overflow-y-auto flex-1 pr-2">
        <p className="flex gap-3">
          <span className="text-stone-400">[0.00]</span> 
          SYSTEM_BOOT: OK
        </p>
        <p className="flex gap-3">
          <span className="text-stone-400">[0.05]</span> 
          ENGINE_STATUS: READY
        </p>
        
        {loading && (
          <div className="text-orange-600 animate-pulse space-y-2 mt-2 font-medium">
            <p className="flex gap-3">
              <span className="text-orange-400/70">[1.22]</span> 
              STREAMING_DATA_TO_GEMINI...
            </p>
            <p className="flex gap-3">
              <span className="text-orange-400/70">[2.45]</span> 
              RUNNING_STRUCTURAL_PARSING...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalLog;