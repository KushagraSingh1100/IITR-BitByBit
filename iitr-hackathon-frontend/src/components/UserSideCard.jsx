import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function UserSideCard() {
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const profileCompletion = 40; // This would come from your backend in a real app

  return (
    <div className="flex flex-col gap-4 p-5 user-side-card w-[25%] h-fit border border-neutral-600 rounded-2xl bg-stone-900">
      {/* Profile Section */}
      <div className="side-profile flex items-center gap-4">
        <img
          className="w-12 h-12 rounded-full"
          src={
            "https://www.upwork.com/profile-portraits/c1SlS59i7ragOdNjdCc_j3C256FkzyjOcxd7oDHMEDKy5yLv8l7q0OlDoSgxPbfAo6"
          }
          alt="Profile"
        />
        <div className="side-profile-heading">
          <h1 className="text-lg font-medium text-white underline underline-offset-2">
            {user.displayName || "Kushagra S."}
          </h1>
          <p className="text-sm text-white">Web Developer | Java...</p>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="flex flex-col gap-1">
        <a href="#" className="text-green-500 text-sm hover:underline">
          Current Job Progress
        </a>
        <div className="w-full bg-neutral-700 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${profileCompletion}%` }}
          />
        </div>
        <span className="text-sm text-neutral-400">{profileCompletion}%</span>
      </div>

      {/* Promotion Section */}
      <div className="border-t border-neutral-700 pt-4">
        <button className="w-full flex items-center justify-between text-white py-2">
          <span>Promote with ads</span>
          <ExpandMoreIcon />
        </button>
      </div>

      {/* Availability Badge */}
      <div className="border-t border-neutral-700 pt-4">
        <button className="w-full flex items-center justify-between text-white py-2">
          <span>Availability badge</span>
          <EditIcon />
        </button>
        <span className="text-sm text-neutral-400">Off</span>
      </div>

      {/* Boost Profile */}
      <div className="border-t border-neutral-700 pt-4">
        <button className="w-full flex items-center justify-between text-white py-2">
          <span>Boost your profile</span>
          <EditIcon />
        </button>
        <span className="text-sm text-neutral-400">Off</span>
      </div>

      {/* Connects */}
      <div className="border-t border-neutral-700 pt-4">
        <div className="flex items-center justify-between text-white">
          <span>Milestones Completed: 0</span>
          <ExpandMoreIcon />
        </div>
        <div className="flex gap-2 mt-2">
          <a href="#" className="text-sm text-green-500 hover:underline">
            View details
          </a>
        </div>
      </div>

      {/* Preferences */}
      <div className="border-t border-neutral-700 pt-4">
        <button className="w-full flex items-center justify-between text-white py-2">
          <span>Preferences</span>
          <ExpandMoreIcon />
        </button>
      </div>
    </div>
  );
}

export default UserSideCard;