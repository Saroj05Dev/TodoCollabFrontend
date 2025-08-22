import React from 'react';
import { ListTodo } from 'lucide-react';

const KanbanPlaceholder = ({ totalTasks }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Kanban Board</h2>
    </div>
    <div className="p-6">
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ListTodo className="h-10 w-10 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {totalTasks > 0 ? 'Kanban Board Coming Soon' : 'Create Your First Task'}
        </h3>
        <p className="text-gray-500 dark:text-gray-300 max-w-md mx-auto">
          {totalTasks > 0
            ? 'Your interactive Kanban board with drag-and-drop functionality will appear here.'
            : 'Start organizing your work with tasks. Create your first task to see it here!'}
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
          {totalTasks > 0 ? 'View Board' : 'Create First Task'}
        </button>
      </div>
    </div>
  </div>
);

export default KanbanPlaceholder;
