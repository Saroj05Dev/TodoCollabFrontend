import React from 'react';
import { AlertTriangle, User, GitMerge, CheckCircle, Loader, X } from 'lucide-react';

const ConflictModal = ({ conflictData, resolveLoading, onResolveConflict, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Conflict Detected</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            This task has been modified by another user. Please choose which version to keep.
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Your Version */}
            <div className="border-2 border-blue-200 dark:border-blue-800 rounded-lg p-6 bg-blue-50/30 dark:bg-blue-900/10">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold text-blue-900 dark:text-blue-100">Your Version</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Assigned to:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {conflictData.yourVersion.assignedUser?.fullName || 'Unassigned'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{conflictData.yourVersion.status}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Priority:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{conflictData.yourVersion.priority}</span>
                </div>
              </div>
            </div>

            {/* Server Version */}
            <div className="border-2 border-green-200 dark:border-green-800 rounded-lg p-6 bg-green-50/30 dark:bg-green-900/10">
              <div className="flex items-center gap-2 mb-4">
                <GitMerge className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h4 className="font-semibold text-green-900 dark:text-green-100">Server Version</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Assigned to:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">
                    {conflictData.serverVersion.assignedUser?.fullName || 'Unassigned'}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Status:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{conflictData.serverVersion.status}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Priority:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{conflictData.serverVersion.priority}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8 justify-center">
            <button
              onClick={() => onResolveConflict(false)}
              disabled={resolveLoading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium"
            >
              {resolveLoading ? <Loader className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
              Keep Your Version
            </button>
            
            <button
              onClick={() => onResolveConflict(true)}
              disabled={resolveLoading}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors font-medium"
            >
              {resolveLoading ? <Loader className="h-4 w-4 animate-spin" /> : <GitMerge className="h-4 w-4" />}
              Use Server Version
            </button>
            
            <button
              onClick={onClose}
              disabled={resolveLoading}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConflictModal;