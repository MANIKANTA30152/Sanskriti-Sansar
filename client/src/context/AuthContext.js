import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigate = useNavigate();

  // Set axios defaults and token storage
  const setAuthToken = useCallback((token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    setLogoutLoading(true);
    try {
      await axios.post('/api/v1/auth/logout', {}, {
        withCredentials: true
      });
      setAuthToken(null);
      setToken(null);
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError('Logout failed. Please try again.');
    } finally {
      setLogoutLoading(false);
    }
  }, [setAuthToken]);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (token) {
          setAuthToken(token);
          const res = await axios.get('/api/v1/auth/me');
          setUser(res.data.data);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        logout();
      } finally {
        setInitialLoading(false);
      }
    };
    initializeAuth();
  }, [token, setAuthToken, logout]);

  // Register user
  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/v1/auth/register', formData);
      setAuthToken(res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      navigate('/profile');
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Registration failed';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/v1/auth/login', credentials);
      setAuthToken(res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      navigate('/profile');
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Invalid credentials';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Clear errors
  const clearErrors = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    error,
    loading,
    logoutLoading,
    initialLoading,
    isAuthenticated: !!token,
    register,
    login,
    logout,
    clearErrors,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}