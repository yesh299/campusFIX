import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (message, title = 'Success') => addToast({ type: 'success', title, message }),
    error: (message, title = 'Error') => addToast({ type: 'error', title, message }),
    warning: (message, title = 'Attention') => addToast({ type: 'warning', title, message }),
    info: (message, title = 'Note') => addToast({ type: 'info', title, message }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Toast Render Portal */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => {
            const icons = {
              success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
              error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
              warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
              info: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
            };

            const borderColors = {
              success: 'border-l-4 border-l-emerald-500 bg-white border-slate-200',
              error: 'border-l-4 border-l-rose-500 bg-white border-slate-200',
              warning: 'border-l-4 border-l-amber-500 bg-white border-slate-200',
              info: 'border-l-4 border-l-blue-500 bg-white border-slate-200',
            };

            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className={`pointer-events-auto p-4 rounded-lg shadow-lg border ${borderColors[t.type]} flex items-start gap-3`}
              >
                {icons[t.type]}
                <div className="flex-1 min-w-0">
                  {t.title && <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{t.title}</h4>}
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{t.message}</p>
                </div>
                <button
                  onClick={() => removeToast(t.id)}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
