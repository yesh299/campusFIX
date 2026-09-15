import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  PlusCircle,
  Eye,
  Trash2,
  Calendar,
  Layers,
  MapPin,
  RefreshCw,
  ArrowUpDown,
} from 'lucide-react';
import { complaintService } from '../services/complaintService';
import { CATEGORIES, STATUSES } from '../utils/constants';
import StatusBadge from '../components/common/StatusBadge';
import PriorityBadge from '../components/common/PriorityBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { formatDate } from '../utils/formatters';
import { useToast } from '../context/ToastContext';

const MyComplaintsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useToast();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'All');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      if (categoryFilter !== 'All') params.category = categoryFilter;
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (sortBy) params.sort = sortBy;

      const res = await complaintService.getMyComplaints(params);
      if (res.success) {
        setComplaints(res.complaints || []);
      }
    } catch (err) {
      toast.error('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter, searchQuery, sortBy, toast]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  // Sync state with URL params
  useEffect(() => {
    const urlStatus = searchParams.get('status');
    if (urlStatus && urlStatus !== statusFilter) {
      setStatusFilter(urlStatus);
    }
  }, [searchParams]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      const res = await complaintService.deleteComplaint(deleteTarget._id);
      if (res.success) {
        toast.success(`Complaint ${deleteTarget.complaintId} deleted.`);
        setComplaints((prev) => prev.filter((c) => c._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete complaint');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
            My Complaints
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track, filter, and inspect grievances lodged by your account
          </p>
        </div>

        <Link
          to="/complaints/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#3155E7] hover:bg-[#15559A] text-white text-xs font-bold rounded-xl shadow-sm transition-all uppercase tracking-wider shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit Complaint</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative lg:col-span-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID or title..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3155E7]"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3155E7]"
            >
              <option value="All">All Statuses</option>
              {STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3155E7]"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3155E7]"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips & Reset */}
        {(statusFilter !== 'All' || categoryFilter !== 'All' || searchQuery.trim() !== '') && (
          <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
            <span className="text-slate-500 font-medium">
              Showing filtered results ({complaints.length} found)
            </span>
            <button
              onClick={() => {
                setStatusFilter('All');
                setCategoryFilter('All');
                setSearchQuery('');
              }}
              className="text-[#3155E7] hover:underline font-semibold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Complaints Content */}
      {loading ? (
        <div className="py-12 flex justify-center">
          <LoadingSpinner text="Fetching your complaints..." size="medium" />
        </div>
      ) : complaints.length === 0 ? (
        <EmptyState
          title="No complaints found"
          description={
            searchQuery || statusFilter !== 'All' || categoryFilter !== 'All'
              ? 'No grievances matched your search and filter criteria.'
              : "You haven't submitted any complaints yet."
          }
          actionText={
            searchQuery || statusFilter !== 'All' || categoryFilter !== 'All'
              ? 'Clear Filters'
              : 'REPORT AN ISSUE'
          }
          onActionClick={
            searchQuery || statusFilter !== 'All' || categoryFilter !== 'All'
              ? () => {
                  setStatusFilter('All');
                  setCategoryFilter('All');
                  setSearchQuery('');
                }
              : undefined
          }
          actionLink={
            searchQuery || statusFilter !== 'All' || categoryFilter !== 'All'
              ? undefined
              : '/complaints/new'
          }
        />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
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
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {complaints.map((c) => (
                    <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#15559A]">
                        {c.complaintId}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800 max-w-xs truncate">
                        <Link
                          to={`/complaints/${c.complaintId}`}
                          className="hover:text-[#3155E7] transition-colors"
                        >
                          {c.title}
                        </Link>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{c.category}</td>
                      <td className="py-3.5 px-4 text-slate-600">{c.location}</td>
                      <td className="py-3.5 px-4">
                        <PriorityBadge priority={c.priority} size="sm" />
                      </td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status={c.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {formatDate(c.createdAt)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/complaints/${c.complaintId}`}
                            className="p-1.5 rounded bg-blue-50 text-[#3155E7] hover:bg-[#3155E7] hover:text-white transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>

                          {c.status === 'Submitted' && (
                            <button
                              onClick={() => setDeleteTarget(c)}
                              className="p-1.5 rounded bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                              title="Delete Complaint"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-3">
            {complaints.map((c) => (
              <div
                key={c._id}
                className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-[#15559A]">
                    {c.complaintId}
                  </span>
                  <StatusBadge status={c.status} size="sm" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{c.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{c.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-slate-400" />
                    {c.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {c.location}
                  </span>
                  <span>•</span>
                  <PriorityBadge priority={c.priority} size="sm" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400">
                    {formatDate(c.createdAt)}
                  </span>

                  <div className="flex items-center gap-2">
                    {c.status === 'Submitted' && (
                      <button
                        onClick={() => setDeleteTarget(c)}
                        className="px-2.5 py-1 text-xs font-semibold text-rose-600 bg-rose-50 rounded"
                      >
                        Delete
                      </button>
                    )}
                    <Link
                      to={`/complaints/${c.complaintId}`}
                      className="px-3 py-1 text-xs font-bold text-white bg-[#3155E7] rounded flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Complaint?"
        message={`Are you sure you want to delete complaint ${deleteTarget?.complaintId}? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default MyComplaintsPage;
