import React, { useState } from 'react';
import { ImagePlus, Send } from 'lucide-react';
import type { User } from '../types';

interface TweetComposerProps {
  onSubmit: (content: string) => void;
  currentUser: User;
}

export default function TweetComposer({ onSubmit, currentUser }: TweetComposerProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="border-b border-gray-200 p-4">
      <div className="flex gap-4">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full resize-none border-0 bg-transparent text-lg outline-none placeholder:text-gray-500"
            rows={3}
          />
          <div className="mt-2 flex items-center justify-between">
            <button
              type="button"
              className="rounded-full p-2 text-blue-500 hover:bg-blue-50"
            >
              <ImagePlus size={20} />
            </button>
            <button
              type="submit"
              disabled={!content.trim()}
              className="rounded-full bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
            >
              <span className="hidden sm:inline">Post</span>
              <Send size={20} className="sm:hidden" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}