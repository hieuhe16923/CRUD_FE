import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../models';
import { AuthContext } from './AuthContext';
import { userService } from '../services';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app load
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const username = localStorage.getItem('currentUser');
      
      if (token && username) {
        try {
          // Fetch fresh user data from API using service
          const userData = await userService.getUserByUsername(username);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error checking authentication:', error);
          // Token is invalid, clear storage
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentUser');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, token: string): Promise<void> => {
    try {
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', username);
      
      // Fetch fresh user data using service
      const userData = await userService.getUserByUsername(username);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
