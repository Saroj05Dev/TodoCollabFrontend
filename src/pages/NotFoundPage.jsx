import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-9xl font-extrabold text-blue-600 dark:text-blue-400 leading-none">
          404
        </h1>
        <h2 className="text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-100 sm:text-4xl">
          Page Not Found
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Oops! It looks like you've stumbled upon a page that doesn't exist.
          Don't worry, it happens to the best of us.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 mt-4 text-white font-medium bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;