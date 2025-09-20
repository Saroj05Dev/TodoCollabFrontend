import React from "react";
import {
  RefreshCw,
  Activity,
  User,
  Clock,
  AlertCircle,
  ChartColumn,
  Plus,
  Edit3,
  CheckSquare,
  Play,
  Pause,
  Trash2,
  Paperclip,
  MessageSquare,
  List,
  UserCheck,
  UserPlus,
} from "lucide-react";

const getActionIcon = (type) => {
  const base = "h-4 w-4";
  switch (type?.toLowerCase()) {
    case "created":
      return <Plus className={`${base} text-green-500`} />;
    case "updated":
      return <Edit3 className={`${base} text-blue-500`} />;
    case "completed":
      return <CheckSquare className={`${base} text-purple-500`} />;
    case "started":
      return <Play className={`${base} text-orange-500`} />;
    case "paused":
      return <Pause className={`${base} text-yellow-500`} />;
    case "deleted":
      return <Trash2 className={`${base} text-red-500`} />;
    case "attachment_added":
    case "attachment_deleted":
      return <Paperclip className={`${base} text-cyan-500`} />;
    case "comment_added":
    case "comment_deleted":
      return <MessageSquare className={`${base} text-indigo-500`} />;
    case "subtask_added":
    case "subtask_updated":
    case "subtask_deleted":
      return <List className={`${base} text-purple-500`} />;
      case "assigned":
      return <UserCheck className={`${base} text-purple-500`} />;
      case "member_invited":
      return <UserPlus className={`${base} text-green-500`} />;
    default:
      return <Activity className={`${base} text-gray-500`} />;
  }
};

const getActionText = (type) => {
  switch (type?.toLowerCase()) {
    case "created":
      return "created";
    case "updated":
      return "updated";
    case "completed":
      return "completed";
    case "started":
      return "started work on";
    case "paused":
      return "paused";
    case "deleted":
      return "deleted";
    case "comment_added":
      return "commented";
    case "attachment_added":
      return "added attachment to";
    case "attachment_deleted":
      return "deleted attachment from";
    case "subtask_added":
      return "added subtask to";
    case "subtask_updated":
      return "updated subtask in";
    case "subtask_deleted":
      return "deleted subtask from";
      case "assigned":
      return "assigned to";
      case "member_invited":
      return "invited";
    default:
      return type ? type.toLowerCase() : "performed action on";
  }
};

const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diff = Math.floor((now - time) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return time.toLocaleDateString();
};

export default function ActivityLogPresenter({
  activities,
  loading,
  error,
  refreshing,
  onRefresh,
}) {
  if (loading && !refreshing) {
    return (
      <div className="p-8 flex justify-center items-center">
        <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600 dark:text-gray-300">
          Loading activities...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Activity Log
            </h1>
            <ChartColumn className="h-5 w-5 text-gray-700 dark:text-white" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Track all recent task activities and team collaboration
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium"
        >
          <RefreshCw
            className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Error */}
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

      {/* Activities */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Activities
            </h2>
            <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full">
              {activities.length}
            </span>
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {activities.length === 0 ? (
            <div className="p-8 text-center">
              <Activity className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No activities found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Start working on tasks to see activity logs here
              </p>
            </div>
          ) : (
            activities.map((a) => (
              <div
                key={a._id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                    {getActionIcon(a.actionType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">
                        {a.user?.fullName || "Unknown"}
                      </span>{" "}
                      {getActionText(a.actionType)}{" "}
                      {a.task?.title ? (
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          "{a.task.title}"
                        </span>
                      ) : a.metadata?.teamName ? (
                        <span className="font-medium text-purple-600 dark:text-purple-400">
                          Team "{a.metadata.teamName}"
                        </span>
                      ) : a.metadata?.invitedEmail ? (
                        <span className="font-medium text-green-600 dark:text-green-400">
                          "{a.metadata.invitedEmail}"
                        </span>
                      ) : a.metadata?.subtaskTitle ? (
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                          Subtask "{a.metadata.subtaskTitle}"
                        </span>
                        ) : a.metadata?.commentText ? (
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                          Subtask "{a.metadata.commentText}"
                        </span>
                      ) : (
                        <span className="text-gray-500">Unknown</span>
                      )}
                    </p>

                    <div className="mt-1 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{a.user?.email || "No email"}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimeAgo(a.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
