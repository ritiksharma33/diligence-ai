import React, { useRef } from 'react';
import axios from 'axios';
import { Upload } from 'lucide-react';

//it recives four prop data currenlty they are null only mode have a default value of legal
const FileUploader = ({ mode, setExtractionData, setLoading, setError }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset states for a fresh upload
    setLoading(true);
    setError(null); 
    setExtractionData(null);

    const formData = new FormData();
    formData.append('file', file);
    // Send the current mode to the backend so it knows which AI Ex pert to use
    formData.append('mode', mode); 
//posting the data on the /extract endpoint which form data have file and mode info 
    try {
      const response = await axios.post(`http://127.0.0.1:8000/extract`, formData);
      // Set the extraction data in the parent componentchaneg it to the response data
      setExtractionData(response.data);
    } catch (err) {
      console.error("Neural Link Failure:", err);
      // Pass the error message to the Dashboard to trigger the ErrorDisplay component
      setError(err.response?.data?.detail || "Connection to the Engine failed.");
    } finally {
      setLoading(false);
      // Clear the input so the user can upload the same file again if they want
      e.target.value = null; 
    }
  };

  return (
    <div 
      onClick={() => fileInputRef.current.click()}
      className="glass-card cursor-pointer flex flex-col items-center justify-center p-12 border-2 border-dashed border-stone-300 hover:border-orange-400/50 transition-all duration-300 group"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".pdf" 
      />
      <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4 group-hover:bg-orange-50 group-hover:scale-105 transition-all">
        <Upload className="w-8 h-8 text-stone-400 group-hover:text-orange-500 transition-colors" />
      </div>
      <span className="text-xs font-mono uppercase tracking-[0.3em] text-stone-600 font-semibold">
        Ingest PDF Document
      </span>
      <span className="text-[10px] text-stone-400 mt-2 font-mono">Secure Local Processing</span>
    </div>
  );
};

export default FileUploader;