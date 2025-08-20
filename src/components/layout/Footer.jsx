import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>© 2025 TodoCollabBoard</span>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-600">•</span>
            <span className="text-xs">Built with ❤️ for productivity</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <button className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Help
            </button>
            <button className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Privacy
            </button>
            <button className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;