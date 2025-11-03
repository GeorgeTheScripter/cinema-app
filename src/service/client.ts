import axios, { type AxiosInstance } from 'axios';

export const omdbClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_OMDB_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apikey: import.meta.env.VITE_OMDB_API_KEY,
  },
});
