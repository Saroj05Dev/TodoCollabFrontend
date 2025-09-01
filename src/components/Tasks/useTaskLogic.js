// TaskPage/hooks/useTaskLogic.js - Custom hook for task logic
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTaskById,
  smartAssignTask,
  resolveConflict,
} from "../../redux/slices/taskSlice";

export const useTaskLogic = (taskId) => {
  const dispatch = useDispatch();

  // Get task data from Redux store
  const {
    selectedTask,
    loading: reduxLoading,
    error: reduxError,
  } = useSelector((state) => state.task);

  // Local state for component-specific loading states
  const [smartAssignLoading, setSmartAssignLoading] = useState(false);
  const [conflictData, setConflictData] = useState(null);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [resolveLoading, setResolveLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  // Toast functionality
  const showToast = useCallback((type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: "", message: "" }), 3000);
  }, []);

  const fetchTask = useCallback(async () => {
    try {
      await dispatch(fetchTaskById(taskId)).unwrap();
      showToast("success", "Task loaded successfully");
    } catch (err) {
      console.error("Failed to fetch task:", err);
      showToast("error", err.message || "Failed to load task");
    }
  }, [dispatch, taskId, showToast]);

  const handleSmartAssign = useCallback(async () => {
    if (!selectedTask) {
      showToast("error", "No task selected");
      return;
    }

    setSmartAssignLoading(true);
    try {
      const result = await dispatch(
        smartAssignTask({
          taskId,
          // taskData: selectedTask
        })
      ).unwrap();

      showToast("success", "Task smartly assigned successfully!");
    } catch (error) {
      console.error("Smart assign error:", error);

      if (error.status === 409 || error.message?.includes("conflict")) {
        // Handle conflict - you might need to adjust this based on your API response structure
        setConflictData({
          yourVersion: selectedTask,
          serverVersion: error.conflictingVersion || {
            ...selectedTask,
            assignedUser: {
              _id: "server_user",
              name: "Server Assigned User",
              fullName: "Server Assigned User",
              email: "server@example.com",
            },
            lastModified: new Date(),
          },
        });
        setShowConflictModal(true);
        showToast(
          "error",
          "Conflict detected! Please resolve before proceeding."
        );
      } else {
        showToast("error", error.message || "Failed to assign task");
      }
    } finally {
      setSmartAssignLoading(false);
    }
  }, [dispatch, taskId, selectedTask, showToast]);

  const handleResolveConflict = useCallback(
    async (useServerVersion = false) => {
      if (!conflictData) {
        showToast("error", "No conflict data available");
        return;
      }

      setResolveLoading(true);
      try {
        await dispatch(
          resolveConflict({
            taskId,
            resolutionType: useServerVersion ? "overwrite" : "merge",
            task: useServerVersion ? conflictData.server : conflictData.client,
          })
        ).unwrap();

        // After resolving, fetch fresh task
        await dispatch(fetchTaskById(taskId)).unwrap();

        setShowConflictModal(false);
        setConflictData(null);
        showToast("success", "Conflict resolved successfully!");
      } catch (error) {
        console.error("Resolve conflict error:", error);
        showToast("error", error.message || "Failed to resolve conflict");
      } finally {
        setResolveLoading(false);
      }
    },
    [dispatch, taskId, conflictData, showToast]
  );

  const handleRefresh = useCallback(() => {
    fetchTask();
  }, [fetchTask]);

  return {
    task: selectedTask,
    loading: reduxLoading,
    error: reduxError,
    smartAssignLoading,
    conflictData,
    setConflictData,
    showConflictModal,
    setShowConflictModal,
    resolveLoading,
    toast,
    fetchTask,
    handleSmartAssign,
    handleResolveConflict,
    handleRefresh: fetchTask, // Refresh is just fetching the task again
  };
};
