import axios from 'axios';

// API'nin temel URL'si
const apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Axios örneği oluştur
const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// İstek interceptor'ü
axiosInstance.interceptors.request.use(
  (config) => {
    // İstek göndermeden önce yapılacak işlemler
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Yanıt interceptor'ü
axiosInstance.interceptors.response.use(
  (response) => {
    // 2xx yanıtları için
    return response;
  },
  (error) => {
    // Hata yanıtları için
    // Toast mesajları veya global hata işleme burada yapılabilir
    return Promise.reject(error);
  }
);

export default axiosInstance;