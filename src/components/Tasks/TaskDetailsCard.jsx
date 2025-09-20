import React from "react";
import { Loader, Upload, X, Paperclip } from "lucide-react";
import TaskInfoGrid from "./TaskInfoGrid";

const TaskDetailsCard = ({
  task,
  onEdit,
  smartAssignLoading,
  attachmentLoading,
  uploading,
  deletingId,
  onSmartAssign,
  onRefresh,
  attachments,
  handleAddAttachment,
  handleDeleteAttachment,
}) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleAddAttachment(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {task.title}
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
          >
            Edit
          </button>
          <button
            onClick={onSmartAssign}
            disabled={smartAssignLoading}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm flex items-center gap-1"
          >
            {smartAssignLoading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Smart Assign"
            )}
          </button>
          <button
            onClick={onRefresh}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Task Info Grid */}
      <TaskInfoGrid task={task} />

      {/* Description */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Description
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {task.description || "No description provided."}
        </p>
      </div>

      {/* Attachments Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Attachments
        </h3>

        {/* Upload Button */}
        <label className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg text-sm w-fit
          ${uploading ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}
        `}>
          {uploading ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              <span>Upload File</span>
            </>
          )}
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={attachmentLoading}
          />
        </label>

        {/* List of attachments */}
        {attachments?.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {attachments.map((att) => (
              <li
                key={att.publicId}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <Paperclip className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <a
                    href={att.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    {att.filename}
                  </a>
                </div>
                <button
                  onClick={() => handleDeleteAttachment(att.publicId)}
                  disabled={deletingId === att.publicId}
                  className={`p-1 rounded-full ${
                    deletingId === att.publicId
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-red-100 dark:hover:bg-red-900"
                  }`}
                >
                  {deletingId === att.publicId ? (
                    <Loader className="h-4 w-4 animate-spin text-red-500" />
                  ) : (
                    <X className="h-4 w-4 text-red-500" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            No attachments uploaded.
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsCard;