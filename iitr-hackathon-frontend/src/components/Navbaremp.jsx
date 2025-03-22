import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DiamondIcon from '@mui/icons-material/Diamond';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbaremp() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="navbar h-16 flex items-center justify-between px-8 bg-neutral-900 border-b border-stone-800">
      {/* Left Section */}
      <div className="flex items-center gap-8">
        <div 
          className="text-2xl font-bold text-white cursor-pointer hover:text-green-500"
          onClick={() => navigate('/employee')}
        >
          FreeWork
        </div>
        
        <div className="flex items-center gap-6 text-gray-300">
          <div className="flex items-center gap-1 cursor-pointer hover:text-green-500">
            Hire talent
            <ExpandMoreIcon />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-green-500">
            Manage work
            <ExpandMoreIcon />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-green-500">
            Reports
            <ExpandMoreIcon />
          </div>
          <div 
            className="cursor-pointer hover:text-green-500"
            onClick={() => navigate('/messages')}
          >
            Messages
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <SearchIcon className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-64 pl-10 pr-4 py-2 border border-stone-700 rounded-full bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
          />
          <div className="absolute right-3 flex items-center">
            <select
              className="bg-transparent text-white text-sm focus:outline-none cursor-pointer"
              defaultValue="talent"
            >
              <option value="talent" className="bg-neutral-800">Talent</option>
              <option value="projects" className="bg-neutral-800">Projects</option>
              <option value="jobs" className="bg-neutral-800">Jobs</option>
            </select>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-gray-300">
          <HelpOutlineIcon 
            className="cursor-pointer hover:text-green-500"
            onClick={() => navigate('/help/employee')}
          />
          <div 
            className="cursor-pointer hover:text-green-500"
            onClick={() => navigate('/notifs/employee')}
          >
            <NotificationsNoneIcon />
          </div>
          <div className="relative">
            <div 
              className="cursor-pointer flex items-center gap-2"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img
                className="w-8 h-8 rounded-full"
                src="https://www.upwork.com/profile-portraits/c1SlS59i7ragOdNjdCc_j3C256FkzyjOcxd7oDHMEDKy5yLv8l7q0OlDoSgxPbfAo6"
                alt="Profile"
              />
              <ExpandMoreIcon className="text-gray-300" />
            </div>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 z-50">
                {/* User Info */}
                <div className="px-4 py-3 border-b">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://www.upwork.com/profile-portraits/c1SlS59i7ragOdNjdCc_j3C256FkzyjOcxd7oDHMEDKy5yLv8l7q0OlDoSgxPbfAo6"
                      alt="Profile"
                    />
                    <div>
                      <div className="text-black font-medium">Priyansh Bansal</div>
                      <div className="text-gray-500 text-sm">Client</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-gray-600">Online for messages</span>
                    <div className="w-12 h-6 bg-green-500 rounded-full"></div>
                  </div>
                </div>

                {/* Business Plus Upgrade */}
                <div className="px-4 py-3 border-b bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <DiamondIcon className="text-gray-700" />
                    <div>
                      <div className="text-black font-medium">Try Business Plus</div>
                      <div className="text-gray-500 text-sm">
                        Hire the best every time.<br />
                        Upgrade with no up-front costs.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                    <CardMembershipIcon className="text-gray-600" />
                    <span className="text-gray-700">Membership plan</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                    <PersonAddIcon className="text-gray-600" />
                    <span className="text-gray-700">Invite a coworker</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                    <LightModeIcon className="text-gray-600" />
                    <span className="text-gray-700">Theme: Light</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
                    <SettingsIcon className="text-gray-600" />
                    <span className="text-gray-700">Account settings</span>
                  </div>
                </div>

                {/* Logout */}
                <div className="border-t">
                  <div 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                    onClick={() => {
                      navigate('/login');
                      setShowProfileMenu(false);
                    }}
                  >
                    <LogoutIcon className="text-gray-600" />
                    <span className="text-gray-700">Log out</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbaremp;
