import React from "react";
import HighPriorityIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from "./Navbar";

const Notifsemp = () => {
  return (
    <div className="notifications-page bg-neutral-900 min-h-screen">
      <Navbar />
      
      
      <div className="bg-[#FFF8E7] text-black p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <HighPriorityIcon className="text-black" />
          <p>As part of our continued efforts to remain compliant with tax laws globally, please enter your Tax Identification Number 
            <span className="underline cursor-pointer ml-1">here</span>.
          </p>
        </div>
        <CloseIcon className="cursor-pointer" />
      </div>

      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-white text-4xl font-semibold mb-12">Notifications</h1>

        
        <div className="bg-neutral-800 rounded-lg p-12 flex flex-col items-center justify-center min-h-[400px]">
          <div className="mb-6">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <g transform="scale(2.5)">
                <path d="M16 8c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z" fill="#5E6D55"/>
                <path d="M12 8c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#9AAA97"/>
              </g>
            </svg>
          </div>
          <h2 className="text-white text-2xl mb-2">You don't have any notifications</h2>
          <p className="text-neutral-400 text-center">
            When you have notifications, you'll see them here
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notifsemp;
