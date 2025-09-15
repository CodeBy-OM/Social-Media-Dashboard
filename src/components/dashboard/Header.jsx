import React from 'react';
import { Search, Bell, PlusCircle, LogOut } from 'lucide-react';

const Header = ({ user, notifications, onLogout, apiStatus, onCreatePost }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Social Scope Dashboard</h1>
            
            {/* API Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                apiStatus === 'connected' ? 'bg-green-500' : 
                apiStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm text-gray-600 capitalize">{apiStatus}</span>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search content, analytics..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            
            {/* Create Post Button */}
            <button 
              onClick={onCreatePost}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Post</span>
            </button>
            
            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-8 h-8 rounded-full"
              />
              <div className="text-sm hidden md:block">
                <p className="text-gray-900 font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-gray-500">{user.subscription}</p>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;