import { createContext } from 'react';
import type { User } from '../models';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, token: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: User) => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
