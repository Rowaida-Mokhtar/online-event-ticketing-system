// src/services/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true,
});

export const login = (data) => instance.post('/login', data);
export const register = (data) => instance.post('/register', data);

export default instance;
