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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recent-activities" element={<ActivityLogContainer />} />
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="/tasks/:taskId" element={<TaskPage />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
