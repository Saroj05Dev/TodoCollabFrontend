import React, { useState, useEffect } from 'react';
import { ArrowLeft, Loader, AlertTriangle } from 'lucide-react';
import TaskHeader from '../components/Tasks/TaskHeader';
import TaskDetailsCard from '../components/Tasks/TaskDetailsCard';
import RecentActivityCard from '../components/Tasks/RecentActivityCard';
import ConflictModal from '../components/Tasks/ConflictModal';
import Toast from '../components/Tasks/Toast';
import { useTaskLogic } from '../components/Tasks/useTaskLogic';
import { useParams } from 'react-router-dom';
import EditTaskModal from '../components/Tasks/EditTaskModal';

const TaskPage = ({ onNavigate = () => {}, onEdit = () => {} }) => {
  const { taskId } = useParams();
  
  const {
    task,
    loading,
    error,
    smartAssignLoading,
    conflictData,
    showConflictModal,
    setShowConflictModal,
    resolveLoading,
    toast,
    fetchTask,
    handleSmartAssign,
    handleResolveConflict,
    handleRefresh
  } = useTaskLogic(taskId);

  const [recentActivities, setRecentActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);

  // states for edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    if (taskId) {
      fetchTask();
      // fetchRecentActivities(); // You can implement this later
    }
  }, [taskId, fetchTask]);

  const handleEdit = () => {
    setSelectedTask(task);
    setEditOpen(true);
  }

  const handleSave = (updatedTask) => {
    // Call your update api here
    console.log("saving task:", updatedTask)

    // after api success
    setEditOpen(false);
    fetchTask(); // refresh task detials
  }

  const fetchRecentActivities = async () => {
    setActivitiesLoading(true);
    try {
      // For now, we'll use empty array. Later you can add:
      // const response = await axiosInstance.get(`/tasks/${taskId}/activities`);
      // setRecentActivities(response.data.data);
      setRecentActivities([]); // Empty for now
    } catch (error) {
      console.error('Failed to fetch activities:', error);
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
          <span className="text-lg text-gray-600 dark:text-gray-300">Loading task...</span>
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
            {error ? 'Error Loading Task' : 'Task Not Found'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error?.message || 'The requested task could not be found.'}
          </p>
          <button
            onClick={() => onNavigate('/tasks')}
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
      <Toast toast={toast} />
      
      <TaskHeader onNavigate={onNavigate} />
      
      <TaskDetailsCard
        task={task}
        onEdit={handleEdit}
        smartAssignLoading={smartAssignLoading}
        loading={loading}
        onSmartAssign={handleSmartAssign}
        onRefresh={handleRefresh}
      />
      
      <RecentActivityCard
        activities={recentActivities}
        onNavigate={onNavigate}
      />
      
      {showConflictModal && (
        <ConflictModal
          conflictData={conflictData}
          resolveLoading={resolveLoading}
          onResolveConflict={handleResolveConflict}
          onClose={() => setShowConflictModal(false)}
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