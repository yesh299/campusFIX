import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
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
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../common/Logo';

const MobileDrawer = ({ isOpen, onClose }) => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose();
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10"
          >
            {/* Drawer Header */}
            <div className="p-4 bg-[#15559A] text-white flex items-center justify-between">
              <Logo size="sm" variant="light" />
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Details Box */}
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <p className="text-xs font-bold text-slate-800">{user?.name}</p>
              <p className="text-[11px] text-[#15559A] font-semibold">
                {isAdmin ? 'ADMINISTRATOR' : (user?.studentId || 'STUDENT')}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">{user?.department}</p>
            </div>

            {/* Nav list */}
            <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isCurrentActive(item.path);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#3155E7] text-white shadow-sm font-semibold'
                        : item.isHighlight
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Sign out */}
            <div className="p-4 border-t border-slate-200">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
