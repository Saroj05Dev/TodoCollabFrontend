import { useState } from "react";
import SignupModal from "../Auth/SignupModal";
import LoginModal from "../Auth/LoginModal"; // import Login modal
import {
  Sun,
  Moon,
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
  User,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";

export default function Navbar({ onSidebarToggle, isSidebarOpen }) {
  const { isDark, toggleTheme } = useTheme();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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

        {/* Right side: Theme toggle + Signup/Login */}
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

          {user ? (
            <div className="relative group">
              {/* Profile button */}
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium">
                <User className="w-5 h-5" />
                {user.fullName}
              </button>

              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button
                  onClick={() => dispatch(logoutUser())}
                  className="flex items-center gap-2 w-full px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Login button */}
              <button
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors font-medium"
              >
                <LogIn className="w-4 h-4" />
                Log In
              </button>

              {/* Signup button */}
              <button
                onClick={() => setIsSignupOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={() => {
          setIsSignupOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginOpen(false);
          setIsSignupOpen(true);
        }}
      />
    </>
  );
}
