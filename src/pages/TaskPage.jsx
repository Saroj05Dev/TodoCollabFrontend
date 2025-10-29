import React, { useState, useEffect } from "react";
import { ArrowLeft, Loader, AlertTriangle } from "lucide-react";
import TaskHeader from "../components/Tasks/TaskHeader";
import TaskDetailsCard from "../components/Tasks/TaskDetailsCard";
import RecentActivityCard from "../components/Tasks/RecentActivityCard";
import ConflictModal from "../components/Tasks/ConflictModal";
import { useTaskLogic } from "../components/Tasks/useTaskLogic";
import { useNavigate, useParams } from "react-router-dom";
import EditTaskModal from "../components/Tasks/EditTaskModal";
import { updateTask } from "../redux/slices/taskSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "../helpers/axiosInstance";
import CommentSection from "../components/Tasks/CommentSection";
import SubtasksSection from "../components/Tasks/SubtasksSection";

const TaskPage = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    task,
    loading,
    error,
    smartAssignLoading,
    conflictData,
    setConflictData,
    showConflictModal,
    setShowConflictModal,
    resolveLoading,
    handleSmartAssign,
    handleResolveConflict,
    handleRefresh,
    attachments,
    attachmentLoading,
    uploading,
    deletingId,
    handleAddAttachments,
    handleDeleteAttachment,
    fetchAttachments,
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
    subtasksLoading,
    addingSubtask,
    deletingSubtaskId,
    updatingSubtaskId,
    handleAddSubtask,
    handleUpdateSubtaskStatus,
    handleDeleteSubtask,
  } = useTaskLogic(taskId);

  const [recentActivities, setRecentActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);

  // states for edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (taskId) {
      handleRefresh();
      fetchRecentActivities();
      fetchAttachments();
    }
  }, [taskId, handleRefresh, fetchAttachments]);


  const handleEdit = () => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const handleSave = async (updatedTask) => {
    try {
      await dispatch(updateTask({ taskId, taskData: updatedTask })).unwrap();
      // Success -> Close modal
      setEditOpen(false);
      handleRefresh(); // refresh task details
    } catch (error) {
      console.log("update error", error);
      // If it's a conflict -> open modal
      if (error?.type === "conflict") {
        setConflictData({
          yourVersion: error.clientVersion,
          serverVersion: error.serverVersion,
        });
        setShowConflictModal(true);
      } else {
        console.error("Failed to update task:", error);
      }
    }
  };

  const fetchRecentActivities = async () => {
    setActivitiesLoading(true);
    try {
      const res = await axiosInstance.get("/actions");
      const allActivities = res.data.data || [];
      // Show only first five in the card initially
      setRecentActivities(allActivities.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      setRecentActivities([]);
    } finally {
      setActivitiesLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600 dark:text-gray-300">
            Loading task...
          </span>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {error ? "Error Loading Task" : "Task Not Found"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error?.message || "The requested task could not be found."}
          </p>
          <button
            onClick={() => navigate("/tasks")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Back to Tasks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      <TaskHeader onNavigate={navigate} />

      <TaskDetailsCard
        task={task}
        onEdit={handleEdit}
        smartAssignLoading={smartAssignLoading}
        uploading={uploading}
        deletingId={deletingId}
        loading={loading}
        onSmartAssign={handleSmartAssign}
        onRefresh={handleRefresh}
        attachments={attachments}
        handleAddAttachment={handleAddAttachments}
        handleDeleteAttachment={handleDeleteAttachment}
        attachmentLoading={attachmentLoading}
      />

      <SubtasksSection
        subtasks={subtasks}
        subtasksLoading={subtasksLoading}
        taskCreatorId={task.createdBy?._id || task.createdBy}
        taskAssigneeId={task.assignedUser?._id || task.assignedUser}
        userId={userId}
        handleAddSubtask={handleAddSubtask}
        handleUpdateSubtaskStatus={handleUpdateSubtaskStatus}
        handleDeleteSubtask={handleDeleteSubtask}
        addingSubtask={addingSubtask}
        deletingSubtaskId={deletingSubtaskId}
        updatingSubtaskId={updatingSubtaskId}
      />

      {/* New Comments Section Component */}
      <CommentSection
        comments={comments}
        commentsLoading={commentsLoading}
        newComment={newComment}
        setNewComment={setNewComment}
        addingComment={addingComment}
        deletingCommentId={deletingCommentId}
        userId={userId}
        taskCreatorId={task.createdBy?._id}
        taskAssigneeId={task.assignedUser?._id}
        handleAddComment={handleAddComment}
        handleDeleteComment={handleDeleteComment}
      />

      <RecentActivityCard activities={recentActivities} onNavigate={navigate} />

      {showConflictModal && (
        <ConflictModal
          conflictData={conflictData}
          resolveLoading={resolveLoading}
          onResolveConflict={handleResolveConflict}
          onClose={() => setShowConflictModal(false)}
          onOpenChange={(open) => {
            if (open) {
              setEditOpen(false); // Close edit modal if conflict modal is opened
            }
          }}
        />
      )}

      <EditTaskModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        task={selectedTask}
        onSave={handleSave}
      />
    </div>
  );
};

export default TaskPage;
