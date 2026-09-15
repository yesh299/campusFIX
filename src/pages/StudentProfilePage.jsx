import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  BadgeCheck,
  Building,
  Phone,
  Calendar,
  Shield,
  Save,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { complaintService } from '../services/complaintService';
import { COLLEGE_DEPARTMENTS } from '../utils/constants';
import { formatDate } from '../utils/formatters';
import { useToast } from '../context/ToastContext';

const StudentProfilePage = () => {
  const { user, updateUser, isAdmin } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    department: user?.department || COLLEGE_DEPARTMENTS[0],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        department: user.department || COLLEGE_DEPARTMENTS[0],
      });
    }

    const loadStats = async () => {
      try {
        if (!isAdmin) {
          const res = await complaintService.getStudentDashboardStats();
          if (res.success) setStats(res.stats);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadStats();
  }, [user, isAdmin]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const res = await authService.updateProfile(formData);
      if (res.success && res.user) {
        updateUser(res.user);
        toast.success('Profile details updated successfully');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
          {isAdmin ? 'Administrator Profile' : 'Student Profile'}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your institutional identity details and view grievance history summary
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: ID Card */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#15559A] to-[#3155E7] text-white font-extrabold text-2xl flex items-center justify-center shadow-lg border-2 border-white mb-4">
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </div>

          <h2 className="text-base font-bold text-slate-900">{user?.name}</h2>
          <span className="mt-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#15559A] border border-blue-200 uppercase tracking-wider">
            {user?.role}
          </span>

          <div className="mt-6 w-full pt-4 border-t border-slate-100 space-y-3 text-left text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                College Email
              </span>
              <span className="font-semibold text-slate-800 break-all">{user?.email}</span>
            </div>

            {!isAdmin && user?.studentId && (
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Student ID / Roll No
                </span>
                <span className="font-mono font-bold text-[#15559A]">{user?.studentId}</span>
              </div>
            )}

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Department
              </span>
              <span className="font-semibold text-slate-700">{user?.department}</span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Account Created
              </span>
              <span className="text-slate-600">{formatDate(user?.createdAt)}</span>
            </div>
          </div>

          {/* Quick Stats if student */}
          {!isAdmin && stats && (
            <div className="mt-6 w-full pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-base font-extrabold text-slate-800">{stats.total}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Total</span>
              </div>
              <div className="p-2 bg-teal-50 rounded-lg border border-teal-200">
                <span className="text-base font-extrabold text-[#0F766E]">{stats.inProgress}</span>
                <span className="text-[9px] font-bold text-[#0F766E] uppercase tracking-wider block">Active</span>
              </div>
              <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                <span className="text-base font-extrabold text-[#4CAF50]">{stats.resolved}</span>
                <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider block">Fixed</span>
              </div>
            </div>
          )}
        </div>

        {/* Right 2 Columns: Edit Form */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 mb-5">
            Edit Profile Details
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSaving}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3155E7]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Contact Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  disabled={isSaving}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3155E7]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Institutional Department
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Building className="w-4 h-4" />
                </div>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3155E7]"
                >
                  {COLLEGE_DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Read-Only Non-modifiable fields */}
            <div className="pt-2">
              <span className="text-[10px] text-slate-400 italic">
                Note: Institutional Email and Student ID / Role cannot be changed without Registrar Office verification.
              </span>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#3155E7] hover:bg-[#15559A] rounded-xl shadow-sm uppercase tracking-wider flex items-center gap-2 transition-all disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
