import React from "react";
import { Paperclip, Trash2 } from "lucide-react";

const AttachmentList = ({ attachments, onDelete }) => {
  if (!attachments || attachments.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        No attachments yet.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {attachments.map((att) => (
        <li
          key={att.publicId}
          className="flex items-center justify-between p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
        >
          <a
            href={att.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Paperclip className="h-4 w-4" />
            {att.filename}
          </a>
          <button
            onClick={() => onDelete(att.publicId)}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AttachmentList;
