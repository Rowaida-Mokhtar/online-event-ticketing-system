import React, { createContext, useState, useEffect } from 'react';
import axios from '../services/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/users/profile');
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/login', { email, password });
      setUser(res.data.user);
    } catch (err) {
      throw err.response?.data?.message || 'Login failed';
    }
  };

  const register = async ({ name, email, password, role }) => {
    try {
      const res = await axios.post('/register', { name, email, password, role });
      setUser(res.data.user);
    } catch (err) {
      throw err.response?.data?.message || 'Registration failed';
    }
  };

  const logout = async () => {
    await axios.get('/logOut');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};