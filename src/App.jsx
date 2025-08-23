import Layout from "./components/layout/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import ActivityLog from "./pages/ActivityLog";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recent-activities" element={<ActivityLog />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
