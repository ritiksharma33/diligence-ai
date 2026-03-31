import React from 'react';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App selection:bg-orange-200">
      {/* Soft, Warm Background Glow Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-orange-100/60 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-rose-100/50 blur-[120px] rounded-full" />
      </div>
      
      {/* Make sure Dashboard sits above the background */}
      <div className="relative z-10">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;