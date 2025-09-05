import React, { useState } from 'react';
import { Plus, Check, Trash2, Loader, ListTodo } from 'lucide-react';
import { getStatusColor } from './utils/colorUtils';
import { formatTimeAgo } from './utils/dataUtils';

const SubtasksSection = ({
  subtasks,
  subtasksLoading,
  taskCreatorId,
  taskAssigneeId,
  userId,
  handleAddSubtask,
  handleUpdateSubtaskStatus,
  handleDeleteSubtask,
  addingSubtask,
  deletingSubtaskId,
  updatingSubtaskId,
}) => {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const onAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      handleAddSubtask(newSubtaskTitle);
      setNewSubtaskTitle('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
        <ListTodo className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        Subtasks ({subtasks.length})
      </h3>

      {/* Input for new subtask */}
      {(userId === taskCreatorId || userId === taskAssigneeId) && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            placeholder="Add a new subtask..."
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAddSubtask();
              }
            }}
          />
          <button
            onClick={onAddSubtask}
            disabled={!newSubtaskTitle.trim() || addingSubtask}
            className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center justify-center"
          >
            {addingSubtask ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </button>
        </div>
      )}

      {/* Subtasks List */}
      {subtasksLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      ) : subtasks.length > 0 ? (
        <ul className="space-y-3">
          {subtasks.map((subtask) => (
            <li
              key={subtask._id}
              className={`flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-colors ${
                subtask.status === 'Done' ? 'opacity-70' : ''
              }`}
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {subtask.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      subtask.status
                    )}`}
                  >
                    {subtask.status}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(subtask.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Checkmark button to mark as done */}
                {(userId === taskCreatorId || userId === taskAssigneeId) && (
                  <button
                    onClick={() => handleUpdateSubtaskStatus(subtask._id, subtask.status === 'Done' ? 'In Progress' : 'Done')}
                    disabled={updatingSubtaskId === subtask._id}
                    className="p-1.5 rounded-full text-green-500 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                  >
                    {updatingSubtaskId === subtask._id ? (
                      <Loader className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </button>
                )}
                
                {/* Delete button */}
                {(userId === taskCreatorId || userId === taskAssigneeId) && (
                  <button
                    onClick={() => handleDeleteSubtask(subtask._id)}
                    disabled={deletingSubtaskId === subtask._id}
                    className="p-1.5 rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                  >
                    {deletingSubtaskId === subtask._id ? (
                      <Loader className="h-4 w-4 animate-spin text-red-500" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No subtasks yet. Be the first to add one!
        </p>
      )}
    </div>
  );
};

export default SubtasksSection;