// TaskPage/components/Toast.jsx - Toast notification component
import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const Toast = ({ toast }) => {
  if (!toast.show) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border shadow-lg transition-all duration-300 ${
      toast.type === 'success' 
        ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300'
        : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'
    }`}>
      <div className="flex items-center gap-2">
        {toast.type === 'success' ? (
          <CheckCircle className="h-5 w-5" />
        ) : (
          <AlertTriangle className="h-5 w-5" />
        )}
        <span className="font-medium">{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;