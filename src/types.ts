export interface Tweet {
  id: string;
  content: string;
  author: string;
  username: string;
  timestamp: Date;
  likes: number;
  retweets: number;
  replies: number;
  isLiked?: boolean;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  username: string;
  timestamp: Date;
}

export interface User {
  name: string;
  username: string;
  avatar: string;
}