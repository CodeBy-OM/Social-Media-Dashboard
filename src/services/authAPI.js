class AuthAPI {
  static async login(email, password) {
    console.log('API login called with:', { email });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock validation
    if (email === 'demo@example.com' && password === 'password123') {
      const user = {
        id: 1,
        email: 'demo@example.com',
        firstName: 'Aarav',
        lastName: 'Mehta',
        companyName: 'Social Scope Pro',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        subscription: 'Pro',
        joinedDate: '2023-01-15'
      };
      
      console.log('Login successful, returning user:', user);
      return {
        success: true,
        user: user,
        token: 'mock-jwt-token-12345'
      };
    } else {
      console.log('Login failed: invalid credentials');
      throw new Error('Invalid email or password. Try demo@example.com / password123');
    }
  }

  static async signup(userData) {
    console.log('API signup called with:', userData);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock validation
    if (userData.email === 'existing@example.com') {
      throw new Error('Email already exists');
    }
    
    const user = {
      id: Date.now(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      companyName: userData.companyName,
      avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=3b82f6&color=ffffff`,
      subscription: 'Free',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    
    console.log('Signup successful, returning user:', user);
    return {
      success: true,
      user: user,
      token: 'mock-jwt-token-' + Date.now()
    };
  }

  static async logout() {
    console.log('API logout called');
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }

  static async validateToken(token) {
    console.log('API validateToken called with:', token);
    await new Promise(resolve => setTimeout(resolve, 800));
    // Mock token validation - in real app, this would validate with backend
    return token && token.startsWith('mock-jwt-token');
  }
}

export default AuthAPI;