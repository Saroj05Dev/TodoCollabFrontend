import Layout from "./components/layout/Layout"
import { ThemeProvider } from "./context/ThemeContext"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <ThemeProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  )
}

export default App
