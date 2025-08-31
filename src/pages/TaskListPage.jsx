import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Loader,
  AlertTriangle,
  ClipboardList,
  Plus,
  Tag,
  Flag,
} from "lucide-react";
import { createTask, fetchTasks } from "../redux/slices/taskSlice";
import CreateTaskModal from "../components/Tasks/CreateTaskModal";
import axiosInstance from "../helpers/axiosInstance";

const TaskListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { all: tasks, loading, error } = useSelector((state) => state.task);

  // state for modal
  const [createOpen, setCreateOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/users");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [])

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "low":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "in progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "done":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  // handle create task API call
  const handleCreate = async (newTask) => {
    try {
      const createdTask = await dispatch(createTask(newTask)).unwrap();
      setCreateOpen(false);
      navigate(`/tasks/${createdTask._id}`);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600 dark:text-gray-300">
          Loading tasks...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertTriangle className="h-10 w-10 text-red-500 mb-2" />
        <p className="text-red-600 dark:text-red-400">
          {error.message || error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ClipboardList className="h-7 w-7 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            All Tasks
          </h1>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm"
        >
          <Plus className="h-4 w-4" /> New Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400">No tasks found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              onClick={() => navigate(`/tasks/${task._id}`)}
              className="cursor-pointer p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {task.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {task.description
                  ? task.description.slice(0, 80) + "..."
                  : "No description"}
              </p>
              <div className="flex gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  <Flag className="h-3 w-3" />
                  {task.priority}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  <Tag className="h-3 w-3" />
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
        users={users}
      />
    </div>
  );
};

export default TaskListPage;
