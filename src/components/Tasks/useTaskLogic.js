import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTaskById,
  smartAssignTask,
  resolveConflict,
} from "../../redux/slices/taskSlice";
import axiosInstance from "../../helpers/axiosInstance";
import { createSubtask, deleteSubtask, fetchSubtasks, updateSubtask } from "../../redux/slices/subtasksSlice";

export const useTaskLogic = (taskId) => {
  const dispatch = useDispatch();
  // get the userId from the Redux store
  const authState = useSelector((state) => state.auth);
  const userId = authState.user ? authState.user.id : null;

  // Get task data from Redux store
  const {
    selectedTask,
    loading: reduxLoading,
    error: reduxError,
  } = useSelector((state) => state.task);

  // Local state for component-specific states
  const [smartAssignLoading, setSmartAssignLoading] = useState(false);
  const [conflictData, setConflictData] = useState(null);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [resolveLoading, setResolveLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [attachments, setAttachments] = useState([]);
  const [attachmentLoading, setAttachmentLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  
  // state for comments
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  // state for subtasks
  const { subtasks, loading: subtasksLoadingState } = useSelector((state) => state.subtasks);
  const [addingSubtask, setAddingSubtask] = useState(false);
  const [deletingSubtaskId, setDeletingSubtaskId] = useState(null);
  const [updatingSubtaskId, setUpdatingSubtaskId] = useState(null);

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

  // New function to fetch comments
  const fetchComments = useCallback(async () => {
    setCommentsLoading(true);
    try {
      const response = await axiosInstance.get(`/comments/task/${taskId}`);
      setComments(response.data.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      showToast("error", "Failed to fetch comments");
    } finally {
      setCommentsLoading(false);
    }
  }, [taskId, showToast]);

  // New function to add a comment
  const handleAddComment = useCallback(async () => {
    if (!newComment.trim()) return;
    setAddingComment(true);
    try {
      await axiosInstance.post(`/comments/${taskId}`, { comment: newComment });
      setNewComment("");
      showToast("success", "Comment added successfully!");
      fetchComments(); // Refresh comments list
    } catch (error) {
      console.error("Add comment error:", error);
      showToast("error", "Failed to add comment.");
    } finally {
      setAddingComment(false);
    }
  }, [taskId, newComment, showToast, fetchComments]);

  // New function to delete a comment
  const handleDeleteComment = useCallback(async (commentId) => {
    setDeletingCommentId(commentId);
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      showToast("success", "Comment deleted successfully!");
      fetchComments(); // Refresh comments list
    } catch (error) {
      console.error("Delete comment error:", error);
      showToast("error", "Failed to delete comment.");
    } finally {
      setDeletingCommentId(null);
    }
  }, [showToast, fetchComments]);

  // handleAddSubtasks
  const handleAddSubtask = useCallback(async (title) => {
    try {
      setAddingSubtask(true);
      await dispatch(createSubtask({ taskId, subtaskData: { title } })).unwrap();
      showToast("success", "Subtask added successfully!");
      dispatch(fetchSubtasks(taskId));
    } catch (error) {
      console.error("Add subtask error:", error);
      showToast("error", error.message || "Failed to add subtask.");
    } finally {
      setAddingSubtask(false);
    }
  }, [dispatch, taskId, showToast]);

  // handleUpdateSubtasks
  const handleUpdateSubtaskStatus = useCallback(async (subtaskId, status) => {
    try {
      setUpdatingSubtaskId(subtaskId);
      await dispatch(updateSubtask({ subtaskId, subtaskData: { status } })).unwrap();
      showToast("success", "Subtask updated successfully!");
    } catch (error) {
      console.error("Update subtask error:", error);
      showToast("error", error.message || "Failed to update subtask.");
    } finally {
      setUpdatingSubtaskId(null);
    }
  }, [dispatch, showToast]);

  // handleDeleteSubtasks
  const handleDeleteSubtask = useCallback(async (subtaskId) => {
    try {
      setDeletingSubtaskId(subtaskId);
      await dispatch(deleteSubtask(subtaskId)).unwrap();
      showToast("success", "Subtask deleted successfully!");
    } catch (error) {
      console.error("Delete subtask error:", error);
      showToast("error", error.message || "Failed to delete subtask.");
    } finally {
      setDeletingSubtaskId(null);
    }
  }, [dispatch, showToast]);

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
        })
      ).unwrap();

      showToast("success", "Task smartly assigned successfully!");
    } catch (error) {
      console.error("Smart assign error:", error);

      if (error.status === 409 || error.message?.includes("conflict")) {
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
    fetchComments();
    dispatch(fetchSubtasks(taskId));
  }, [fetchTask, fetchComments, dispatch, taskId]);

  useEffect(() => {
    if(taskId) {
      handleRefresh();
    }
  }, [taskId, handleRefresh]);

  return {
    task: selectedTask,
    loading: reduxLoading || subtasksLoadingState === "pending",
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
    handleRefresh,
    attachments,
    attachmentLoading,
    uploading,
    deletingId,
    fetchAttachments,
    handleAddAttachments,
    handleDeleteAttachment,
    comments,
    commentsLoading,
    newComment,
    setNewComment,
    addingComment,
    deletingCommentId,
    userId,
    handleAddComment,
    handleDeleteComment,
    subtasks,
    subtasksLoading: subtasksLoadingState === 'pending',
    addingSubtask,
    deletingSubtaskId,
    updatingSubtaskId,
    handleAddSubtask,
    handleUpdateSubtaskStatus,
    handleDeleteSubtask, 
  };
};