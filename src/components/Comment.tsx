import React from 'react';
import type { Comment as CommentType, User } from '../types';

interface CommentProps {
  comment: CommentType;
  currentUser: User;
}

export default function Comment({ comment, currentUser }: CommentProps) {
  const isCurrentUserComment = comment.username === currentUser.username;

  return (
    <div className="border-t border-gray-100 p-4">
      <div className="flex gap-3">
        <img
          src={isCurrentUserComment ? currentUser.avatar : `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400`}
          alt={comment.author}
          className="h-8 w-8 rounded-full object-cover"
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{comment.author}</span>
            <span className="text-sm text-gray-500">@{comment.username}</span>
            <span className="text-gray-500">·</span>
            <time className="text-sm text-gray-500">
              {new Date(comment.timestamp).toLocaleDateString()}
            </time>
          </div>
          <p className="mt-1 text-gray-900">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}