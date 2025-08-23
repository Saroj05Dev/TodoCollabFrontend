import React from 'react';
import { Activity, RefreshCw } from 'lucide-react';

const TaskOverview = ({ totalTasks, inProgress, completedCount, isLoading }) => {
  const inProgressCount = inProgress?.length || 0;

  return (
    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Task Overview</h2>
        <Activity className="h-5 w-5 text-gray-400 dark:text-gray-300" />
      </div>
      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-3 text-gray-500 dark:text-gray-400">Loading tasks...</span>
          </div>
        ) : totalTasks > 0 ? (
          <div className="space-y-4">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>Progress</span>
                <span>{Math.round((completedCount / totalTasks) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedCount / totalTasks) * 100}%` }}
                />
              </div>
            </div>

            {/* Task Breakdown */}
            <div className="grid grid-cols-3 gap-4 pt-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalTasks}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-500 dark:text-orange-400">{inProgressCount}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-500 dark:text-green-400">{completedCount}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Completed</p>
              </div>
            </div>

            {/* Recent Tasks */}
            {inProgressCount > 0 && (
              <div className="pt-4">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">Recent Tasks</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {inProgress.slice(0, 3).map((task, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-200 truncate">
                        {task.title || task.name || `Task ${idx + 1}`}
                      </span>
                    </div>
                  ))}
                  {inProgressCount > 3 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      +{inProgressCount - 3} more tasks
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-300">
            No tasks yet. Create your first task to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskOverview;