import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Search,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { complaintService } from '../services/complaintService';
import StatCard from '../components/dashboard/StatCard';
import CircularProgress from '../components/dashboard/CircularProgress';
import ActionPanels from '../components/dashboard/ActionPanel';
import StatusBadge from '../components/common/StatusBadge';
import PriorityBadge from '../components/common/PriorityBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { formatDate } from '../utils/formatters';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await complaintService.getStudentDashboardStats();
        if (res.success) {
          setStats(res.stats);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center">
        <LoadingSpinner text="Loading your dashboard..." size="large" />
      </div>
    );
  }

  const {
    total = 0,
    submitted = 0,
    inProgress = 0,
    resolved = 0,
    resolutionRate = 0,
    inProgressRate = 0,
    submittedRate = 0,
    recentComplaints = [],
  } = stats || {};

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#3155E7] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Student Portal
            </span>
            <span className="text-xs text-slate-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight mt-1.5">
            Welcome back, {user?.name || 'Student'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {user?.department} • ID: <span className="font-semibold text-slate-700">{user?.studentId}</span>
          </p>
        </div>

        <Link
          to="/complaints/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#3155E7] hover:bg-[#15559A] text-white text-xs font-bold rounded-xl shadow-sm transition-all uppercase tracking-wider shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report an Issue</span>
        </Link>
      </div>

      {/* 4 Colorful Portal Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="TOTAL COMPLAINTS"
          value={total}
          subtitle="All time logged"
          icon={FileText}
          variant="blue"
          onClick={() => navigate('/complaints')}
        />
        <StatCard
          title="SUBMITTED"
          value={submitted}
          subtitle="Awaiting review"
          icon={Clock}
          variant="yellow"
          onClick={() => navigate('/complaints?status=Submitted')}
        />
        <StatCard
          title="IN PROGRESS"
          value={inProgress}
          subtitle="Being resolved"
          icon={AlertCircle}
          variant="teal"
          onClick={() => navigate('/complaints?status=In%20Progress')}
        />
        <StatCard
          title="RESOLVED"
          value={resolved}
          subtitle="Completed"
          icon={CheckCircle2}
          variant="green"
          onClick={() => navigate('/complaints?status=Resolved')}
        />
      </div>

      {/* Circular Completion Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CircularProgress
          percentage={resolutionRate}
          label="Resolution Rate"
          subtitle={`${resolved} of ${total} resolved`}
          color="#4CAF50"
        />
        <CircularProgress
          percentage={inProgressRate}
          label="Under Investigation"
          subtitle={`${inProgress} currently assigned`}
          color="#35D0B5"
        />
        <CircularProgress
          percentage={submittedRate}
          label="Pending Dispatch"
          subtitle={`${submitted} awaiting admin review`}
          color="#FFBD58"
        />
      </div>

      {/* Colorful Portal Action Panels */}
      <ActionPanels />

      {/* Recent Complaints Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Recent Complaints
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest grievances submitted from your account
            </p>
          </div>

          <Link
            to="/complaints"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#3155E7] hover:text-[#15559A] transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {recentComplaints.length === 0 ? (
          <EmptyState
            title="No complaints lodged yet"
            description="You haven't reported any campus issues. If you notice any maintenance or facility problems, lodge your first report."
            actionText="REPORT AN ISSUE"
            actionLink="/complaints/new"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Complaint ID</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {recentComplaints.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#15559A]">
                      {c.complaintId}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800 max-w-xs truncate">
                      {c.title}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{c.category}</td>
                    <td className="py-3 px-4 text-slate-600">{c.location}</td>
                    <td className="py-3 px-4">
                      <PriorityBadge priority={c.priority} size="sm" />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={c.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {formatDate(c.createdAt)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/complaints/${c.complaintId || c._id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 text-[#3155E7] hover:bg-[#3155E7] hover:text-white font-semibold transition-colors text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
