import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, Shield, User as UserIcon, Clock } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';
import { complaintService } from '../../services/complaintService';
import { useToast } from '../../context/ToastContext';

const CommentThread = ({ complaintId, comments = [], onCommentAdded }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setIsSubmitting(true);
      const res = await complaintService.addComment(complaintId, newComment.trim());
      if (res.success) {
        setNewComment('');
        toast.success('Comment posted successfully');
        if (onCommentAdded) {
          onCommentAdded(res.comments);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col h-full">
      {/* Thread Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#3155E7]" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Discussion & Updates
          </h3>
        </div>
        <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
          {comments.length} {comments.length === 1 ? 'Message' : 'Messages'}
        </span>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto space-y-4 max-h-96 pr-1">
        {comments.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-600">No messages yet</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Ask questions or provide additional information regarding this issue.
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {comments.map((c, idx) => {
              const isAdmin = c.userRole === 'admin';

              return (
                <motion.div
                  key={c._id || idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isAdmin
                      ? 'bg-blue-50/60 border-blue-200 ml-2'
                      : 'bg-slate-50 border-slate-200 mr-2'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${
                          isAdmin ? 'bg-[#15559A]' : 'bg-[#35D0B5] text-slate-800'
                        }`}
                      >
                        {isAdmin ? <Shield className="w-3.5 h-3.5" /> : <UserIcon className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        {c.userName}
                      </span>
                      <span
                        className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                          isAdmin
                            ? 'bg-[#15559A] text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {c.userRole}
                      </span>
                    </div>

                    <span className="text-[10px] text-slate-400 font-medium">
                      {formatDateTime(c.createdAt)}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed pl-8 whitespace-pre-line">
                    {c.message}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex gap-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your message, query or feedback..."
            rows={2}
            className="flex-1 p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3155E7] focus:bg-white resize-none text-slate-800"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="px-4 bg-[#3155E7] hover:bg-[#15559A] disabled:bg-slate-300 text-white rounded-lg flex items-center justify-center shadow-sm transition-all"
            title="Send Message"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentThread;
