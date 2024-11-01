import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TweetComposer from './components/TweetComposer';
import Tweet from './components/Tweet';
import type { Tweet as TweetType } from './types';

const CURRENT_USER = {
  name: 'BillyKai',
  username: 'billykai',
  avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400'
};

const initialTweets: TweetType[] = [
  {
    id: '1',
    content: 'Just deployed my first web app! 🚀 #coding #webdev',
    author: 'Sarah Developer',
    username: 'sarahdev',
    timestamp: new Date('2024-03-10T15:00:00'),
    likes: 1200,
    retweets: 234,
    replies: 89,
    isLiked: false,
    comments: [],
  },
  {
    id: '2',
    content: 'The future of AI is not about replacing humans, but augmenting human capabilities. What are your thoughts on this? 🤖',
    author: 'Tech Enthusiast',
    username: 'techlover',
    timestamp: new Date('2024-03-10T14:30:00'),
    likes: 3500,
    retweets: 890,
    replies: 234,
    isLiked: false,
    comments: [],
  },
  {
    id: '3',
    content: 'Beautiful sunset in San Francisco today! 🌅',
    author: 'City Explorer',
    username: 'sfwanderer',
    timestamp: new Date('2024-03-10T14:00:00'),
    likes: 567,
    retweets: 123,
    replies: 45,
    isLiked: false,
    comments: [],
  },
];

function App() {
  const [tweets, setTweets] = useState<TweetType[]>(initialTweets);

  const handleNewTweet = (content: string) => {
    const newTweet: TweetType = {
      id: Date.now().toString(),
      content,
      author: CURRENT_USER.name,
      username: CURRENT_USER.username,
      timestamp: new Date(),
      likes: 0,
      retweets: 0,
      replies: 0,
      isLiked: false,
      comments: [],
    };
    setTweets([newTweet, ...tweets]);
  };

  const handleLike = (id: string) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === id) {
        return {
          ...tweet,
          likes: tweet.isLiked ? tweet.likes - 1 : tweet.likes + 1,
          isLiked: !tweet.isLiked,
        };
      }
      return tweet;
    }));
  };

  const handleComment = (tweetId: string, content: string) => {
    setTweets(tweets.map(tweet => {
      if (tweet.id === tweetId) {
        const newComment = {
          id: Date.now().toString(),
          content,
          author: CURRENT_USER.name,
          username: CURRENT_USER.username,
          timestamp: new Date(),
        };
        return {
          ...tweet,
          replies: tweet.replies + 1,
          comments: [...(tweet.comments || []), newComment],
        };
      }
      return tweet;
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar currentUser={CURRENT_USER} />
      <main className="ml-20 max-w-2xl border-x border-gray-200 lg:ml-64">
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 p-4 backdrop-blur-sm">
          <h1 className="text-xl font-bold">Home</h1>
        </header>
        <TweetComposer onSubmit={handleNewTweet} currentUser={CURRENT_USER} />
        <div className="divide-y divide-gray-200">
          {tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              tweet={tweet}
              onLike={handleLike}
              onComment={handleComment}
              currentUser={CURRENT_USER}
            />
          ))}
        </div>
      </main>
      <aside className="fixed right-0 top-0 hidden w-80 border-l border-gray-200 p-4 lg:block">
        <div className="rounded-2xl bg-gray-50 p-4">
          <h2 className="mb-4 text-xl font-bold">Who to follow</h2>
          <div className="space-y-4">
            <p className="text-gray-500">Loading suggestions...</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default App;