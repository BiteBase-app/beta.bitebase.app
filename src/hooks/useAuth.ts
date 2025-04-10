import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  subscription_tier: string;
  is_active: boolean;
  is_superuser: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await apiService.getCurrentUser();
      setUser(response.data);
      setError(null);
    } catch (err) {
      console.error('Authentication error:', err);
      setUser(null);
      setError('Authentication failed');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await apiService.login(email, password);
      localStorage.setItem('token', response.data.access_token);
      await checkAuth();
      return true;
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.detail || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      await apiService.register(email, password, fullName);
      const loginSuccess = await login(email, password);
      return loginSuccess;
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.detail || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth,
    isAuthenticated: !!user,
  };
};
