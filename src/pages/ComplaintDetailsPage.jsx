import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Layers,
  User,
  Shield,
  Building,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Edit,
  Trash2,
  Share2,
  ExternalLink,
} from "lucide-react";
import { complaintService } from "../services/complaintService";
import { adminService } from "../services/adminService";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import StatusBadge from "../components/common/StatusBadge";
import PriorityBadge from "../components/common/PriorityBadge";
import StatusTimeline from "../components/complaints/StatusTimeline";
import CommentThread from "../components/complaints/CommentThread";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ConfirmationModal from "../components/common/ConfirmationModal";
import { formatDate, formatDateTime } from "../utils/formatters";
import { DEPARTMENTS, STATUSES, PRIORITIES } from "../utils/constants";

const ComplaintDetailsPage = () => {
  const { id } = useParams();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  // Admin action modals
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Admin form states
  const [newStatus, setNewStatus] = useState("");
  const [statusRemarks, setStatusRemarks] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [assignedDept, setAssignedDept] = useState("");
  const [assignedStaff, setAssignedStaff] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchDetails = useCallback(async () => {
    try {
      setLoading(true);
      const res = await complaintService.getComplaintById(id);
      if (res.success && res.complaint) {
        setComplaint(res.complaint);
        setNewStatus(res.complaint.status);
        setAdminNotes(res.complaint.adminNotes || "");
        setAssignedDept(res.complaint.assignedDepartment || "Unassigned");
        setAssignedStaff(res.complaint.assignedTo || "");
      }
    } catch (err) {
      toast.error("Could not load complaint details");
    } finally {
      setLoading(false);
    }
  }, [id, toast]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  // Handle Admin Status Update
  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      const res = await adminService.updateStatus(complaint._id, {
        status: newStatus,
        remarks: statusRemarks.trim(),
        adminNotes: adminNotes.trim(),
      });
      if (res.success) {
        toast.success(`Complaint status updated to ${newStatus}`);
        setComplaint(res.complaint);
        setShowStatusModal(false);
        setStatusRemarks("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle Admin Assignment
  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      const res = await adminService.assignComplaint(complaint._id, {
        assignedDepartment: assignedDept,
        assignedTo: assignedStaff.trim(),
        adminNotes: adminNotes.trim(),
      });
      if (res.success) {
        toast.success("Department and staff successfully assigned");
        setComplaint(res.complaint);
        setShowAssignModal(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to assign complaint");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    try {
      setIsUpdating(true);
      const res = isAdmin
        ? await adminService.deleteComplaint(complaint._id)
        : await complaintService.deleteComplaint(complaint._id);

      if (res.success) {
        toast.success("Complaint deleted successfully");
        navigate(isAdmin ? "/admin/complaints" : "/complaints");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete complaint");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 flex justify-center">
        <LoadingSpinner text="Loading complaint details..." size="large" />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="text-center py-16">
        <p className="text-sm font-bold text-slate-700">Complaint not found.</p>
        <Link
          to={isAdmin ? "/admin/complaints" : "/complaints"}
          className="mt-3 inline-block text-xs text-[#3155E7] hover:underline"
        >
          ← Return to list
        </Link>
      </div>
    );
  }

  const imageFullUrl = complaint.image
    ? `${import.meta.env.VITE_IMAGE_BASE_URL || "https://campusfix-backend-j3vi.onrender.com"}${complaint.image}`
    : null;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Back Link & Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to={isAdmin ? "/admin/complaints" : "/complaints"}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15559A] hover:underline mb-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {isAdmin ? "Back to All Complaints" : "Back to My Complaints"}
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-black text-[#15559A] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              {complaint.complaintId}
            </span>
            <StatusBadge status={complaint.status} size="md" />
            <PriorityBadge priority={complaint.priority} size="md" />
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
            {complaint.title}
          </h1>
        </div>

        {/* Action Controls for Admin or Student */}
        <div className="flex flex-wrap items-center gap-2">
          {isAdmin ? (
            <>
              <button
                onClick={() => setShowAssignModal(true)}
                className="px-3.5 py-2 text-xs font-bold text-white bg-[#15559A] hover:bg-[#0E3D70] rounded-xl shadow-sm transition-all uppercase tracking-wider flex items-center gap-1.5"
              >
                <Building className="w-3.5 h-3.5" />
                <span>Assign Dept</span>
              </button>

              <button
                onClick={() => setShowStatusModal(true)}
                className="px-3.5 py-2 text-xs font-bold text-white bg-[#3155E7] hover:bg-blue-600 rounded-xl shadow-sm transition-all uppercase tracking-wider flex items-center gap-1.5"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Change Status</span>
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="p-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors"
                title="Delete Complaint"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          ) : (
            complaint.status === "Submitted" && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-3.5 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Cancel & Delete</span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Grid: Details + Timeline/Comments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Information Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Details Card */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3">
              Grievance Information
            </h2>

            {/* Meta tags */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Category
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {complaint.category}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Location
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {complaint.location}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Submitted On
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {formatDate(complaint.createdAt)}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Resolved On
                </span>
                <span className="font-semibold text-slate-800 mt-0.5 block">
                  {formatDate(complaint.resolvedAt)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Issue Description
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line p-4 rounded-xl bg-slate-50/50 border border-slate-200">
                {complaint.description}
              </p>
            </div>

            {/* Photo Evidence */}
            {imageFullUrl && (
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Photo Evidence
                </h3>
                <div
                  onClick={() => setImageModalOpen(true)}
                  className="relative group cursor-pointer inline-block rounded-xl overflow-hidden border border-slate-200 max-w-sm shadow-sm"
                >
                  <img
                    src={imageFullUrl}
                    alt="Complaint Evidence"
                    className="w-full max-h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5">
                    <ExternalLink className="w-4 h-4" />
                    <span>Click to view full image</span>
                  </div>
                </div>
              </div>
            )}

            {/* Assigned Team & Admin Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                <span className="text-[10px] font-bold text-[#15559A] uppercase tracking-wider block">
                  Assigned Department
                </span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {complaint.assignedDepartment || "Unassigned"}
                </p>
                {complaint.assignedTo && (
                  <p className="text-xs text-slate-600 mt-1">
                    Staff In-Charge:{" "}
                    <span className="font-semibold">
                      {complaint.assignedTo}
                    </span>
                  </p>
                )}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Administrative Remarks
                </span>
                <p className="text-xs text-slate-700 mt-1 italic">
                  {complaint.adminNotes ||
                    "No administrative remarks logged yet."}
                </p>
              </div>
            </div>
          </div>

          {/* Student Lodged Information */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3155E7] text-white font-bold flex items-center justify-center text-sm shadow-sm">
                {complaint.student?.name?.[0]?.toUpperCase() || "S"}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Reported by: {complaint.student?.name || "Student"}
                </p>
                <p className="text-[11px] text-slate-500">
                  ID:{" "}
                  <span className="font-semibold text-slate-700">
                    {complaint.student?.studentId || "N/A"}
                  </span>{" "}
                  • {complaint.student?.department}
                </p>
              </div>
            </div>

            <span className="text-[11px] text-slate-400 font-mono">
              {complaint.student?.email}
            </span>
          </div>

          {/* Comments Discussion Thread */}
          <CommentThread
            complaintId={complaint._id}
            comments={complaint.comments}
            onCommentAdded={(updatedComments) => {
              setComplaint((prev) => ({ ...prev, comments: updatedComments }));
            }}
          />
        </div>

        {/* Right 1 Column: Status Timeline */}
        <div className="space-y-6">
          <StatusTimeline
            statusHistory={complaint.statusHistory}
            currentStatus={complaint.status}
          />
        </div>
      </div>

      {/* Image Zoom Modal */}
      {imageModalOpen && imageFullUrl && (
        <div
          onClick={() => setImageModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md cursor-pointer"
        >
          <div className="relative max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-black border border-white/20">
            <img
              src={imageFullUrl}
              alt="Full Preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Admin: Change Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider mb-4">
              Update Complaint Status
            </h3>
            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3155E7]"
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
                  Status Transition Remarks *
                </label>
                <textarea
                  rows={2}
                  value={statusRemarks}
                  onChange={(e) => setStatusRemarks(e.target.value)}
                  placeholder="e.g. Technician dispatched, parts replaced, inspected by supervisor..."
                  required
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3155E7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  General Admin Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Internal notes for tracking..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3155E7]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowStatusModal(false)}
                  disabled={isUpdating}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#3155E7] hover:bg-[#15559A] rounded-lg shadow-sm uppercase tracking-wider"
                >
                  {isUpdating ? "Updating..." : "Save Status"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin: Assign Department Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider mb-4">
              Assign Department & Staff
            </h3>
            <form onSubmit={handleAssign} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Responsible Department
                </label>
                <select
                  value={assignedDept}
                  onChange={(e) => setAssignedDept(e.target.value)}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3155E7]"
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
                  placeholder="e.g. Alex Turner (Network Lead)"
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3155E7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Admin Notes
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Additional instructions for department..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#3155E7]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  disabled={isUpdating}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#15559A] hover:bg-[#0E3D70] rounded-lg shadow-sm uppercase tracking-wider"
                >
                  {isUpdating ? "Assigning..." : "Assign Department"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Complaint?"
        message={`Are you sure you want to permanently delete complaint ${complaint?.complaintId}? This will remove all history, comments, and attachments.`}
        confirmText="Delete"
        isLoading={isUpdating}
      />
    </div>
  );
};

export default ComplaintDetailsPage;
