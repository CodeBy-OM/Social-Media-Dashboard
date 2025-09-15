class DashboardAPI {
  static async fetchDashboardData() {
    console.log('Fetching dashboard data...');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      platforms: [
        { name: 'Instagram', color: 'bg-pink-500', followers: '12.4K', growth: '+5.2%', posts: 45, engagement: '8.3%' },
        { name: 'Twitter', color: 'bg-blue-400', followers: '8.7K', growth: '+3.1%', posts: 78, engagement: '6.7%' },
        { name: 'Facebook', color: 'bg-blue-600', followers: '15.2K', growth: '+2.8%', posts: 32, engagement: '4.9%' },
        { name: 'LinkedIn', color: 'bg-blue-700', followers: '5.3K', growth: '+7.5%', posts: 23, engagement: '9.1%' },
        { name: 'TikTok', color: 'bg-black', followers: '22.1K', growth: '+12.4%', posts: 56, engagement: '15.2%' },
        { name: 'YouTube', color: 'bg-red-500', followers: '3.8K', growth: '+4.3%', posts: 12, engagement: '7.8%' }
      ],
      stats: {
        totalReach: 124500,
        totalEngagement: 8432,
        newFollowers: 1234,
        postsPublished: 42,
        reachGrowth: 12.3,
        engagementGrowth: 8.7,
        followerGrowth: 15.2
      },
      recentActivity: [
        { id: 1, action: 'New follower on Instagram', time: '2 min ago', type: 'follower' },
        { id: 2, action: 'Post published on Twitter', time: '15 min ago', type: 'post' },
        { id: 3, action: '5 new comments on Facebook', time: '32 min ago', type: 'comment' },
        { id: 4, action: 'Campaign reached 1K impressions', time: '1 hour ago', type: 'campaign' },
        { id: 5, action: 'Scheduled post for LinkedIn', time: '2 hours ago', type: 'scheduled' }
      ]
    };
  }

  static async fetchNotifications() {
    console.log('Fetching notifications...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      { id: 1, message: '23 new messages require response', type: 'urgent', time: '5 min ago' },
      { id: 2, message: 'Instagram campaign budget 80% used', type: 'warning', time: '1 hour ago' },
      { id: 3, message: 'Weekly report is ready', type: 'info', time: '2 hours ago' }
    ];
  }

  static async fetchPosts() {
    console.log('Fetching posts...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      { 
        id: 1, 
        content: 'Check out our latest product launch! 🚀', 
        platform: 'instagram', 
        status: 'published', 
        engagement: 156, 
        reach: 2340, 
        timestamp: '2024-12-15 10:30' 
      },
      { 
        id: 2, 
        content: 'Behind the scenes at our office today', 
        platform: 'twitter', 
        status: 'published', 
        engagement: 89, 
        reach: 1567, 
        timestamp: '2024-12-15 09:15' 
      },
      { 
        id: 3, 
        content: 'Exciting news coming tomorrow...', 
        platform: 'facebook', 
        status: 'scheduled', 
        scheduledTime: '2024-12-16 14:00', 
        timestamp: '2024-12-15 08:45' 
      },
      { 
        id: 4, 
        content: 'Industry insights: The future of social media', 
        platform: 'linkedin', 
        status: 'draft', 
        timestamp: '2024-12-15 07:20' 
      }
    ];
  }

  static async createPost(postData) {
    console.log('Creating post:', postData);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const newPostData = {
      id: Date.now(),
      ...postData,
      status: postData.scheduled ? 'scheduled' : 'published',
      engagement: 0,
      reach: 0,
      timestamp: new Date().toISOString()
    };
    
    return newPostData;
  }

  static async updatePost(postId, updates) {
    console.log('Updating post:', postId, updates);
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, postId, updates };
  }

  static async deletePost(postId) {
    console.log('Deleting post:', postId);
    await new Promise(resolve => setTimeout(resolve, 600));
    return { success: true, postId };
  }
}

export default DashboardAPI;