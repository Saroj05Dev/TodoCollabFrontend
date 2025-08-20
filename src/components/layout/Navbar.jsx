import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  CheckSquare, 
  ChevronDown,
  User,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ onSidebarToggle, isSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              TodoCollabBoard
            </h1>
          </div>
        </div>

        {/* Right side - Theme toggle and profile */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Open profile menu"
            >
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300 hidden sm:block" />
            </button>

            {isProfileOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">john@example.com</p>
                  </div>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;