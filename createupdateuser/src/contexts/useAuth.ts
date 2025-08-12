import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from '../models';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, token: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: User) => void;
  isLoading: boolean;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context as AuthContextType;
};
