import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import FileUploader from '../components/Uploader/FileUploader';
import TerminalLog from "../components/Teminal/TerminalLog";
import LegalResults from '../components/Results/LegalResults';
import MomTestResults from '../components/Results/MomTestResults';
import SummaryResults from '../components/Results/SummaryResults';
import EmptyState from '../components/Results/EmptyState';
import ErrorDisplay from '../components/Results/ErrorDisplay';
import { AI_MODES } from '../constants/modes';
import NumerologyResults from '../components/Results/NumerologyResults';

const Dashboard = () => {
  const [activeMode, setActiveMode] = useState(AI_MODES.LEGAL.id);
  const [extractionData, setExtractionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const renderResults = () => {
    if (error) return <ErrorDisplay error={error} reset={() => setError(null)} />;
    if (!extractionData && !isLoading) return <EmptyState />;
    
    if (!extractionData && isLoading) return (
       <div className="h-full flex flex-col items-center justify-center space-y-4">
         <div className="w-12 h-12 border-4 border-stone-100 border-t-indigo-600 rounded-full animate-spin" />
         <p className="text-stone-400 font-bold text-[10px] uppercase tracking-widest">Processing Intelligence...</p>
       </div>
    );

    return (
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {(() => {
          switch (activeMode) {
            case 'legal': return <LegalResults data={extractionData} />;
            case 'mom_test': return <MomTestResults data={extractionData} />;
            case 'summary': return <SummaryResults data={extractionData} />;
            case 'numerology' : return <NumerologyResults data={extractionData} />;
            default: return <EmptyState />;
          }
        })()}
      </div>
    );
  };

  return (
    // 1. Set h-screen and overflow-hidden on the wrapper
    <div className="flex h-screen overflow-hidden bg-[#F8F8F7] text-stone-900 font-sans">
      <Sidebar currentMode={activeMode} onModeChange={(id) => {setActiveMode(id); setExtractionData(null); setError(null);}} />

      {/* 2. Main content area is a flex column that takes full height */}
      <main className="flex-1 flex flex-col h-full min-w-0">
        
        {/* Pinned Header */}
        <header className="px-10 py-6 border-b border-stone-200/60 bg-white/50 backdrop-blur-md flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">
              Advocacy<span className="text-indigo-600">OS</span>
            </h1>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1">
              Protocol: <span className="text-indigo-600">{activeMode.replace('_', ' ')}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <p className="text-[9px] font-bold text-stone-400 uppercase">Engine Status</p>
                <p className="text-[10px] font-mono text-emerald-600 font-bold tracking-tighter uppercase">Operational</p>
             </div>
             <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200" />
          </div>
        </header>

        {/* 3. The scrollable workspace area */}
        <div className="flex-1 overflow-hidden p-8">
          <div className="h-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Fixed (Doesn't scroll unless it overflows) */}
            <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
              <div className="bg-white border border-stone-200 p-6 rounded-[32px] shadow-sm shrink-0">
                <FileUploader 
                    mode={activeMode} 
                    setExtractionData={setExtractionData} 
                    setLoading={setIsLoading}
                    setError={setError} 
                />
              </div>
              <div className="flex-1 bg-white border border-stone-200 rounded-[32px] shadow-sm overflow-hidden flex flex-col min-h-[300px]">
                <div className="px-5 py-3 border-b border-stone-50 bg-stone-50/50 flex items-center justify-between shrink-0">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.2em]">Live Process Terminal</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-stone-100">
                    <TerminalLog loading={isLoading} />
                </div>
              </div>
            </div>

            {/* Right Column: This is where the Results live. It scrolls internally. */}
            <div className="lg:col-span-8 h-full flex flex-col">
              <div className="flex-1 bg-white border border-stone-200 rounded-[40px] shadow-sm overflow-hidden flex flex-col relative">
                {/* Decorative background grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
                
                {/* 4. THE MAGIC SCROLL BOX */}
                <div className="relative flex-1 overflow-y-auto p-10 custom-scrollbar scroll-smooth">
                    {renderResults()}
                </div>

                {/* Fixed Results Footer */}
                <div className="shrink-0 h-12 bg-stone-50/80 backdrop-blur-sm border-t border-stone-100 px-8 flex items-center justify-between">
                    <span className="text-[9px] font-bold text-stone-300 uppercase tracking-[0.3em]">Neural Analytics v2.0</span>
                    <div className="flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-stone-200" />
                        <div className="w-2 h-2 rounded-full bg-stone-200" />
                    </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;