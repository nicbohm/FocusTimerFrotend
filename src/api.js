import axios from 'axios';

// const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'https://focus-timer-backend.onrender.com';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
