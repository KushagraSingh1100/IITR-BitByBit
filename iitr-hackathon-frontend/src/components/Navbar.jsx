import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import AppsIcon from '@mui/icons-material/Apps';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function Navbar() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="navbar h-16 flex items-center justify-between px-8 bg-neutral-900 border-b border-stone-800">
      {/* Left Section */}
      <div className="flex items-center gap-8">
        <div 
          className="text-2xl font-bold text-white cursor-pointer hover:text-green-500"
          onClick={() => navigate('/')}
        >
          FreeWork
        </div>
        
        <div className="flex items-center gap-6 text-gray-300">
          <div className="flex items-center gap-1 cursor-pointer hover:text-green-500">
            Find Work
            <ExpandMoreIcon />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-green-500">
            Deliver Work
            <ExpandMoreIcon />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-green-500">
            Manage Finances
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
              defaultValue="jobs"
            >
              <option value="jobs" className="bg-neutral-800">Jobs</option>
              <option value="projects" className="bg-neutral-800">Projects</option>
            </select>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 text-gray-300">
          <HelpOutlineIcon 
            className="cursor-pointer hover:text-green-500"
            onClick={() => navigate('/help')}
          />
          <div 
            className="cursor-pointer hover:text-green-500"
            onClick={() => navigate('/notifs')}
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
              <div className="absolute right-0 mt-2 w-64 bg-neutral-900 rounded-lg shadow-lg py-2 z-50 border border-stone-800">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-stone-800">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://www.upwork.com/profile-portraits/c1SlS59i7ragOdNjdCc_j3C256FkzyjOcxd7oDHMEDKy5yLv8l7q0OlDoSgxPbfAo6"
                      alt="Profile"
                    />
                    <div>
                      <div className="text-white font-medium">Priyansh Bansal</div>
                      <div className="text-gray-400">Freelancer</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-gray-400">Online for messages</span>
                    <div className="w-12 h-6 bg-green-500 rounded-full"></div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <div className="px-4 py-2 hover:bg-neutral-800 cursor-pointer flex items-center gap-3 text-gray-300">
                    <PersonOutlineIcon />
                    <span>Your profile</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-neutral-800 cursor-pointer flex items-center gap-3 text-gray-300">
                    <ShowChartIcon />
                    <span>Stats and trends</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-neutral-800 cursor-pointer flex items-center gap-3 text-gray-300">
                    <CardMembershipIcon />
                    <span>Membership plan</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-neutral-800 cursor-pointer flex items-center gap-3 text-gray-300">
                    <ConnectWithoutContactIcon />
                    <span>Connects</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-neutral-800 cursor-pointer flex items-center gap-3 text-gray-300">
                    <AppsIcon />
                    <span>Apps and Offers</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-neutral-800 cursor-pointer flex items-center gap-3 text-gray-300">
                    <DarkModeIcon />
                    <span>Theme: Dark</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-neutral-800 cursor-pointer flex items-center gap-3 text-gray-300">
                    <SettingsIcon />
                    <span>Account settings</span>
                  </div>
                </div>

                {/* Logout */}
                <div className="border-t border-stone-800">
                  <div 
                    className="px-4 py-2 hover:bg-neutral-800 cursor-pointer flex items-center gap-3 text-gray-300"
                    onClick={() => {
                      navigate('/login');
                      setShowProfileMenu(false);
                    }}
                  >
                    <LogoutIcon />
                    <span>Log out</span>
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

export default Navbar;
