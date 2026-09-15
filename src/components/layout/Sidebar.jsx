import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  User,
  HelpCircle,
  LogOut,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isCollapsed }) => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Complaints', path: '/complaints', icon: FileText },
    { label: 'Submit Complaint', path: '/complaints/new', icon: PlusCircle, isHighlight: true },
    { label: 'Resolved History', path: '/complaints?status=Resolved', icon: CheckCircle2 },
    { label: 'My Profile', path: '/profile', icon: User },
    { label: 'Help & Guidelines', path: '/help', icon: HelpCircle },
  ];

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'All Complaints', path: '/admin/complaints', icon: Layers },
    { label: 'Submitted Queue', path: '/admin/complaints?status=Submitted', icon: Clock },
    { label: 'In Progress', path: '/admin/complaints?status=In%20Progress', icon: AlertCircle },
    { label: 'Resolved Archive', path: '/admin/complaints?status=Resolved', icon: CheckCircle2 },
    { label: 'User Directory', path: '/admin/users', icon: Users },
    { label: 'Profile Settings', path: '/profile', icon: User },
  ];

  const navItems = isAdmin ? adminNavItems : studentNavItems;

  const isCurrentActive = (itemPath) => {
    const fullCurrent = location.pathname + location.search;
    if (itemPath.includes('?')) {
      return fullCurrent === itemPath;
    }
    return location.pathname === itemPath && (!location.search || itemPath !== '/complaints');
  };

  return (
    <aside
      className={`hidden md:flex flex-col bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] sticky top-16 self-start transition-all duration-300 shadow-sm ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Sidebar Header Section with User Quick Info */}
      {!isCollapsed ? (
        <div className="p-4 mx-3 my-3 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-xl border border-blue-100/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3155E7] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{user?.name}</p>
              <p className="text-[11px] text-[#15559A] font-semibold truncate">
                {isAdmin ? 'ADMINISTRATOR' : (user?.studentId || 'STUDENT')}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 flex justify-center border-b border-slate-100">
          <div className="w-9 h-9 rounded-lg bg-[#3155E7] text-white flex items-center justify-center font-bold text-sm shadow-sm">
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </div>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className={`px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider ${isCollapsed ? 'hidden' : 'block'}`}>
          {isAdmin ? 'Administration' : 'Student Services'}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isCurrentActive(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all group relative ${
                isActive
                  ? 'bg-[#3155E7] text-white shadow-sm font-semibold'
                  : item.isHighlight
                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive
                    ? 'text-white'
                    : item.isHighlight
                    ? 'text-emerald-600'
                    : 'text-slate-400 group-hover:text-slate-700'
                }`}
              />
              {!isCollapsed && <span className="truncate flex-1">{item.label}</span>}
              {!isCollapsed && isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-slate-200">
        <button
          onClick={handleLogout}
          title={isCollapsed ? 'Sign Out' : undefined}
          className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
