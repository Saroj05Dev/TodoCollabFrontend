import React from 'react';
import { Edit3, Flag, Tag, Loader, Zap, RefreshCw } from 'lucide-react';
import TaskInfoGrid from './TaskInfoGrid';
import { getPriorityColor, getStatusColor } from './utils/colorUtils';

const TaskDetailsCard = ({ 
  task, 
  onEdit,
  smartAssignLoading, 
  loading, 
  onSmartAssign, 
  onRefresh 
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10">
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {task.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {task.description || 'No description available'}
            </p>
          </div>
          
          <div className="flex flex-col gap-2 ml-4">
            <div className="flex gap-2">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(task.priority)}`}>
                <Flag className="h-3 w-3" />
                {task.priority || 'Medium'}
              </span>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
                <Tag className="h-3 w-3" />
                {task.status || 'Todo'}
              </span>
            </div>
            
            {/* ✅ Edit button now navigates to EditTaskPage */}
            <button
              onClick={() => onEdit(task)}  // still calls parent handler
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm font-medium"
            >
              <Edit3 className="h-4 w-4" />
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <TaskInfoGrid task={task} />

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={onSmartAssign}
            disabled={smartAssignLoading}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium shadow-sm"
          >
            {smartAssignLoading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
            {smartAssignLoading ? 'Assigning...' : 'Smart Assign'}
          </button>
          
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium shadow-sm"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsCard;
