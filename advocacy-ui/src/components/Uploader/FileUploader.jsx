import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FileUploader = ({ mode, setExtractionData, setLoading, setError }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [currentFileName, setCurrentFileName] = useState(null);

  const processFile = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      setError("Please upload a valid PDF document.");
      return;
    }

    setCurrentFileName(file.name);
    setLoading(true);
    setError(null);
    setExtractionData(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('mode', mode);

    try {
      const response = await axios.post(`http://127.0.0.1:8000/extract`, formData);
      setExtractionData(response.data);
    } catch (err) {
      console.error("Upload Error:", err);
      setError(err.response?.data?.detail || "Engine connection failed.");
      setCurrentFileName(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
    e.target.value = null; // Reset for re-uploads
  };

  // Drag and Drop Handlers
  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  return (
    <div className="w-full">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".pdf" 
      />

      <motion.div
        onClick={() => fileInputRef.current.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`relative cursor-pointer group rounded-3xl transition-all duration-500 overflow-hidden
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-50/50 shadow-inner' 
            : 'border-stone-200 bg-white hover:border-stone-300 hover:shadow-xl shadow-stone-200/50'
          } border-2 border-dashed p-10 flex flex-col items-center text-center`}
      >
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stone-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="mb-6 relative">
          <AnimatePresence mode="wait">
            {!currentFileName ? (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="w-20 h-20 rounded-2xl bg-stone-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:rotate-3 transition-all duration-500"
              >
                <Upload className="w-8 h-8 text-stone-400 group-hover:text-indigo-500 transition-colors" />
              </motion.div>
            ) : (
              <motion.div 
                key="active"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200"
              >
                <FileText className="w-8 h-8 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Status Indicator Dot */}
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center
            ${currentFileName ? 'bg-emerald-500' : 'bg-stone-200'}`}>
            {currentFileName && <CheckCircle2 size={12} className="text-white" />}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-stone-800 tracking-tight">
            {currentFileName ? currentFileName : 'Drop your document here'}
          </h3>
          <p className="text-[11px] text-stone-400 font-medium uppercase tracking-widest leading-relaxed">
            {isDragging ? 'Release to upload' : 'PDF files only up to 10MB'}
          </p>
        </div>

        {/* Progress Overlay (Active when loading) */}
        <AnimatePresence>
          {isDragging && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-indigo-600/5 backdrop-blur-[2px] flex items-center justify-center border-2 border-indigo-500 rounded-3xl"
            >
              <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-indigo-100 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-tighter">Ready for link</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Helpful Hint */}
      <div className="mt-4 flex items-center justify-center gap-4 px-2">
        
        <div className="w-px h-3 bg-stone-200" />
        <div className="flex items-center gap-1.5">
           <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter underline decoration-stone-200 underline-offset-4">Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;