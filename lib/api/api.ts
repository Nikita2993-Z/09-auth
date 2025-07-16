import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const baseURL = isProd
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : '/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;