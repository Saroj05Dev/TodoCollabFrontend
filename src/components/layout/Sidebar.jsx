import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Activity,
  Settings,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
    },
    { id: "tasks", label: "Tasks", icon: CheckSquare, href: "/tasks" },
    {
      id: "activity",
      label: "Activity Log",
      icon: Activity,
      href: "/recent-activities",
    },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    if (window.innerWidth < 1024) onClose();
      };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Sidebar"
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close button on small screens */}
        <button
          onClick={onClose}
          className="lg:hidden absolute right-2 top-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col h-full overflow-y-auto">
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                return (
                  <li key={item.id}>
                    <NavLink
                      to={item.href}
                      onClick={() => handleItemClick(item.id)}
                      className={({ isActive }) =>
                        `w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group
                      ${
                        isActive || activeItem === item.id
                          ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                      }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom tip */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-4 border border-blue-100 dark:border-blue-800/50">
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                💡 Pro Tip
              </h3>
              <p className="text-xs text-blue-700 dark:text-blue-200 leading-relaxed">
                Use drag & drop to organize tasks quickly!
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
