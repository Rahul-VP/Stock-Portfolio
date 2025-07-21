import axios from 'axios';

const api = axios.create({
  baseURL: '', // Use relative URLs, proxy will forward to backend
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api; 