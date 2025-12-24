// src/api/common/axiosInstance.js
import axios from 'axios';

const API_BASE_URL = window.ENV.API_URL;

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// 인터셉터 설정: 모든 요청에 토큰 자동 주입
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;