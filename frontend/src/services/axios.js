// src/services/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // your backend base URL
  withCredentials: true, // if using cookies (optional)
});

export default instance;
