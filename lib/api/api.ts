import axios from 'axios';

const raw = process.env.NEXT_PUBLIC_API_URL ?? '';
const origin = raw.endsWith('/') ? raw.slice(0, -1) : raw;
const baseURL = `${origin}/api`;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export default api;