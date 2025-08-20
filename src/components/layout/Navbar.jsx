import { useState } from "react";
import SignupModal from "../Auth/SignupModal";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar({ onSidebarToggle, isSidebarOpen }) {
  const { isDark, toggleTheme } = useTheme();
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  // Icon color based on theme
  const iconColor = isDark ? "text-white" : "text-gray-600";

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 fixed top-0 left-0 right-0 z-50 shadow-sm flex justify-between items-center">
        {/* Left side: Sidebar toggle + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <X className={`h-5 w-5 ${iconColor}`} />
            ) : (
              <Menu className={`h-5 w-5 ${iconColor}`} />
            )}
          </button>

          <h1 className="text-xl font-bold hidden sm:block text-gray-900 dark:text-white">
            TodoCollabBoard
          </h1>
        </div>

        {/* Right side: Theme toggle + Signup */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-white" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600 dark:text-white" />
            )}
          </button>

          {/* Sign Up button */}
          <button
            onClick={() => setIsSignupOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Signup Modal */}
      <SignupModal isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
    </>
  );
}
