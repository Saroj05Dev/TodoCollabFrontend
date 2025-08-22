import React from 'react';
import { CheckSquare, Users, TrendingUp } from 'lucide-react';

const QuickActions = ({ teamMembers }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
    </div>
    <div className="p-6 space-y-3">
      <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
        <CheckSquare className="h-5 w-5" />
        <span className="font-medium">Create Task</span>
      </button>
      <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
        <Users className="h-5 w-5" />
        <span className="font-medium">Invite Member</span>
      </button>
      <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
        <TrendingUp className="h-5 w-5" />
        <span className="font-medium">View Reports</span>
      </button>
    </div>

    {/* Team Info */}
    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Team Status</span>
        <Users className="h-4 w-4 text-gray-400" />
      </div>
      <p className="text-lg font-semibold text-gray-900 dark:text-white">
        {teamMembers} {teamMembers === 1 ? 'Member' : 'Members'}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {teamMembers > 0 ? 'Collaborate and manage tasks together' : 'Invite team members to collaborate'}
      </p>
    </div>
  </div>
);

export default QuickActions;
