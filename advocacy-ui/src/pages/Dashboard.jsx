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
  //this is setting the default value of toggle mode
  const [activeMode, setActiveMode] = useState(AI_MODES.LEGAL.id);
  const [extractionData, setExtractionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Added error state

  // The "Dispatcher" - Decides what UI to show based on state
  const renderResults = () => {
    //this function return result at the end 
    if (error) return <ErrorDisplay error={error} reset={() => setError(null)} />;
    if (!extractionData && !isLoading) return <EmptyState />;
    //agar null nhi hai and loading hai true to ye show karna hai
    if (!extractionData && isLoading) return (
       <div className="h-full flex items-center justify-center text-stone-400 italic animate-pulse">
         Extracting intelligence...
       </div>
    );
    //switch decides which page to show accrding to the toggle mode selected by user and each page has its own way of showing the data based on the type of data 
    switch (activeMode) {
      //switiching to the diffrent pages based on the toggle mode selected by user
      //and each page has its own way of showing the data based on the type of data
      //we are passing the json data as the prop to each page 
      //adn they will show render the data according to their design
      case 'legal': return <LegalResults data={extractionData} />;
      case 'mom_test': return <MomTestResults data={extractionData} />;
      case 'summary': return <SummaryResults data={extractionData} />;
      case 'numerology' : return <NumerologyResults data={extractionData} />;
      default: return <EmptyState />;
    }
  };

  // Helper to change modes and clear old data
  const handleModeChange = (modeId) => {
    setActiveMode(modeId);
    setExtractionData(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen text-stone-800">
      {/* Sidebar for Toggles */}
      <Sidebar 
      //we are passing the two props to. the sidebar component. currentMode tells the sidebar which toggle is currently active so it can highlight it, and onModeChange is a function that the sidebar will call when the user clicks a toggle, allowing the sidebar to communicate back to the Dashboard
        currentMode={activeMode} 
        //this is function defined above 
        onModeChange={handleModeChange} 
      />

      {/* Main Workspace */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="border-b border-stone-200/50 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-stone-800">Advocacy OS <span className="text-stone-300">|</span> <span className="font-light text-stone-500">Engine</span></h1>
            <p className="text-stone-500 mt-2 font-medium">
              Currently Operating in: <span className="text-orange-500 uppercase tracking-widest text-xs font-bold">{activeMode}</span>
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (Upload & Logs) */}
            <div className="lg:col-span-4 space-y-6">
              <FileUploader 
              //we are passing three props to the file uploader. mode tells the uploader which mode is currently active so it can send that info to the backend when uploading, setExtractionData and setLoading are functions that the uploader will call to update the Dashboard's state based on the response from the backend, allowing the uploader to communicate results back to the Dashboard
                mode={activeMode} 
                setExtractionData={setExtractionData} 
                setLoading={setIsLoading}
                setError={setError} // Pass setError so uploader can trigger it
                //now we have the response data in the dashboard component in the extractionData state variable 
              />
              {/* terminal log is just a loading prop is passed  */}
               <TerminalLog loading={isLoading} />
            </div>

            {/* Right Column (Dynamic Results) */}
            <div className="lg:col-span-8">
              {renderResults()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;