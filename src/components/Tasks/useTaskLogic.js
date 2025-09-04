import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTaskById,
  smartAssignTask,
  resolveConflict,
} from "../../redux/slices/taskSlice";
import axiosInstance from "../../helpers/axiosInstance";

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
  const [attachments, setAttachments] = useState([]);
  const [attachmentLoading, setAttachmentLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

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

  // Fetch attachments
  const fetchAttachments = useCallback(async () => {
    setAttachmentLoading(true);
    try {
      const response = await axiosInstance.get(`/attachments/${taskId}`);
      setAttachments(response.data.data || []);
    } catch (error) {
      console.error("Error fetching attachments:", error);
      showToast("error", "Failed to fetch attachments");
    } finally {
      setAttachmentLoading(false);
    }
  }, [taskId, showToast]);

  // handle add attachments
  const handleAddAttachments = useCallback(async (file) => {
    if(!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      setUploading(true);
      await axiosInstance.post(`/attachments/${taskId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showToast("success", "Attachments added successfully!");
      fetchAttachments();
    } catch (error) {
      console.error("Add attachment error:", error);
      showToast("error", "Failed to add attachments");
    } finally {
      setUploading(false);
    }
  }, [taskId, showToast, fetchAttachments]);

  // handle delete attachments
  const handleDeleteAttachment = useCallback(async (publicId) => {
    try {
      setDeletingId(publicId);
      await axiosInstance.delete(`/attachments/${taskId}?publicId=${publicId}`);
      showToast("success", "Attachment deleted!");
      fetchAttachments();
    } catch (err) {
      console.error("Delete attachment error:", err);
      showToast("error", "Failed to delete attachment");
    } finally {
      setDeletingId(null);
    }
  }, [taskId, fetchAttachments, showToast]);

  const handleSmartAssign = useCallback(async () => {
    if (!selectedTask) {
      showToast("error", "No task selected");
      return;
    }

    setSmartAssignLoading(true);
    try {
       await dispatch(
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
            resolutionType: "overwrite",
            task: useServerVersion ? conflictData.serverVersion : conflictData.yourVersion,
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
    handleRefresh: fetchTask,
    attachments,
    attachmentLoading,
    uploading,
    deletingId,
    fetchAttachments,
    handleAddAttachments,
    handleDeleteAttachment
  };
};
