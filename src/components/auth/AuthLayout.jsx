// src/components/auth/AuthLayout.jsx
import React, { useState } from 'react';
import { 
  Mail, Lock, User, EyeOff, Eye, Shield, 
  AlertCircle, Loader, BarChart3, CheckCircle, Users,
  MessageCircle, TrendingUp, Heart, Share2
} from 'lucide-react';
import AuthAPI from '../../services/authAPI';
import LocalStorage from '../../services/localStorage';

const AuthLayout = ({ onAuthSuccess }) => {
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    companyName: ''
  });

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      let result;
      
      if (authMode === 'login') {
        result = await AuthAPI.login(authForm.email, authForm.password);
      } else {
        if (authForm.password !== authForm.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (authForm.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        
        result = await AuthAPI.signup({
          email: authForm.email,
          password: authForm.password,
          firstName: authForm.firstName,
          lastName: authForm.lastName,
          companyName: authForm.companyName
        });
      }

      if (result && result.success) {
        LocalStorage.setItem('auth_token', result.token);
        LocalStorage.setItem('user_data', result.user);
        onAuthSuccess(result.user);
      }
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setAuthLoading(true);
    try {
      const result = await AuthAPI.login('demo@example.com', 'password123');
      if (result.success) {
        LocalStorage.setItem('auth_token', result.token);
        LocalStorage.setItem('user_data', result.user);
        onAuthSuccess(result.user);
      }
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" 
         style={{
           background: `
             linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(55, 65, 81, 0.7)),
             radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)
           `
         }}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob" style={{animationDelay: '4s'}}></div>
        
        {/* Floating Icons */}
        <div className="absolute top-10 left-10 opacity-10">
          <div className="grid grid-cols-3 gap-8 animate-float">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 right-10 opacity-10">
          <div className="grid grid-cols-2 gap-6 animate-float" style={{animationDelay: '1s'}}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 max-w-md w-full glass-card rounded-3xl p-8 animate-slide-in">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            Social Media Pro
          </h1>
          <p className="text-blue-200 text-lg">
            {authMode === 'login' ? '✨ Welcome back to your dashboard' : '🚀 Create your professional account'}
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
        </div>

        {/* Step Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              authMode === 'login' ? 'bg-blue-500 text-white' : 'bg-white/20 text-white/60'
            }`}>
              1
            </div>
            <div className="w-8 h-0.5 bg-white/30"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              authMode === 'signup' ? 'bg-purple-500 text-white' : 'bg-white/20 text-white/60'
            }`}>
              2
            </div>
            <div className="w-8 h-0.5 bg-white/30"></div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-white/20 text-white/60">
              3
            </div>
          </div>
          <div className="text-center">
            <p className="text-white/80 text-sm">
              Step {authMode === 'login' ? '1' : '2'} of 3: {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </p>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleAuth} className="space-y-6">
          {authMode === 'signup' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                    <input
                      type="text"
                      required
                      value={authForm.firstName}
                      onChange={(e) => setAuthForm(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/60"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Last Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                    <input
                      type="text"
                      required
                      value={authForm.lastName}
                      onChange={(e) => setAuthForm(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/60"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Company Name</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                  <input
                    type="text"
                    value={authForm.companyName}
                    onChange={(e) => setAuthForm(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/60"
                    placeholder="Your Company (optional)"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <input
                type="email"
                required
                value={authForm.email}
                onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/60"
                placeholder={authMode === 'login' ? 'demo@example.com' : 'your@email.com'}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={authForm.password}
                onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full pl-10 pr-12 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/60"
                placeholder={authMode === 'login' ? 'password123' : 'Min 6 characters'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {authMode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={authForm.confirmPassword}
                  onChange={(e) => setAuthForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-white/60"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          )}

          {authError && (
            <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-300" />
              <span className="text-sm text-red-200">{authError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 font-medium shadow-lg backdrop-blur-sm transition-all duration-200 transform hover:scale-105 disabled:scale-100"
          >
            {authLoading && <Loader className="w-5 h-5 animate-spin" />}
            <span>{authLoading ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}</span>
          </button>

          {/* Demo Login Button */}
          {authMode === 'login' && (
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={authLoading}
              className="w-full bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white/90 py-2 px-4 rounded-lg font-medium transition-all duration-200 border border-white/20"
            >
              🚀 Try Demo Login
            </button>
          )}
        </form>

        {/* Demo credentials */}
        {authMode === 'login' && (
          <div className="mt-6 p-4 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-xl">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <p className="text-sm text-blue-200 font-semibold">🎯 Quick Demo Access</p>
            </div>
            <div className="grid grid-cols-1 gap-1">
              <p className="text-xs text-blue-300">📧 Email: demo@example.com</p>
              <p className="text-xs text-blue-300">🔐 Password: password123</p>
            </div>
          </div>
        )}

        {/* Features Preview */}
        {authMode === 'signup' && (
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 rounded-xl">
            <p className="text-sm text-purple-200 font-semibold mb-3">🌟 What you'll get:</p>
            <div className="grid grid-cols-2 gap-3 text-xs text-purple-300">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>Multi-platform management</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>Advanced analytics</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                <span>Content scheduling</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-pink-400 rounded-full mr-2"></div>
                <span>Team collaboration</span>
              </div>
            </div>
          </div>
        )}

        {/* Switch auth mode */}
        <div className="mt-8 text-center">
          <p className="text-sm text-white/80">
            {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'signup' : 'login');
                setAuthError('');
              }}
              className="ml-2 text-blue-300 hover:text-blue-200 font-semibold underline underline-offset-2 transition-colors duration-200 hover:scale-105 transform inline-block"
            >
              {authMode === 'login' ? '🚀 Sign up' : '👋 Sign in'}
            </button>
          </p>
          
          {/* Trust Indicators */}
          <div className="mt-6 flex justify-center items-center space-x-4 text-white/60">
            <div className="flex items-center text-xs">
              <Shield className="w-3 h-3 mr-1" />
              <span>Secure</span>
            </div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="flex items-center text-xs">
              <Users className="w-3 h-3 mr-1" />
              <span>10K+ Users</span>
            </div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="flex items-center text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              <span>Trusted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;