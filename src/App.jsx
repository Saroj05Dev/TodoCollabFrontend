import Layout from "./components/layout/Layout";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import SignupModal from "./components/Auth/SignupModal";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<SignupModal />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
