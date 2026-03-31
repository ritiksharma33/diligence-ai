import React, { useState, useRef } from 'react';
import { Upload, ShieldAlert, Calendar, DollarSign, Users, Terminal, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const LegalExtractor = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [data, setData] = useState(null);
  const fileInputRef = useRef(null); // Reference to the hidden file input

  // Function to trigger the hidden file input
  const onZoneClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Reset data and start loading
    setData(null);
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Ensure this matches your FastAPI port
      const response = await axios.post('http://127.0.0.1:8000/extract', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setData(response.data);
    } catch (error) {
      console.error("Extraction failed:", error);
      alert(error.response?.data?.detail || "Backend connection failed. Is FastAPI running?");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 p-8 font-sans selection:bg-cyan-500/30">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            ADVOCACY OS // <span className="font-mono text-xl opacity-50">EXTRACTOR_v1</span>
          </h1>
          <p className="text-slate-500 mt-2 italic">Refining raw legalese into structured insights.</p>
        </div>
        <div className="text-right font-mono text-[10px] text-emerald-500/70 hidden md:block">
          UPLOADER_STATUS: READY <br />
          LOC: NEW_DELHI_IN
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Control Panel */}
        <section className="lg:col-span-1 space-y-6">
          {/* Invisible File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            className="hidden" 
            accept=".pdf"
          />

          {/* The Upload Zone */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onZoneClick}
            className={`cursor-pointer border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all bg-white/5 backdrop-blur-xl ${
              isUploading ? 'border-blue-500/50 animate-pulse' : 'border-white/10 hover:border-emerald-500/40'
            }`}
          >
            <Upload className={`w-12 h-12 mb-4 ${isUploading ? 'text-blue-400' : 'text-slate-400'}`} />
            <p className="text-sm font-semibold uppercase tracking-widest">
              {isUploading ? 'Analyzing...' : 'Upload Contract'}
            </p>
            <p className="text-[10px] text-slate-500 mt-2 font-mono">PDF_ONLY // MAX_5_PAGES</p>
          </motion.div>

          {/* Terminal View */}
          <div className="bg-black/60 border border-white/5 rounded-2xl p-5 font-mono text-[11px] h-56 overflow-y-auto shadow-2xl">
            <div className="text-emerald-500 flex items-center gap-2 mb-2">
              <Terminal size={14}/> SYSTEM_LOG
            </div>
            <div className="text-slate-500 leading-relaxed">
              [0.00] IDLE: Awaiting input... <br />
              {isUploading && (
                <div className="text-blue-400">
                  [1.42] UPLOAD_SUCCESSFUL <br />
                  [2.15] GEMINI_LLM_REQUEST_SENT <br />
                  [3.01] PARSING_LEGAL_ENTITY... <br />
                  [4.88] CALCULATING_RISK_SCORE...
                </div>
              )}
              {data && <div className="text-emerald-400 mt-1">[OK] EXTRACTION_COMPLETE</div>}
            </div>
          </div>
        </section>

        {/* Right: Intelligence Display */}
        <section className="lg:col-span-2">
          {data ? (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Summary */}
              <div className="md:col-span-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6">
                <div className="flex items-center gap-2 text-slate-500 mb-3">
                  <FileText size={16} />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Executive Summary</span>
                </div>
                <p className="text-slate-200 leading-relaxed">{data.summary}</p>
              </div>

              {/* Individual Insight Cards */}
              <Card icon={<Users className="text-blue-400"/>} title="Parties Involved" value={data.parties.join(', ')} />
              <Card icon={<Calendar className="text-emerald-400"/>} title="Key Deadlines" value={data.deadlines.join(' | ')} />
              <Card icon={<DollarSign className="text-amber-400"/>} title="Financial Liability" value={`₹${data.financial_obligations.toLocaleString()}`} />
              
              {/* Risk Status */}
              <div className={`p-6 rounded-2xl border backdrop-blur-md flex flex-col justify-center ${
                data.risk_assessment === 'High' ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'
              }`}>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-bold">Risk Assessment</span>
                <div className={`text-3xl font-black italic tracking-tighter ${
                  data.risk_assessment === 'High' ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {data.risk_assessment.toUpperCase()}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-white/5 rounded-3xl bg-white/[0.01] text-center p-8">
              <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-4 text-slate-700">
                <FileText size={32} />
              </div>
              <p className="text-slate-600 font-mono text-sm max-w-xs">
                {isUploading ? "Processing Neural Engine..." : "No Document Active. System Ready for Ingestion."}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const Card = ({ icon, title, value }) => (
  <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/10 transition-all group">
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold group-hover:text-slate-300">{title}</h3>
    </div>
    <p className="text-sm font-mono text-slate-300 break-words">{value || "None Identified"}</p>
  </div>
);

export default LegalExtractor;