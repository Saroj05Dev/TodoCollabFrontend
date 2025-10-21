import { useDispatch } from "react-redux";
import Layout from "./components/layout/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "./redux/slices/authSlice";
import TaskPage from "./pages/TaskPage";
import TaskListPage from "./pages/TaskListPage";
import ActivityLogContainer from "./pages/ActivityLogContainer";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import SettingsPage from "./pages/SettingsPage";
import axiosInstance from "./helpers/axiosInstance";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // KEEP-ALIVE LOGIC: Ping the backend every 14 minutes to prevent idle spin-down.
  useEffect(() => {
    const PING_INTERVAL = 840000; // 14 minutes in milliseconds

    const pingBackend = async () => {
      try {
        // Send a simple GET request to the backend's base URL
        await axiosInstance.get("/");
        console.log("Backend ping successful - Server kept alive.");
      } catch (error) {
        // Log the error but continue running the timer
        console.warn("Backend ping failed. Server may be spinning up or down.", error.message);
      }
    };

    // Run once immediately to start the server
    pingBackend();

    // Set up the interval
    const intervalId = setInterval(pingBackend, PING_INTERVAL);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  // END OF KEEP-ALIVE LOGIC
  
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          { /** Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/recent-activities" element={<ActivityLogContainer />} />
            <Route path="/tasks" element={<TaskListPage />} />
            <Route path="/tasks/:taskId" element={<TaskPage />} />
            <Route path="/settings" element={<SettingsPage />}/>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
