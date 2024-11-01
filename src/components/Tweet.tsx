import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import type { Tweet as TweetType, User } from '../types';
import Comment from './Comment';
import CommentModal from './CommentModal';

interface TweetProps {
  tweet: TweetType;
  onLike: (id: string) => void;
  onComment: (id: string, content: string) => void;
  currentUser: User;
}

export default function Tweet({ tweet, onLike, onComment, currentUser }: TweetProps) {
  const [showComments, setShowComments] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const formatNumber = (num: number) =>
    num > 999 ? `${(num / 1000).toFixed(1)}K` : num;

  const handleComment = (content: string) => {
    onComment(tweet.id, content);
  };

  const isCurrentUserTweet = tweet.username === currentUser.username;

  return (
    <>
      <article className="border-b border-gray-200 p-4 hover:bg-gray-50">
        <div className="flex gap-4">
          <img
            src={isCurrentUserTweet ? currentUser.avatar : `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400`}
            alt={tweet.author}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-bold">{tweet.author}</h2>
              <span className="text-gray-500">@{tweet.username}</span>
              <span className="text-gray-500">·</span>
              <time className="text-gray-500">
                {new Date(tweet.timestamp).toLocaleDateString()}
              </time>
            </div>
            <p className="mt-2 text-gray-900">{tweet.content}</p>
            <div className="mt-4 flex justify-between text-gray-500">
              <button
                onClick={() => setShowCommentModal(true)}
                className="flex items-center gap-2 rounded-full p-2 hover:bg-blue-50 hover:text-blue-500"
              >
                <MessageCircle size={20} />
                <span>{formatNumber(tweet.replies)}</span>
              </button>
              <button className="flex items-center gap-2 rounded-full p-2 hover:bg-green-50 hover:text-green-500">
                <Repeat2 size={20} />
                <span>{formatNumber(tweet.retweets)}</span>
              </button>
              <button
                onClick={() => onLike(tweet.id)}
                className={`flex items-center gap-2 rounded-full p-2 hover:bg-red-50 hover:text-red-500 ${
                  tweet.isLiked ? 'text-red-500' : ''
                }`}
              >
                <Heart size={20} fill={tweet.isLiked ? 'currentColor' : 'none'} />
                <span>{formatNumber(tweet.likes)}</span>
              </button>
              <button className="rounded-full p-2 hover:bg-blue-50 hover:text-blue-500">
                <Share size={20} />
              </button>
            </div>
          </div>
        </div>
        {showComments && tweet.comments && tweet.comments.length > 0 && (
          <div className="mt-4 space-y-2">
            {tweet.comments.map((comment) => (
              <Comment 
                key={comment.id} 
                comment={comment} 
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </article>
      {showCommentModal && (
        <CommentModal
          tweet={tweet}
          onClose={() => setShowCommentModal(false)}
          onSubmit={handleComment}
          currentUser={currentUser}
        />
      )}
    </>
  );
}