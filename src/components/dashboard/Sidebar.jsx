import React from 'react';
import { 
  Home, FileText, BarChart3, Users, Target, Settings,
  FolderOpen, ChevronDown, ChevronRight
} from 'lucide-react';

const Sidebar = ({ user, folders, activeFolder, expandedFolders, onFolderChange, onToggleFolder }) => {
  const folderIcons = {
    overview: Home,
    content: FileText,
    analytics: BarChart3,
    engagement: Users,
    campaigns: Target,
    tools: Settings
  };

  return (
    <aside className="w-80 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        {/* User Profile in Sidebar */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500">{user.companyName || 'Personal Account'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {Object.entries(folders).map(([key, folder]) => {
            const Icon = folderIcons[key] || FolderOpen;
            const isExpanded = expandedFolders[key];
            
            return (
              <div key={key} className="space-y-1">
                <button
                  onClick={() => {
                    onFolderChange(key);
                    if (folder.items) onToggleFolder(key);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    activeFolder === key 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{folder.name}</span>
                  </div>
                  {folder.items && (
                    <span className="text-gray-400">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </span>
                  )}
                </button>
                
                {folder.items && isExpanded && (
                  <div className="ml-8 space-y-1">
                    {folder.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                        <div className="flex items-center space-x-2">
                          <FolderOpen className="w-4 h-4 text-gray-400" />
                          <span>{item.name}</span>
                        </div>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{item.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;