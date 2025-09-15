import React, { useState, useEffect } from 'react';
import AuthLayout from './components/auth/AuthLayout';
import Dashboard from './components/dashboard/Dashboard';
import LocalStorage from './services/localStorage';
import AuthAPI from './services/authAPI';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = LocalStorage.getItem('auth_token');
      const userData = LocalStorage.getItem('user_data');
      
      if (token && userData) {
        try {
          const isValid = await AuthAPI.validateToken(token);
          if (isValid) {
            setUser(userData);
            setIsAuthenticated(true);
          } else {
            LocalStorage.removeItem('auth_token');
            LocalStorage.removeItem('user_data');
          }
        } catch (error) {
          console.error('Token validation failed:', error);
          LocalStorage.removeItem('auth_token');
          LocalStorage.removeItem('user_data');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    LocalStorage.removeItem('auth_token');
    LocalStorage.removeItem('user_data');
    setUser(null);
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <AuthLayout onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;