import React from 'react';
import { Eye, Heart, Users, Share2, MessageCircle, TrendingUp, Clock } from 'lucide-react';

const Overview = ({ user, dashboardData }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'follower': return Users;
      case 'post': return Share2;
      case 'comment': return MessageCircle;
      case 'campaign': return TrendingUp;
      case 'scheduled': return Clock;
      default: return Share2;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.firstName}!</h2>
        <p className="text-blue-100">Here's what's happening with your social media today.</p>
      </div>

      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardData.platforms?.map((platform, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${platform.color}`}></div>
                <h3 className="font-semibold text-gray-900">{platform.name}</h3>
              </div>
              <span className="text-sm text-green-600 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Active
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Followers</span>
                <span className="font-semibold">{platform.followers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Growth</span>
                <span className="font-semibold text-green-600">{platform.growth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Posts</span>
                <span className="font-semibold">{platform.posts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Engagement</span>
                <span className="font-semibold">{platform.engagement}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Reach</p>
              <p className="text-2xl font-bold text-gray-900">
                {(dashboardData.stats?.totalReach || 0).toLocaleString()}
              </p>
            </div>
            <Eye className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-green-600 text-sm mt-2">
            +{dashboardData.stats?.reachGrowth || 0}% from last week
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Engagement</p>
              <p className="text-2xl font-bold text-gray-900">
                {(dashboardData.stats?.totalEngagement || 0).toLocaleString()}
              </p>
            </div>
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-green-600 text-sm mt-2">
            +{dashboardData.stats?.engagementGrowth || 0}% from last week
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">New Followers</p>
              <p className="text-2xl font-bold text-gray-900">
                {(dashboardData.stats?.newFollowers || 0).toLocaleString()}
              </p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-green-600 text-sm mt-2">
            +{dashboardData.stats?.followerGrowth || 0}% from last week
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Posts Published</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.stats?.postsPublished || 0}</p>
            </div>
            <Share2 className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-gray-600 text-sm mt-2">This month</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {dashboardData.recentActivity?.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <Icon className="w-5 h-5 text-gray-500" />
                <div className="flex-1">
                  <p className="text-gray-900">{activity.action}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Overview;