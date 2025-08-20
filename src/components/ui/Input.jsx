export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${className}`}
      {...props}
    />
  );
}
