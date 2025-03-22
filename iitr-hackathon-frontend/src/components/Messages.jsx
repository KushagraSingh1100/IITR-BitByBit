import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import SafetyPopup from "./SafetyPopup";
import msgicon from "../assets/message-icon.png";

function Messages() {
  const [showSafetyPopup, setShowSafetyPopup] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Show Safety Popup on first load */}
      {showSafetyPopup && (
        <SafetyPopup onConfirm={() => setShowSafetyPopup(false)} />
      )}

      {/* Messages Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Messages</h1>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages"
              className="w-64 pl-10 pr-4 py-2 bg-neutral-800 border border-stone-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <TuneIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-32 h-32 mb-6">
            <img
              src={msgicon}
              alt="Welcome to Messages"
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Welcome to Messages
          </h2>
          <p className="text-gray-400 text-center max-w-md">
            Once you connect with a client, you'll be able to chat and
            collaborate here
          </p>
          <button
            className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium"
            onClick={() => navigate("/jobs")}
          >
            Search for jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Messages;
