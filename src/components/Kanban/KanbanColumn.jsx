import React, { useState } from "react";
import TaskCard from "./TaskCard";

const KanbanColumn = ({ title, tasks, status, onDrop, onDragOver, onDragStart, onDragEnd }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const getColumnHeaderColor = (status) => {
    switch (status) {
      case "To Do":
        return "text-blue-700 dark:text-blue-400";
      case "In Progress":
        return "text-orange-700 dark:text-orange-400";
      case "Done":
        return "text-green-700 dark:text-green-400";
      default:
        return "text-gray-700 dark:text-gray-400";
    }
  };

  const getColumnBorderColor = (status) => {
    switch (status) {
      case "To Do":
        return "border-blue-200 dark:border-blue-800/50";
      case "In Progress":
        return "border-orange-200 dark:border-orange-800/50";
      case "Done":
        return "border-green-200 dark:border-green-800/50";
      default:
        return "border-gray-200 dark:border-gray-700";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
    onDragOver(e);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(e, status);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className={`font-semibold text-lg ${getColumnHeaderColor(status)}`}>
          {title}
        </h3>
        <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm px-2 py-1 rounded-full font-medium">
          {tasks.length}
        </span>
      </div>

      {/* Drop Zone */}
      <div
        className={`
          flex-1 bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4 min-h-[500px]
          border-2 border-dashed transition-all duration-200
          ${
            isDragOver
              ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20 scale-[1.02]"
              : getColumnBorderColor(status)
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
              {status === "To Do" && "No tasks to do"}
              {status === "In Progress" && "No tasks in progress"}
              {status === "Done" && "No completed tasks"}
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
