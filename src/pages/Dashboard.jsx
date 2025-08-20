import { CheckSquare, Activity, ListTodo, TrendingUp, Users, Clock } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Tasks',
      value: '24',
      change: '+12% from last week',
      icon: CheckSquare,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'In Progress',
      value: '8',
      change: '3 due today',
      icon: Clock,
      color: 'text-orange-500 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      title: 'Completed',
      value: '16',
      change: 'Great progress!',
      icon: ListTodo,
      color: 'text-green-500 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Team Members',
      value: '6',
      change: '2 active now',
      icon: Users,
      color: 'text-purple-500 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
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
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <Activity className="h-5 w-5 text-gray-400 dark:text-gray-300" />
            </div>
          </div>
          <div className="p-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-gray-400 dark:text-gray-300" />
              </div>
              <p className="text-gray-500 dark:text-gray-300 mb-2">
                No recent activity
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-400">
                Your team activity will appear here
              </p>
            </div>
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
              Kanban Board Coming Soon
            </h3>
            <p className="text-gray-500 dark:text-gray-300 max-w-md mx-auto">
              Your interactive Kanban board with drag-and-drop functionality will appear here. 
              Create your first task to get started!
            </p>
            <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
              Create First Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;