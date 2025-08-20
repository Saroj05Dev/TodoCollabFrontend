export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 px-4 transition-colors font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
