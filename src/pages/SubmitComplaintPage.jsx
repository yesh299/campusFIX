import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  Send,
  Sparkles,
  Info,
} from 'lucide-react';
import { CATEGORIES, LOCATIONS } from '../utils/constants';
import { complaintService } from '../services/complaintService';
import { useToast } from '../context/ToastContext';
import ImageUploader from '../components/complaints/ImageUploader';

const SubmitComplaintPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0],
    location: LOCATIONS[0],
    priority: 'Medium',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Success State Modal
  const [createdComplaint, setCreatedComplaint] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrorMessage('');
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const { title, description, category, location, priority } = formData;

    if (!title.trim() || !description.trim()) {
      setErrorMessage('Please provide both a title and description for the grievance.');
      return;
    }

    try {
      setIsSubmitting(true);

      const submissionData = new FormData();
      submissionData.append('title', title.trim());
      submissionData.append('description', description.trim());
      submissionData.append('category', category);
      submissionData.append('location', location);
      submissionData.append('priority', priority);

      if (selectedFile) {
        submissionData.append('image', selectedFile);
      }

      const res = await complaintService.createComplaint(submissionData);

      if (res.success && res.complaint) {
        setCreatedComplaint(res.complaint);
        toast.success(`Complaint ${res.complaint.complaintId} lodged successfully!`);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit complaint. Please check your inputs.';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Breadcrumb */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#15559A] hover:underline mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
            Submit a Complaint
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log an issue to be addressed by college facilities and administrative departments
          </p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Complaint Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Complaint Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Fan not working in Room 204 or Wi-Fi offline in Lab"
              required
              disabled={isSubmitting}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3155E7] focus:bg-white transition-all"
            />
          </div>

          {/* Category & Location Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3155E7] focus:bg-white transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Campus Location *
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3155E7] focus:bg-white transition-all"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority Selection */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Priority Level *
              </label>
              <span className="text-[11px] text-slate-400">
                Critical priority is assigned by Campus Administrators
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['Low', 'Medium', 'High'].map((p) => {
                const isSelected = formData.priority === p;
                const colors = {
                  Low: 'border-emerald-300 bg-emerald-50 text-emerald-800',
                  Medium: 'border-sky-300 bg-sky-50 text-sky-800',
                  High: 'border-amber-300 bg-amber-50 text-amber-800',
                };

                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, priority: p }))}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                      isSelected
                        ? `${colors[p]} ring-2 ring-[#3155E7] shadow-sm`
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Detailed Description *
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the exact location, symptoms, how long the issue has persisted, and any relevant details..."
              required
              disabled={isSubmitting}
              className="w-full p-3.5 text-xs bg-slate-50 text-slate-800 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3155E7] focus:bg-white transition-all resize-y"
            />
          </div>

          {/* Image Uploader */}
          <ImageUploader
            onFileSelect={handleFileSelect}
            previewUrl={previewUrl}
            onClear={handleClearFile}
          />

          {/* Guidelines Banner */}
          <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
            <Info className="w-4 h-4 text-[#3155E7] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Once submitted, your complaint will be assigned a sequential tracking ID and routed to the respective campus facility department.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl text-xs font-bold text-white bg-[#3155E7] hover:bg-[#15559A] active:bg-[#0E3D70] tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting Complaint...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>SUBMIT COMPLAINT</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {createdComplaint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center"
            >
              {/* Big Green Success Check */}
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#4CAF50] border border-emerald-200 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h2 className="text-xl font-extrabold text-slate-800">
                Complaint Submitted Successfully!
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your complaint has been successfully registered in the portal.
              </p>

              {/* Complaint ID Highlight Box */}
              <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Generated Complaint ID
                </span>
                <span className="text-2xl font-black font-mono text-[#15559A] tracking-wider block mt-1">
                  {createdComplaint.complaintId}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Use this ID to track assignments and updates.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => navigate(`/complaints/${createdComplaint.complaintId}`)}
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#3155E7] hover:bg-[#15559A] uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span>TRACK COMPLAINT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 uppercase tracking-wider transition-colors"
                >
                  BACK TO DASHBOARD
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubmitComplaintPage;
