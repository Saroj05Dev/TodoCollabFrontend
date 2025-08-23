import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefreshCw } from "lucide-react";
import {
  fetchTaskCount,
  fetchInProgressTask,
  fetchDoneTasks,
} from "../redux/slices/taskSlice";
import { fetchUserCount } from "../redux/slices/usersSlice";
import StatsGrid from "../components/dashboard/StatsGrid";
import TaskOverview from "../components/dashboard/TaskOverview";
import QuickActions from "../components/dashboard/QuickActions";
import KanbanPlaceholder from "../components/dashboard/KanbanPlaceholder";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    taskCount,
    inProgress,
    inProgressCount,
    done,
    doneCount,
    loading: taskLoading,
    error: taskError,
  } = useSelector((state) => state.task);
  const {
    userCount,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.users);

  const isLoading = taskLoading || userLoading;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchTaskCount()),
          dispatch(fetchInProgressTask()),
          dispatch(fetchDoneTasks()),
          dispatch(fetchUserCount()),
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchTaskCount());
    dispatch(fetchInProgressTask());
    dispatch(fetchDoneTasks());
    dispatch(fetchUserCount());
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <span className="text-2xl">🚀</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome to your collaborative task workspace
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors font-medium"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Error Display */}
      {(taskError || userError) && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400 text-sm">
            Error loading data:{" "}
            {taskError?.message || userError?.message || "Unknown error"}
          </p>
        </div>
      )}

      {/* Child Components */}
      <StatsGrid
        taskCount={taskCount}
        inProgress={inProgress}
        done={done}
        userCount={userCount}
        taskLoading={taskLoading}
        userLoading={userLoading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TaskOverview
          totalTasks={taskCount}
          inProgress={inProgress}
          inProgressCount={inProgressCount}
          done={done}
          completedCount={done?.length}
          doneCount={doneCount}
          isLoading={isLoading}
        />
        <QuickActions teamMembers={userCount} />
      </div>

      <KanbanPlaceholder totalTasks={taskCount} />
    </div>
  );
};

export default Dashboard;
