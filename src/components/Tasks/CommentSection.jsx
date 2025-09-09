import React from 'react';
import { Loader, Send, Trash2, User } from 'lucide-react';
import { formatTimeAgo } from './utils/dateUtils';

const CommentSection = ({
  comments,
  commentsLoading,
  newComment,
  setNewComment,
  addingComment,
  deletingCommentId,
  userId,
  taskCreatorId,
  taskAssigneeId,
  handleAddComment,
  handleDeleteComment,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Comments ({comments.length})
      </h3>
      
      {/* Comment Input */}
      <div className="flex items-center gap-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          rows="1"
        />
        <button
          onClick={handleAddComment}
          disabled={!newComment.trim() || addingComment}
          className="p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors flex items-center justify-center"
        >
          {addingComment ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Comments List */}
      {commentsLoading ? (
        <div className="flex items-center justify-center py-4">
          <Loader className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      ) : comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="flex gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              {/* User Avatar */}
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {comment.userId.fullName || "Unknown User"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {comment.comment}
                </p>
              </div>

              {/* Delete button (only for the comment owner) */}
              {(userId && comment.userId && (userId === comment.userId._id || userId === taskCreatorId || userId === taskAssigneeId)) && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  disabled={deletingCommentId === comment._id}
                  className="p-1 self-start rounded-full text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                >
                  {deletingCommentId === comment._id ? (
                    <Loader className="h-4 w-4 animate-spin text-red-500" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No comments yet. Be the first to add one!
        </p>
      )}
    </div>
  );
};

export default CommentSection;