import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  LogOut,
  User as UserIcon,
  Shield,
  ChevronDown,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Logo from "../common/Logo";
import NotificationDropdown from "../common/NotificationDropdown";

const Header = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const { user, logout, isAdmin } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#15559A] text-white shadow-md border-b border-blue-900/40">
      <div className="px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Left Section: Hamburger + Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link
            to={isAdmin ? "/admin/dashboard" : "/dashboard"}
            className="flex items-center"
          >
            <Logo size="md" variant="light" />
          </Link>

          {/* Portal Type Badge */}
          <div className="hidden md:flex items-center gap-1.5 pl-3 border-l border-white/20">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-100/90">
              {isAdmin ? "Administrative Portal" : "Student Grievance Portal"}
            </span>
          </div>
        </div>

        {/* Right Section: Notifications + Profile Dropdown */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification Bell */}
          <NotificationDropdown />

          {/* User Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/10 transition-colors focus:outline-none text-left"
            >
              {/* User Avatar Circle */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#35D0B5] to-[#FFBD58] text-[#15559A] font-bold text-xs flex items-center justify-center shadow-inner border border-white/40 shrink-0">
                {getInitials(user?.name)}
              </div>

              {/* User Details (Desktop) */}
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-white truncate max-w-[130px]">
                  {user?.name || "User"}
                </span>
                <span className="text-[10px] text-blue-200 uppercase tracking-wider">
                  {isAdmin ? "Campus Admin" : user?.studentId || "Student"}
                </span>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-blue-200 hidden sm:block" />
            </button>

            {/* Profile Menu Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-800 z-50 overflow-hidden py-1">
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {user?.name}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {user?.email}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-blue-100 text-[#15559A] uppercase">
                      {user?.role}
                    </span>
                    {user?.department && (
                      <span className="text-[10px] text-slate-500 truncate max-w-[120px]">
                        {user?.department}
                      </span>
                    )}
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    My Profile
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Shield className="w-4 h-4 text-[#3155E7]" />
                      Admin Control Center
                    </Link>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
