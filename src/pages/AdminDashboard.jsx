import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Users,
  Building,
  Layers,
  MapPin,
  ChevronRight,
  Eye,
  Edit,
  TrendingUp,
  Shield,
} from 'lucide-react';
import { adminService } from '../services/adminService';
import StatCard from '../components/dashboard/StatCard';
import CircularProgress from '../components/dashboard/CircularProgress';
import StatusBadge from '../components/common/StatusBadge';
import PriorityBadge from '../components/common/PriorityBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { formatDate } from '../utils/formatters';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true);
        const res = await adminService.getAdminDashboardStats();
        if (res.success) {
          setStats(res.stats);
        }
      } catch (err) {
        console.error('Failed to fetch admin statistics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  if (loading) {
    return (
      <div className="py-16 flex justify-center">
        <LoadingSpinner text="Computing administrative metrics..." size="large" />
      </div>
    );
  }

  const {
    total = 0,
    submitted = 0,
    inProgress = 0,
    resolved = 0,
    critical = 0,
    totalStudents = 0,
    resolutionRate = 0,
    categoryStats = [],
    statusStats = [],
    locationStats = [],
    recentComplaints = [],
  } = stats || {};

  return (
    <div className="space-y-6">
      {/* Admin Welcome Banner */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#15559A] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
              Campus Administrative Control
            </span>
            <span className="text-xs text-slate-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight mt-1.5">
            CampusFix Central Command
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Overview of campus facility grievances, work orders, and resolution analytics
          </p>
        </div>

        <Link
          to="/admin/complaints"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#15559A] hover:bg-[#0E3D70] text-white text-xs font-bold rounded-xl shadow-sm transition-all uppercase tracking-wider shrink-0"
        >
          <Layers className="w-4 h-4" />
          <span>Manage All Complaints</span>
        </Link>
      </div>

      {/* 5 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="TOTAL COMPLAINTS"
          value={total}
          subtitle="Lifetime logged"
          icon={FileText}
          variant="blue"
          onClick={() => navigate('/admin/complaints')}
        />
        <StatCard
          title="SUBMITTED QUEUE"
          value={submitted}
          subtitle="Pending assignment"
          icon={Clock}
          variant="yellow"
          onClick={() => navigate('/admin/complaints?status=Submitted')}
        />
        <StatCard
          title="IN PROGRESS"
          value={inProgress}
          subtitle="Assigned & active"
          icon={AlertCircle}
          variant="teal"
          onClick={() => navigate('/admin/complaints?status=In%20Progress')}
        />
        <StatCard
          title="RESOLVED"
          value={resolved}
          subtitle="Successfully fixed"
          icon={CheckCircle2}
          variant="green"
          onClick={() => navigate('/admin/complaints?status=Resolved')}
        />
        <StatCard
          title="CRITICAL ISSUES"
          value={critical}
          subtitle="Urgent attention"
          icon={AlertTriangle}
          variant="coral"
          onClick={() => navigate('/admin/complaints?priority=Critical')}
        />
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#3155E7]" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Complaints by Category
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Distribution</span>
          </div>

          <div className="space-y-3">
            {categoryStats.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No category records yet</p>
            ) : (
              categoryStats.slice(0, 5).map((cat) => {
                const percentage = total > 0 ? Math.round((cat.count / total) * 100) : 0;
                return (
                  <div key={cat._id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">{cat._id}</span>
                      <span className="font-mono text-slate-500 font-bold">{cat.count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#15559A] to-[#3155E7] h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Location Breakdown */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#35D0B5]" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Top Campus Locations
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Hotspots</span>
          </div>

          <div className="space-y-3">
            {locationStats.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No location records yet</p>
            ) : (
              locationStats.slice(0, 5).map((loc) => {
                const percentage = total > 0 ? Math.round((loc.count / total) * 100) : 0;
                return (
                  <div key={loc._id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">{loc._id}</span>
                      <span className="font-mono text-slate-500 font-bold">{loc.count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#0F766E] to-[#35D0B5] h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Resolution Metrics Gauge */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Overall Resolution Rate
              </h3>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">SLA Metric</span>
          </div>

          <div className="py-4 flex justify-center">
            <CircularProgress
              percentage={resolutionRate}
              label="Campus Resolution"
              subtitle={`${resolved} of ${total} issues fixed`}
              color="#4CAF50"
              size={130}
              strokeWidth={10}
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Registered Active Students</span>
            <span className="font-mono font-bold text-[#15559A]">{totalStudents}</span>
          </div>
        </div>
      </div>

      {/* Recent Complaints Master Queue */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Recent Grievances Queue
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Latest student complaints requiring department triage and inspection
            </p>
          </div>

          <Link
            to="/admin/complaints"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#15559A] hover:underline"
          >
            <span>Open All Complaints</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {recentComplaints.length === 0 ? (
          <EmptyState
            title="No complaints in queue"
            description="All campus grievances have been processed or none have been submitted yet."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Complaint ID</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Department</th>
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
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800 block truncate max-w-[120px]">
                        {c.student?.name || 'Student'}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {c.student?.studentId}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{c.category}</td>
                    <td className="py-3 px-4">
                      <PriorityBadge priority={c.priority} size="sm" />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={c.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <span className="text-xs font-medium bg-slate-100 px-2 py-0.5 rounded">
                        {c.assignedDepartment || 'Unassigned'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/complaints/${c.complaintId}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 text-[#15559A] hover:bg-[#15559A] hover:text-white font-semibold transition-colors text-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
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

export default AdminDashboard;
