import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-container"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const typeStyles = {
          success: 'bg-white dark:bg-slate-900 border-emerald-500 text-emerald-800 dark:text-emerald-300',
          error: 'bg-white dark:bg-slate-900 border-rose-500 text-rose-800 dark:text-rose-300',
          warning: 'bg-white dark:bg-slate-900 border-amber-500 text-amber-800 dark:text-amber-300',
          info: 'bg-white dark:bg-slate-900 border-blue-500 text-blue-800 dark:text-blue-300',
        }[toast.type];

        const Icon = {
          success: CheckCircle2,
          error: AlertCircle,
          warning: AlertTriangle,
          info: Info,
        }[toast.type];

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border-l-4 shadow-lg transition-all duration-300 transform translate-y-0 ${typeStyles} border border-slate-200 dark:border-slate-800`}
            role="alert"
          >
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug">
              {toast.message}
            </div>
            <button
              id={`toast-close-${toast.id}`}
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
