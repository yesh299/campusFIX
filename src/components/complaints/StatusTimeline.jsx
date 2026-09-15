import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle, XCircle, ChevronRight } from 'lucide-react';
import { formatDateTime } from '../../utils/formatters';

const StatusTimeline = ({ statusHistory = [], currentStatus = 'Submitted' }) => {
  const isRejected = currentStatus === 'Rejected';
  const isCancelled = currentStatus === 'Cancelled';

  // Define the normal sequence
  const standardSteps = isRejected
    ? ['Submitted', 'In Progress', 'Rejected']
    : isCancelled
    ? ['Submitted', 'Cancelled']
    : ['Submitted', 'In Progress', 'Resolved'];

  const getHistoryItem = (stepStatus) => {
    return statusHistory.slice().reverse().find((h) => h.status === stepStatus);
  };

  const getStepState = (step) => {
    const historyEntry = getHistoryItem(step);

    if (historyEntry) {
      if (currentStatus === step) return 'current';
      return 'completed';
    }

    // Determine if step is reached based on currentStatus order
    const currentIndex = standardSteps.indexOf(currentStatus);
    const stepIndex = standardSteps.indexOf(step);

    if (currentIndex >= stepIndex) return 'completed';
    return 'pending';
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Status Tracking Timeline
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time audit log of grievance progression
          </p>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {standardSteps.map((step, idx) => {
          const state = getStepState(step);
          const history = getHistoryItem(step);

          let icon = null;
          let nodeBg = 'bg-white border-2 border-slate-300 text-slate-400';
          let textColor = 'text-slate-500 font-medium';

          if (state === 'completed') {
            if (step === 'Rejected' || step === 'Cancelled') {
              icon = <XCircle className="w-4 h-4 text-rose-600" />;
              nodeBg = 'bg-rose-100 border-2 border-rose-500 text-rose-600';
              textColor = 'text-rose-700 font-bold';
            } else {
              icon = <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
              nodeBg = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-600';
              textColor = 'text-slate-800 font-bold';
            }
          } else if (state === 'current') {
            icon = <Clock className="w-4 h-4 text-white animate-spin" />;
            nodeBg = 'bg-[#3155E7] border-2 border-[#15559A] text-white shadow-md ring-4 ring-blue-100';
            textColor = 'text-[#15559A] font-extrabold';
          }

          return (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex items-start gap-4"
            >
              {/* Step Node Marker */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${nodeBg}`}
              >
                {icon || <span className="w-2 h-2 rounded-full bg-slate-400" />}
              </div>

              {/* Step Content Card */}
              <div className="flex-1 bg-slate-50/70 p-3.5 rounded-lg border border-slate-200/80">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className={`text-xs uppercase tracking-wider ${textColor}`}>
                    {step}
                  </span>
                  {history?.timestamp && (
                    <span className="text-[11px] text-slate-500 font-medium">
                      {formatDateTime(history.timestamp)}
                    </span>
                  )}
                </div>

                {history ? (
                  <div className="mt-1.5 text-xs text-slate-600 space-y-1">
                    <p className="leading-relaxed">{history.remarks || 'Status logged'}</p>
                    {history.changedByName && (
                      <p className="text-[10px] text-slate-400 font-medium">
                        Logged by: <span className="text-slate-600">{history.changedByName}</span>
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="mt-1 text-[11px] text-slate-400 italic">
                    {state === 'pending' ? 'Pending next action' : 'No remarks logged'}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;
