import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTaskById,
  smartAssignTask,
  resolveConflict,
} from "../../redux/slices/taskSlice";
import axiosInstance from "../../helpers/axiosInstance";
import { createSubtask, deleteSubtask, fetchSubtasks, updateSubtask } from "../../redux/slices/subtasksSlice";
import { notyf } from "../../helpers/notifier";

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

  const fetchTask = useCallback(async () => {
    try {
      await dispatch(fetchTaskById(taskId)).unwrap();
      notyf.success("Task refreshed successfully");
    } catch (err) {
      console.error("Failed to fetch task:", err);
      notyf.error(err.message || "Failed to load task");
    }
  }, [dispatch, taskId]);

  // Fetch attachments
  const fetchAttachments = useCallback(async () => {
    setAttachmentLoading(true);
    try {
      const response = await axiosInstance.get(`/attachments/${taskId}`);
      setAttachments(response.data.data || []);
    } catch (error) {
      console.error("Error fetching attachments:", error);
      const errorMessage = error?.message || "Failed to fetch attachments.";
      notyf.error(errorMessage);
    } finally {
      setAttachmentLoading(false);
    }
  }, [taskId]);

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
      notyf.success("Attachment added successfully!");
      fetchAttachments();
    } catch (error) {
      console.error("Add attachment error:", error);
      const errorMessage = error?.message || "Failed to add attachment";
      notyf.error(errorMessage);
    } finally {
      setUploading(false);
    }
  }, [taskId, fetchAttachments]);

  // handle delete attachments
  const handleDeleteAttachment = useCallback(async (publicId) => {
    try {
      setDeletingId(publicId);
      await axiosInstance.delete(`/attachments/${taskId}?publicId=${publicId}`);
      notyf.success("Attachment deleted successfully!");
      fetchAttachments();
    } catch (err) {
      console.error("Delete attachment error:", err);
      const errorMessage = err?.message || "Failed to delete attachment";
      notyf.error(errorMessage);
    } finally {
      setDeletingId(null);
    }
  }, [taskId, fetchAttachments]);

  // New function to fetch comments
  const fetchComments = useCallback(async () => {
    setCommentsLoading(true);
    try {
      const response = await axiosInstance.get(`/comments/task/${taskId}`);
      setComments(response.data.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setCommentsLoading(false);
    }
  }, [taskId]);

  // New function to add a comment
  const handleAddComment = useCallback(async () => {
    if (!newComment.trim()) return;
    setAddingComment(true);
    try {
      await axiosInstance.post(`/comments/${taskId}`, { comment: newComment });
      setNewComment("");
      notyf.success("Comment added successfully!");
      fetchComments(); // Refresh comments list
    } catch (error) {
      console.error("Add comment error:", error);
      const errorMessage = error?.message || "Failed to add comment.";
      notyf.error(errorMessage);
    } finally {
      setAddingComment(false);
    }
  }, [taskId, newComment, fetchComments]);

  // New function to delete a comment
  const handleDeleteComment = useCallback(async (commentId) => {
    setDeletingCommentId(commentId);
    try {
      await axiosInstance.delete(`/comments/${commentId}`);
      notyf.success("Comment deleted successfully!");
      fetchComments(); // Refresh comments list
    } catch (error) {
      console.error("Delete comment error:", error);
      const errorMessage = error?.message || "Failed to delete comment.";
      notyf.error(errorMessage);
    } finally {
      setDeletingCommentId(null);
    }
  }, [fetchComments]);

  // handleAddSubtasks
  const handleAddSubtask = useCallback(async (title) => {
    try {
      setAddingSubtask(true);
      await dispatch(createSubtask({ taskId, subtaskData: { title } })).unwrap();
      notyf.success("Subtask added successfully!");
      dispatch(fetchSubtasks(taskId));
    } catch (error) {
      console.error("Add subtask error:", error);
      const errorMessage = error?.message || "Failed to add subtask.";
      notyf.error(errorMessage);
    } finally {
      setAddingSubtask(false);
    }
  }, [dispatch, taskId]);

  // handleUpdateSubtasks
  const handleUpdateSubtaskStatus = useCallback(async (subtaskId, status) => {
    try {
      setUpdatingSubtaskId(subtaskId);
      await dispatch(updateSubtask({ subtaskId, subtaskData: { status } })).unwrap();
      notyf.success(`Subtask marked as ${status.toLowerCase()}!`);
    } catch (error) {
      console.error("Update subtask error:", error);
      const errorMessage = error?.message || "Failed to update subtask.";
      notyf.error(errorMessage);
    } finally {
      setUpdatingSubtaskId(null);
    }
  }, [dispatch]);

  // handleDeleteSubtasks
  const handleDeleteSubtask = useCallback(async (subtaskId) => {
    try {
      setDeletingSubtaskId(subtaskId);
      await dispatch(deleteSubtask(subtaskId)).unwrap();
      notyf.success("Subtask deleted successfully!");
    } catch (error) {
      console.error("Delete subtask error:", error);
      const errorMessage = error?.message || "Failed to delete subtask.";
      notyf.error(errorMessage);
    } finally {
      setDeletingSubtaskId(null);
    }
  }, [dispatch]);

  const handleSmartAssign = useCallback(async () => {
    if (!selectedTask) {
      notyf.error("error", "No task selected.");
      return;
    }

    setSmartAssignLoading(true);
    try {
       await dispatch(
        smartAssignTask({
          taskId,
        })
      ).unwrap();

      notyf.success("Task smartly assigned successfully!");
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
        notyf.error( 
          "Conflict detected! Please resolve before proceeding."
        );
      } else {
        const errorMessage = error?.message || "Failed to smartly assign task.";
        notyf.error(errorMessage);
      }
    } finally {
      setSmartAssignLoading(false);
    }
  }, [dispatch, taskId, selectedTask]);

  const handleResolveConflict = useCallback(
    async (useServerVersion = false) => {
      if (!conflictData) {
        notyf.error("No conflict data available");
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
        notyf.success("Conflict resolved successfully!");
      } catch (error) {
        console.error("Resolve conflict error:", error);
        const errorMessage = error?.message || "Failed to resolve conflict.";
        notyf.error(errorMessage);
      } finally {
        setResolveLoading(false);
      }
    },
    [dispatch, taskId, conflictData]
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