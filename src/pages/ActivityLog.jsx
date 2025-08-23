import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  Activity, 
  User, 
  Clock, 
  CheckSquare, 
  Plus, 
  Edit3, 
  Trash2, 
  Play, 
  Pause,
  AlertCircle
} from 'lucide-react';
import axiosInstance from '../helpers/axiosInstance';

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchActivities = async (showRefreshLoader = false) => {
    if (showRefreshLoader) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await axiosInstance.get("/actions");
      if (res.data.success) {
        setActivities(res.data.data);
        setError(null);
      } else {
        throw new Error(res.data.message || "Failed to fetch activities");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch activities");
      console.error("Error fetching activities:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  const getActionIcon = (actionType) => {
    const iconProps = { className: "h-4 w-4" };
    
    switch (actionType?.toLowerCase()) {
      case 'created':
        return <Plus {...iconProps} className="h-4 w-4 text-green-500" />;
      case 'updated':
        return <Edit3 {...iconProps} className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckSquare {...iconProps} className="h-4 w-4 text-purple-500" />;
      case 'started':
        return <Play {...iconProps} className="h-4 w-4 text-orange-500" />;
      case 'paused':
        return <Pause {...iconProps} className="h-4 w-4 text-yellow-500" />;
      case 'deleted':
        return <Trash2 {...iconProps} className="h-4 w-4 text-red-500" />;
      default:
        return <Activity {...iconProps} className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionColor = (actionType) => {
    switch (actionType?.toLowerCase()) {
      case 'created':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'updated':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'completed':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
      case 'started':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'paused':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'deleted':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return time.toLocaleDateString();
  };

  const getActionText = (actionType) => {
    switch (actionType?.toLowerCase()) {
      case 'created': return 'created';
      case 'updated': return 'updated';
      case 'completed': return 'completed';
      case 'started': return 'started work on';
      case 'paused': return 'paused';
      case 'deleted': return 'deleted';
      default: return 'performed action on';
    }
  };

  const handleRefresh = () => {
    fetchActivities(true);
  };

  if (loading && !refreshing) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Activity Log</h1>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Track all recent task activities and team collaboration</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex items-center justify-center">
            <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
            <span className="ml-3 text-lg text-gray-600 dark:text-gray-300">Loading activities...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Activity Log</h1>
            <span className="text-2xl">📊</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">Track all recent task activities and team collaboration</p>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <p className="text-red-600 dark:text-red-400 text-sm">
              Error loading activities: {error}
            </p>
          </div>
        </div>
      )}

      {/* Activity Feed */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activities</h2>
            <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full">
              {activities.length}
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {activities.length === 0 ? (
            <div className="p-8 text-center">
              <Activity className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No activities found</h3>
              <p className="text-gray-600 dark:text-gray-400">Start working on tasks to see activity logs here</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start gap-4">
                  {/* Action Icon */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center ${getActionColor(activity.actionType)}`}>
                    {getActionIcon(activity.actionType)}
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          <span className="font-medium">{activity.user?.fullName || 'Unknown User'}</span>
                          <span className="mx-1 text-gray-600 dark:text-gray-400">{getActionText(activity.actionType)}</span>
                          <span className="font-medium text-blue-600 dark:text-blue-400">"{activity.task?.title || 'Unknown Task'}"</span>
                        </p>
                        
                        <div className="mt-1 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{activity.user?.email || 'No email'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimeAgo(activity.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Type Badge */}
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-4 ${
                        activity.actionType?.toLowerCase() === 'created' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                        activity.actionType?.toLowerCase() === 'updated' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                        activity.actionType?.toLowerCase() === 'completed' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                        activity.actionType?.toLowerCase() === 'started' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' :
                        activity.actionType?.toLowerCase() === 'paused' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                        activity.actionType?.toLowerCase() === 'deleted' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                        'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                      }`}>
                        {activity.actionType?.toUpperCase() || 'UNKNOWN'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {activities.length > 0 && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Showing {activities.length} most recent activities
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;