import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : '/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;