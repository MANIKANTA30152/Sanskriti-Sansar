import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check if user is authenticated
  const checkUserLoggedIn = async () => {
    try {
      const res = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(res.data.data);
    } catch (err) {
      logout();
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkUserLoggedIn();
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Register user
  const register = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register', formData);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', formData);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        error,
        loading,
        register,
        login,
        logout,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;