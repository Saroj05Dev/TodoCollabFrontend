import React from 'react';
import { CheckSquare, Clock, ListTodo, Users } from 'lucide-react';
import { useSelector } from 'react-redux';

const StatsGrid = ({ taskCount, inProgress, done, taskLoading }) => {

  const { members, loading: memberLoading } = useSelector((state) => state.quickActions);
 
  const stats = [
    {
      title: 'Total Tasks',
      value: taskCount || 0,
      change: taskCount > 0 ? `${taskCount} tasks total` : 'No tasks yet',
      icon: CheckSquare,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      loading: taskLoading,
    },
    {
      title: 'In Progress',
      value: inProgress?.length || 0,
      change: inProgress?.length > 0 ? `${inProgress.length} active tasks` : 'No active tasks',
      icon: Clock,
      color: 'text-orange-500 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      loading: taskLoading,
    },
    {
      title: 'Completed',
      value: done?.length || 0,
      change: done?.length > 0 ? `${done.length} tasks done` : 'No completed tasks',
      icon: ListTodo,
      color: 'text-green-500 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      loading: taskLoading,
    },
    {
      title: 'Team Members',
      value: members?.length || 0,
      change: members?.length > 1 ? `${members.length} team members` : members?.length === 1 ? '1 team member' : 'No team members',
      icon: Users,
      color: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      loading: memberLoading,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow relative">
            {stat.loading && (
              <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 rounded-xl flex items-center justify-center">
                <span className="h-5 w-5 animate-spin text-gray-400">⏳</span>
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">{stat.title}</h3>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">{stat.change}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
