import React, { useState } from "react";
import { X } from "lucide-react";

const CreateTaskModal = ({ isOpen, onClose, onCreate, users }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedUser: "",
    priority: "Medium",
    status: "Todo",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
        ...formData,
        assignedUser: formData.assignedUser ? formData.assignedUser : null,
    }
    onCreate(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Create New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />

          <textarea
            name="description"
            placeholder="Task description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />

          <select
            name="assignedUser"
            value={formData.assignedUser}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
            <option value="">Unassigned</option>
                {users.map((user) => (
            <option key={user._id} value={user._id}>
                {user.fullName} ({user.email})
            </option>
        ))}
        </select>

          <div className="flex gap-4">
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option>Todo</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
