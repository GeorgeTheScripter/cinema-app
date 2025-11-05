import axios, { type AxiosInstance } from 'axios';

export const tmdbClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_OMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_OMDB_API_KEY,
    language: 'ru-RU',
  },
});
