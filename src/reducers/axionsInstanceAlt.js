import axios from 'axios';

const instance = axios.create({
  //baseURL: 'https://api.tekrem.com/api',
  baseURL: 'https://localhost:44381/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;