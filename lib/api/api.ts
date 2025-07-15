import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const baseURL = isProd
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`  // в проде ваш Vercel-домен + /api
  : '/api';                                    // в деве всегда /api

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;