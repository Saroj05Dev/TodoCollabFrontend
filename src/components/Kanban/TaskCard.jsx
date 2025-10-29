import React from "react";
import { User } from "lucide-react";

const TaskCard = ({ task, onDragStart, onDragEnd }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "In Progress":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "Done":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "To Do":
        return "bg-blue-500";
      case "In Progress":
        return "bg-orange-500";
      case "Done":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getInitials = (name) => {
    return name ? name.split(" ").map((n) => n[0]).join("").toUpperCase() : "U";
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm cursor-grab transition-all duration-200 hover:shadow-md group"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-gray-900 dark:text-white text-sm leading-tight flex-1 pr-2">
          {task.title}
        </h4>
        <div
          className={`w-3 h-3 rounded-full ${getStatusDot(task.status)} flex-shrink-0`}
        />
      </div>

      {task.assignee && (
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-white">
              {getInitials(task.assignee)}
            </span>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {task.assignee}
          </span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            task.status
          )}`}
        >
          {task.status}
        </span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <User className="h-3 w-3 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
