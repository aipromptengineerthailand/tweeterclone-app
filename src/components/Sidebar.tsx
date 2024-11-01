import React from 'react';
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  User as UserIcon,
  Twitter,
} from 'lucide-react';
import type { User } from '../types';

interface SidebarProps {
  currentUser: User;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const menuItems = [
    { icon: <Home size={24} />, text: 'Home' },
    { icon: <Search size={24} />, text: 'Explore' },
    { icon: <Bell size={24} />, text: 'Notifications' },
    { icon: <Mail size={24} />, text: 'Messages' },
    { icon: <Bookmark size={24} />, text: 'Bookmarks' },
    { icon: <UserIcon size={24} />, text: 'Profile' },
  ];

  return (
    <div className="fixed h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="mb-4">
          <Twitter className="h-8 w-8 text-blue-500" />
        </div>
        <nav>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center gap-4 p-3 hover:bg-gray-100 rounded-full transition-colors"
            >
              {item.icon}
              <span className="hidden md:inline text-xl">{item.text}</span>
            </a>
          ))}
          <button className="mt-4 bg-blue-500 text-white rounded-full py-3 px-6 w-full md:w-auto hover:bg-blue-600 transition-colors">
            <span className="hidden md:inline">Tweet</span>
            <span className="md:hidden">+</span>
          </button>
        </nav>
      </div>
      <div className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-full cursor-pointer">
        <img
          src={currentUser.profileImage}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="hidden md:block">
          <p className="font-semibold">{currentUser.name}</p>
          <p className="text-gray-500">@{currentUser.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;