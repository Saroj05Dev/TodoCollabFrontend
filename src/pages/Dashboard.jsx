import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckSquare, Activity, ListTodo, TrendingUp, Users, Clock, RefreshCw } from 'lucide-react';
import { fetchTaskCount, fetchInProgressTask, fetchDoneTasks } from '../redux/slices/taskSlice';
import { fetchUserCount } from '../redux/slices/usersSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  
  // Redux state selectors
  const { taskCount, inProgress, done, loading: taskLoading, error: taskError } = useSelector(state => state.task);
  const { userCount, loading: userLoading, error: userError } = useSelector(state => state.users);
  
  // Calculate stats from Redux state
  const totalTasks = taskCount || 0;
  const inProgressCount = inProgress?.length || 0;
  const completedCount = done?.length || 0;
  const teamMembers = userCount || 0;
  
  // Check if any data is loading
  const isLoading = taskLoading || userLoading;
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchTaskCount()),
          dispatch(fetchInProgressTask()),
          dispatch(fetchDoneTasks()),
          dispatch(fetchUserCount())
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    
    fetchData();
  }, [dispatch]);

  // Refresh data function
  const handleRefresh = () => {
    dispatch(fetchTaskCount());
    dispatch(fetchInProgressTask());
    dispatch(fetchDoneTasks());
    dispatch(fetchUserCount());
  };

  // Dynamic stats based on Redux state
  const stats = [
    {
      title: 'Total Tasks',
      value: totalTasks.toString(),
      change: totalTasks > 0 ? `${totalTasks} tasks total` : 'No tasks yet',
      icon: CheckSquare,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      loading: taskLoading,
    },
    {
      title: 'In Progress',
      value: inProgressCount.toString(),
      change: inProgressCount > 0 ? `${inProgressCount} active tasks` : 'No active tasks',
      icon: Clock,
      color: 'text-orange-500 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      loading: taskLoading,
    },
    {
      title: 'Completed',
      value: completedCount.toString(),
      change: completedCount > 0 ? `${completedCount} tasks done` : 'No completed tasks',
      icon: ListTodo,
      color: 'text-green-500 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      loading: taskLoading,
    },
    {
      title: 'Team Members',
      value: teamMembers.toString(),
      change: teamMembers > 1 ? `${teamMembers} team members` : teamMembers === 1 ? '1 team member' : 'No team members',
      icon: Users,
      color: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      loading: userLoading,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header with refresh button */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <span className="text-2xl">🚀</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome to your collaborative task workspace
          </p>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Error Display */}
      {(taskError || userError) && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400 text-sm">
            Error loading data: {taskError?.message || userError?.message || 'Unknown error'}
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow relative"
            >
              {stat.loading && (
                <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 rounded-xl flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 animate-spin text-gray-400" />
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  {stat.title}
                </h3>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Shows task progress */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Task Overview
              </h2>
              <Activity className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            </div>
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
                    <span>{totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                
                {/* Task Breakdown */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalTasks}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-500 dark:text-orange-400">{inProgressCount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">In Progress</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-500 dark:text-green-400">{completedCount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Completed</p>
                  </div>
                </div>

                {/* Recent Tasks List */}
                {inProgress.length > 0 && (
                  <div className="pt-4">
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">Recent Tasks</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {inProgress.slice(0, 3).map((task, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-200 truncate">
                            {task.title || task.name || `Task ${index + 1}`}
                          </span>
                        </div>
                      ))}
                      {inProgress.length > 3 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                          +{inProgress.length - 3} more tasks
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-8 w-8 text-gray-400 dark:text-gray-300" />
                </div>
                <p className="text-gray-500 dark:text-gray-300 mb-2">
                  No tasks yet
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-400">
                  Create your first task to get started
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Quick Actions
            </h2>
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
      </div>

      {/* Kanban Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Your Kanban Board
          </h2>
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
                : 'Start organizing your work with tasks. Create your first task to see it here!'
              }
            </p>
            <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
              {totalTasks > 0 ? 'View Board' : 'Create First Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;