import React from 'react';
import { User, Calendar, Clock } from 'lucide-react';
import { formatTimeAgo } from './utils/dateUtils';

const TaskInfoGrid = ({ task }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Created By Card */}
      <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Created by</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {task.createdBy?.name || task.createdBy?.fullName || 'Unknown User'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {task.createdBy?.email || 'No email'}
            </p>
          </div>
        </div>
      </div>

      {/* Assigned User Card */}
      <div className="bg-green-50/50 dark:bg-green-900/10 rounded-lg p-4 border border-green-100 dark:border-green-800/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-900 dark:text-green-100">Assigned to</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {task.assignedUser?.name || task.assignedUser?.fullName || 'Unassigned'}
            </p>
            {task.assignedUser?.email && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {task.assignedUser.email}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Created Date Card */}
      <div className="bg-purple-50/50 dark:bg-purple-900/10 rounded-lg p-4 border border-purple-100 dark:border-purple-800/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-purple-900 dark:text-purple-100">Created</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {task.createdAt ? new Date(task.createdAt).toLocaleTimeString() : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Last Modified Card */}
      <div className="bg-orange-50/50 dark:bg-orange-900/10 rounded-lg p-4 border border-orange-100 dark:border-orange-800/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Last modified</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatTimeAgo(task.lastModified || task.updatedAt)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {task.lastModified ? new Date(task.lastModified).toLocaleTimeString() : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInfoGrid;