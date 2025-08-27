// TaskPage/components/TaskHeader.jsx - Header component
import React from 'react';
import { ArrowLeft } from 'lucide-react';

const TaskHeader = ({ onNavigate }) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onNavigate('/tasks')}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Details</h1>
          <span className="text-2xl">📋</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300">Manage and track task progress</p>
      </div>
    </div>
  );
};

export default TaskHeader;