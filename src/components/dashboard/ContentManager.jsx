import React, { useState } from 'react';
import { Send, Loader, Edit3, Trash2, Heart, Eye } from 'lucide-react';

const ContentManager = ({ posts, loading, onCreatePost, onDeletePost }) => {
  const [newPost, setNewPost] = useState({ 
    content: '', 
    platform: 'instagram', 
    scheduled: false 
  });

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.content.trim()) return;
    
    await onCreatePost(newPost);
    setNewPost({ content: '', platform: 'instagram', scheduled: false });
  };

  return (
    <div className="space-y-6">
      {/* Post Creation Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Post</h3>
        <form onSubmit={handleCreatePost} className="space-y-4">
          <textarea
            value={newPost.content}
            onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
            placeholder="What would you like to share?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
            required
          />
          <div className="flex items-center space-x-4">
            <select
              value={newPost.platform}
              onChange={(e) => setNewPost(prev => ({ ...prev, platform: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
            </select>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newPost.scheduled}
                onChange={(e) => setNewPost(prev => ({ ...prev, scheduled: e.target.checked }))}
                className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-600">Schedule for later</span>
            </label>
            <button
              type="submit"
              disabled={!newPost.content.trim() || loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{newPost.scheduled ? 'Schedule' : 'Publish'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Posts</h3>
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No posts yet. Create your first post above!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-900 mb-2">{post.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="capitalize font-medium">{post.platform}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published' ? 'bg-green-100 text-green-700' :
                        post.status === 'scheduled' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {post.status}
                      </span>
                      <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                    </div>
                    {post.status === 'published' && (
                      <div className="flex items-center space-x-4 mt-3">
                        <span className="flex items-center space-x-1 text-sm text-gray-600">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span>{post.engagement}</span>
                        </span>
                        <span className="flex items-center space-x-1 text-sm text-gray-600">
                          <Eye className="w-4 h-4 text-blue-500" />
                          <span>{post.reach}</span>
                        </span>
                      </div>
                    )}
                    {post.status === 'scheduled' && (
                      <div className="mt-2 text-sm text-yellow-600">
                        Scheduled for: {new Date(post.scheduledTime).toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit post"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDeletePost(post.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManager;