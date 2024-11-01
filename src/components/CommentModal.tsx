import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Tweet, User } from '../types';

interface CommentModalProps {
  tweet: Tweet;
  onClose: () => void;
  onSubmit: (content: string) => void;
  currentUser: User;
}

export default function CommentModal({ tweet, onClose, onSubmit, currentUser }: CommentModalProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Reply</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-4">
          <div className="flex gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold">{tweet.author}</span>
                <span className="text-gray-500">@{tweet.username}</span>
              </div>
              <p className="mt-1 text-gray-600">{tweet.content}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Post your reply"
              className="w-full resize-none rounded-lg border border-gray-200 p-4 focus:border-blue-500 focus:outline-none"
              rows={4}
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={!content.trim()}
                className="rounded-full bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
              >
                Reply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}