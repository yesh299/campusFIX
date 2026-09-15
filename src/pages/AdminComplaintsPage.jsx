import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  Eye,
  Edit,
  Building,
  Trash2,
  RefreshCw,
  Layers,
  MapPin,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import { adminService } from '../services/adminService';
import { CATEGORIES, LOCATIONS, STATUSES, PRIORITIES, DEPARTMENTS } from '../utils/constants';
import StatusBadge from '../components/common/StatusBadge';
import PriorityBadge from '../components/common/PriorityBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { formatDate } from '../utils/formatters';
import { useToast } from '../context/ToastContext';

const AdminComplaintsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const toast = useToast();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'All');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || 'All');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || 'All');
  const [priorityFilter, setPriorityFilter] = useState(searchParams.get('priority') || 'All');

  // Modals
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form states
  const [newStatus, setNewStatus] = useState('');
  const [statusRemarks, setStatusRemarks] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [assignedDept, setAssignedDept] = useState('');
  const [assignedStaff, setAssignedStaff] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchComplaints = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      if (categoryFilter !== 'All') params.category = categoryFilter;
      if (locationFilter !== 'All') params.location = locationFilter;
      if (priorityFilter !== 'All') params.priority = priorityFilter;
      if (searchQuery.trim()) params.search = searchQuery.trim();

      const res = await adminService.getAllComplaints(params);
      if (res.success) {
        setComplaints(res.complaints || []);
      }
    } catch (err) {
      toast.error('Failed to load institution complaints');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter, locationFilter, priorityFilter, searchQuery, toast]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  // Sync with searchParams
  useEffect(() => {
    const urlStatus = searchParams.get('status');
    const urlPriority = searchParams.get('priority');
    if (urlStatus && urlStatus !== statusFilter) setStatusFilter(urlStatus);
    if (urlPriority && urlPriority !== priorityFilter) setPriorityFilter(urlPriority);
  }, [searchParams]);

  // Quick Status Modal trigger
  const openStatusModal = (complaint) => {
    setSelectedComplaint(complaint);
    setNewStatus(complaint.status);
    setStatusRemarks('');
    setAdminNotes(complaint.adminNotes || '');
    setShowStatusModal(true);
  };

  // Quick Assign Modal trigger
  const openAssignModal = (complaint) => {
    setSelectedComplaint(complaint);
    setAssignedDept(complaint.assignedDepartment || 'Unassigned');
    setAssignedStaff(complaint.assignedTo || '');
    setAdminNotes(complaint.adminNotes || '');
    setShowAssignModal(true);
  };

  // Submit Status Change
  const handleSaveStatus = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    try {
      setIsProcessing(true);
      const res = await adminService.updateStatus(selectedComplaint._id, {
        status: newStatus,
        remarks: statusRemarks.trim(),
        adminNotes: adminNotes.trim(),
      });
      if (res.success) {
        toast.success(`Complaint ${selectedComplaint.complaintId} status updated to ${newStatus}`);
        setComplaints((prev) =>
          prev.map((c) => (c._id === selectedComplaint._id ? res.complaint : c))
        );
        setShowStatusModal(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    } finally {
      setIsProcessing(false);
    }
  };

  // Submit Assignment
  const handleSaveAssignment = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    try {
      setIsProcessing(true);
      const res = await adminService.assignComplaint(selectedComplaint._id, {
        assignedDepartment: assignedDept,
        assignedTo: assignedStaff.trim(),
        adminNotes: adminNotes.trim(),
      });
      if (res.success) {
        toast.success(`Complaint ${selectedComplaint.complaintId} assigned successfully`);
        setComplaints((prev) =>
          prev.map((c) => (c._id === selectedComplaint._id ? res.complaint : c))
        );
        setShowAssignModal(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to assign complaint');
    } finally {
      setIsProcessing(false);
    }
  };

  // Delete Action
  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setIsProcessing(true);
      const res = await adminService.deleteComplaint(deleteTarget._id);
      if (res.success) {
        toast.success(`Complaint ${deleteTarget.complaintId} deleted.`);
        setComplaints((prev) => prev.filter((c) => c._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete complaint');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
            All Campus Complaints
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Comprehensive grievance register, triage, and department routing matrix
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ID, title, student..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#15559A]"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#15559A]"
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
              className="w-full px-3 py-2 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#15559A]"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#15559A]"
            >
              <option value="All">All Locations</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#15559A]"
            >
              <option value="All">All Priorities</option>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset Filter Button */}
        {(statusFilter !== 'All' ||
          categoryFilter !== 'All' ||
          locationFilter !== 'All' ||
          priorityFilter !== 'All' ||
          searchQuery.trim() !== '') && (
          <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
            <span className="text-slate-500 font-medium">
              Found {complaints.length} matching complaints
            </span>
            <button
              onClick={() => {
                setStatusFilter('All');
                setCategoryFilter('All');
                setLocationFilter('All');
                setPriorityFilter('All');
                setSearchQuery('');
              }}
              className="text-[#15559A] hover:underline font-semibold flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Table Content */}
      {loading ? (
        <div className="py-16 flex justify-center">
          <LoadingSpinner text="Retrieving administrative records..." size="medium" />
        </div>
      ) : complaints.length === 0 ? (
        <EmptyState
          title="No complaints match filters"
          description="Try adjusting your search criteria or resetting filters."
          actionText="Reset Filters"
          onActionClick={() => {
            setStatusFilter('All');
            setCategoryFilter('All');
            setLocationFilter('All');
            setPriorityFilter('All');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Complaint ID</th>
                  <th className="py-3.5 px-4">Title</th>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
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
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 block truncate max-w-[120px]">
                        {c.student?.name || 'Student'}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {c.student?.studentId}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{c.category}</td>
                    <td className="py-3.5 px-4 text-slate-600">{c.location}</td>
                    <td className="py-3.5 px-4">
                      <PriorityBadge priority={c.priority} size="sm" />
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={c.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-700">
                        {c.assignedDepartment || 'Unassigned'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {formatDate(c.createdAt)}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/complaints/${c.complaintId}`}
                          className="p-1.5 rounded bg-blue-50 text-[#15559A] hover:bg-[#15559A] hover:text-white transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => openAssignModal(c)}
                          className="p-1.5 rounded bg-teal-50 text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-colors"
                          title="Assign Department"
                        >
                          <Building className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => openStatusModal(c)}
                          className="p-1.5 rounded bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white transition-colors"
                          title="Change Status"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setDeleteTarget(c)}
                          className="p-1.5 rounded bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Change Status Modal */}
      {showStatusModal && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">
              Update Status: {selectedComplaint.complaintId}
            </h3>
            <p className="text-xs text-slate-500 mb-4">{selectedComplaint.title}</p>

            <form onSubmit={handleSaveStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#15559A]"
                >
                  {STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Status Remarks *
                </label>
                <textarea
                  rows={2}
                  value={statusRemarks}
                  onChange={(e) => setStatusRemarks(e.target.value)}
                  placeholder="e.g. Technician on-site, parts replaced, inspected..."
                  required
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#15559A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Admin Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Internal administrative notes..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#15559A]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowStatusModal(false)}
                  disabled={isProcessing}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#3155E7] hover:bg-[#15559A] rounded-lg shadow-sm uppercase tracking-wider"
                >
                  {isProcessing ? 'Saving...' : 'Update Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Department Modal */}
      {showAssignModal && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">
              Assign Department: {selectedComplaint.complaintId}
            </h3>
            <p className="text-xs text-slate-500 mb-4">{selectedComplaint.title}</p>

            <form onSubmit={handleSaveAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Department
                </label>
                <select
                  value={assignedDept}
                  onChange={(e) => setAssignedDept(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#15559A]"
                >
                  <option value="Unassigned">Unassigned</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Assigned Staff Name / Role
                </label>
                <input
                  type="text"
                  value={assignedStaff}
                  onChange={(e) => setAssignedStaff(e.target.value)}
                  placeholder="e.g. Alex Turner (Lead Electrician)"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#15559A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Admin Instructions
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Internal notes..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#15559A]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  disabled={isProcessing}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#15559A] hover:bg-[#0E3D70] rounded-lg shadow-sm uppercase tracking-wider"
                >
                  {isProcessing ? 'Assigning...' : 'Assign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Complaint?"
        message={`Are you sure you want to permanently delete complaint ${deleteTarget?.complaintId}? This will remove all student data and status logs.`}
        confirmText="Delete"
        isLoading={isProcessing}
      />
    </div>
  );
};

export default AdminComplaintsPage;
