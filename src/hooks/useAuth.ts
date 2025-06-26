import { useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useAuth(): AuthState & {
  login: (user: User) => void;
  logout: () => void;
} {
  const [user, setUser] = useLocalStorage<User | null>('village-fresh-user', null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (userData: User) => {
    setIsLoading(true);
    setUser(userData);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };
}