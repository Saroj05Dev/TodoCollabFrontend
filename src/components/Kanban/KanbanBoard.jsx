import React, { useState, useEffect } from "react";
import { Activity, RefreshCw, AlertCircle } from "lucide-react";
import axiosInstance from "../../helpers/axiosInstance";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = () => {
  const STATUSES = ["Todo", "In Progress", "Done"];

  const [tasks, setTasks] = useState(
    STATUSES.reduce((acc, s) => ({ ...acc, [s]: [] }), {})
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const columns = STATUSES.map((s) => ({ id: s, title: s }));

  // Fetch tasks
  const fetchTasks = async (showRefreshing = false) => {
    try {
      if (showRefreshing) setRefreshing(true);
      else setLoading(true);

      setError(null);

      const responses = await Promise.all([
        axiosInstance.get("/tasks/search?status=Todo"),
        axiosInstance.get("/tasks/search?status=In Progress"),
        axiosInstance.get("/tasks/search?status=Done"),
      ]);

      setTasks({
        Todo: responses[0]?.data?.data || [],
        "In Progress": responses[1]?.data?.data || [],
        Done: responses[2]?.data?.data || [],
      });
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axiosInstance.put(`/tasks/${taskId}`, { status: newStatus });
    } catch (err) {
      setError("Failed to update task. Changes reverted.");
      await fetchTasks();
    }
  };

  // Drag handlers
  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", task._id);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();

    if (!draggedTask || draggedTask.status === newStatus) {
      setDraggedTask(null);
      return;
    }

    const oldStatus = draggedTask.status;
    const updatedTask = { ...draggedTask, status: newStatus };

    setTasks((prev) => ({
      ...prev,
      [oldStatus]: (prev[oldStatus] || []).filter(
        (t) => t._id !== draggedTask._id
      ),
      [newStatus]: [...(prev[newStatus] || []), updatedTask],
    }));

    if (draggedTask._id && draggedTask._id.length === 24) {
      await updateTaskStatus(draggedTask._id, newStatus);
    } else {
      console.warn("Skipping update, invalid taskId:", draggedTask._id);
    }
    setDraggedTask(null);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = STATUSES.reduce(
    (sum, s) => sum + (tasks[s]?.length || 0),
    0
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Kanban Board
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Drag and drop tasks to update status • {totalTasks} tasks
          </p>
        </div>
        <button
          onClick={() => fetchTasks(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium"
        >
          <RefreshCw
            className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="text-sm text-red-800 dark:text-red-400">
              {error}
            </span>
          </div>
        </div>
      )}

      {/* Board */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map((col) => (
            <KanbanColumn
              key={col.id}
              title={col.title}
              status={col.id}
              tasks={tasks[col.id] || []}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragStart={handleDragStart}
              onDragEnd={() => setDraggedTask(null)}
            />
          ))}
        </div>

        {totalTasks === 0 && !loading && (
          <div className="text-center py-12 mt-8 text-gray-500 dark:text-gray-400">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No tasks yet</h3>
            <p className="text-sm">Create your first task to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;
