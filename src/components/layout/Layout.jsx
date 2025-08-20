import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Open by default on desktop, closed on mobile
  useEffect(() => {
    const apply = () => setIsSidebarOpen(window.innerWidth >= 1024);
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar onSidebarToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Shift content on desktop only when sidebar is open */}
        <main
          className={`flex-1 flex flex-col pt-16 transition-[margin] duration-300 ${
            isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
          }`}
        >
          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Layout;
