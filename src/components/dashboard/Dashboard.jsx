import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Overview from './Overview';
import ContentManager from './ContentManager';
import DashboardAPI from '../../services/dashboardAPI';

const Dashboard = ({ user, onLogout }) => {
  const [activeFolder, setActiveFolder] = useState('overview');
  const [expandedFolders, setExpandedFolders] = useState({
    content: true,
    analytics: true,
    engagement: true
  });
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [posts, setPosts] = useState([]);
  const [apiStatus, setApiStatus] = useState('connected');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setApiStatus('connecting');
        
        const [dashData, notifData, postsData] = await Promise.all([
          DashboardAPI.fetchDashboardData(),
          DashboardAPI.fetchNotifications(),
          DashboardAPI.fetchPosts()
        ]);
        
        setDashboardData(dashData);
        setNotifications(notifData);
        setPosts(postsData);
        setApiStatus('connected');
      } catch (error) {
        console.error('Failed to load dashboard:', error);
        setApiStatus('error');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const freshData = await DashboardAPI.fetchDashboardData();
        setDashboardData(freshData);
      } catch (error) {
        console.error('Auto-refresh failed:', error);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleCreatePost = async (postData) => {
    try {
      setLoading(true);
      const createdPost = await DashboardAPI.createPost(postData);
      setPosts(prev => [createdPost, ...prev]);
      

      setNotifications(prev => [{
        id: Date.now(),
        message: `Post ${createdPost.status} successfully on ${createdPost.platform}`,
        type: 'success',
        time: 'just now'
      }, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await DashboardAPI.deletePost(postId);
      setPosts(prev => prev.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const toggleFolder = (folder) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }));
  };

  const folders = {
    overview: {
      name: 'Dashboard Overview',
      items: [
        { name: 'Quick Stats', count: `${dashboardData.stats?.postsPublished || 0} posts today` },
        { name: 'Recent Activity', count: `${dashboardData.stats?.totalEngagement || 0} interactions` },
        { name: 'Trending Topics', count: '#socialMedia' }
      ]
    },
    content: {
      name: 'Content Management',
      items: [
        { name: 'Draft Posts', count: posts.filter(p => p.status === 'draft').length },
        { name: 'Scheduled Posts', count: posts.filter(p => p.status === 'scheduled').length },
        { name: 'Published Posts', count: posts.filter(p => p.status === 'published').length },
        { name: 'Content Calendar', count: 'This Month' },
        { name: 'Media Library', count: '234 files' },
        { name: 'Templates', count: '12' }
      ]
    },
    analytics: {
      name: 'Analytics & Reports',
      items: [
        { name: 'Performance Overview', count: `+${dashboardData.stats?.reachGrowth || 0}% growth` },
        { name: 'Audience Insights', count: `${(dashboardData.stats?.newFollowers || 0) / 1000}K followers` },
        { name: 'Engagement Metrics', count: `${dashboardData.stats?.engagementGrowth || 0}% avg rate` },
        { name: 'Reach & Impressions', count: `${(dashboardData.stats?.totalReach || 0) / 1000}K views` },
        { name: 'Traffic Sources', count: `${dashboardData.platforms?.length || 0} platforms` },
        { name: 'Custom Reports', count: '3 reports' }
      ]
    },
    engagement: {
      name: 'Community & Engagement',
      items: [
        { name: 'Messages & DMs', count: '23 unread' },
        { name: 'Comments', count: '45 pending' },
        { name: 'Mentions', count: '12 new' },
        { name: 'Reviews', count: '4.8★ rating' },
        { name: 'User Generated Content', count: '18 tagged' },
        { name: 'Influencer Outreach', count: '5 active' }
      ]
    },
    campaigns: {
      name: 'Campaigns & Ads',
      items: [
        { name: 'Active Campaigns', count: '3 running' },
        { name: 'Ad Performance', count: '$2,450 spent' },
        { name: 'A/B Tests', count: '2 ongoing' },
        { name: 'Audience Targeting', count: '8 segments' },
        { name: 'Campaign History', count: '24 completed' }
      ]
    },
    tools: {
      name: 'Tools & Utilities',
      items: [
        { name: 'Post Scheduler', count: 'Active' },
        { name: 'Hashtag Research', count: '150 saved' },
        { name: 'Competitor Analysis', count: '5 tracked' },
        { name: 'Content Ideas', count: '28 saved' },
        { name: 'Team Collaboration', count: '4 members' },
        { name: 'Automation Rules', count: '7 active' }
      ]
    }
  };

  if (loading && !dashboardData.platforms) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user}
        notifications={notifications}
        onLogout={onLogout}
        apiStatus={apiStatus}
        onCreatePost={() => setActiveFolder('content')}
      />
      
      <div className="flex">
        <Sidebar 
          user={user}
          folders={folders}
          activeFolder={activeFolder}
          expandedFolders={expandedFolders}
          onFolderChange={setActiveFolder}
          onToggleFolder={toggleFolder}
        />
        
        <main className="flex-1 p-6">
          {activeFolder === 'overview' && (
            <Overview 
              user={user}
              dashboardData={dashboardData}
            />
          )}
          
          {activeFolder === 'content' && (
            <ContentManager 
              posts={posts}
              loading={loading}
              onCreatePost={handleCreatePost}
              onDeletePost={handleDeletePost}
            />
          )}
          
          {activeFolder !== 'overview' && activeFolder !== 'content' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-2xl">📁</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {folders[activeFolder]?.name || 'Folder'}
                </h2>
                <p className="text-gray-600 mb-6">
                  This section contains all your {folders[activeFolder]?.name.toLowerCase()} tools and data.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                  {folders[activeFolder]?.items?.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{item.name}</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;