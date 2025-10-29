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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar onSidebarToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="flex flex-1"> 
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <main
          className={`flex-1 flex flex-col transition-[margin] duration-300 min-h-0 pt-16 ${
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