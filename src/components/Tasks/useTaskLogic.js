// TaskPage/hooks/useTaskLogic.js - Custom hook for task logic
import { useState, useCallback } from 'react';
import { mockTaskData } from './mockData';

export const useTaskLogic = (taskId) => {
  const [task, setTask] = useState(mockTaskData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [smartAssignLoading, setSmartAssignLoading] = useState(false);
  const [conflictData, setConflictData] = useState(null);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [resolveLoading, setResolveLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  // Toast functionality
  const showToast = useCallback((type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: '', message: '' }), 3000);
  }, []);

  const fetchTask = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Mock API call - replace with actual Redux dispatch
      // await dispatch(fetchTaskById(taskId)).unwrap();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('success', 'Task loaded successfully');
    } catch (err) {
      setError({ message: 'Failed to load task' });
      showToast('error', 'Failed to load task');
    } finally {
      setLoading(false);
    }
  }, [taskId, showToast]);

  const handleSmartAssign = useCallback(async () => {
    setSmartAssignLoading(true);
    try {
      // Mock API call - replace with actual Redux dispatch
      // await dispatch(smartAssignTask({ taskId, taskData: {} })).unwrap();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful assignment
      setTask(prev => ({
        ...prev,
        assignedUser: { 
          _id: '3', 
          name: 'Alex Brown', 
          fullName: 'Alex Brown', 
          email: 'alex@example.com' 
        },
        lastModified: new Date()
      }));
      
      showToast('success', 'Task smartly assigned successfully!');
    } catch (error) {
      if (error.status === 409) {
        // Mock conflict data
        setConflictData({
          yourVersion: task,
          serverVersion: {
            ...task,
            assignedUser: { 
              _id: '4', 
              name: 'Emily Davis', 
              fullName: 'Emily Davis', 
              email: 'emily@example.com' 
            },
            lastModified: new Date()
          }
        });
        setShowConflictModal(true);
        showToast('error', 'Conflict detected! Please resolve before proceeding.');
      } else {
        showToast('error', 'Failed to assign task');
      }
    } finally {
      setSmartAssignLoading(false);
    }
  }, [task, showToast]);

  const handleResolveConflict = useCallback(async (useServerVersion = false) => {
    setResolveLoading(true);
    try {
      // Mock API call - replace with actual Redux dispatch
      // await dispatch(resolveConflict(taskId)).unwrap();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const resolvedTask = useServerVersion ? conflictData.serverVersion : conflictData.yourVersion;
      setTask(resolvedTask);
      
      setShowConflictModal(false);
      setConflictData(null);
      showToast('success', 'Conflict resolved successfully!');
    } catch (error) {
      showToast('error', 'Failed to resolve conflict');
    } finally {
      setResolveLoading(false);
    }
  }, [conflictData, showToast]);

  const handleRefresh = useCallback(() => {
    fetchTask();
  }, [fetchTask]);

  return {
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
  };
};