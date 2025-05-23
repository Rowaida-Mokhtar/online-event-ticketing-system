import React, { createContext, useState, useEffect } from 'react';
import axios from '../services/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/users/profile');
      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchProfile(); // Load user if cookie exists
  }, []);

  const login = async (email, password) => {
    await axios.post('/login', { email, password });
    await fetchProfile();
  };

  const register = async ({ name, email, password, role }) => {
    await axios.post('/register', { name, email, password, role });
    await fetchProfile(); // Ensure user is loaded immediately after register
  };

  const logout = async () => {
    await axios.get('/logOut');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
