import axios from 'axios';

// Spring Boot API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios 인스턴스 생성
const campaignApi = axios.create({
    baseURL: `${API_BASE_URL}/campaigns`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// 인터셉터 설정: 모든 요청에 토큰 자동 주입
campaignApi.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 캠페인 리스트 조회
export const findAll = (page) => {
    return campaignApi.get('', {
        params: { pageNo : page }
    });
};

// 캠페인 상세 조회
export const findDetailByNo = (id) => {
    return campaignApi.get(`/detail/${id}`);
};

// 캠페인 좋아요 토글
export const toggleLike = (id) => {
    return campaignApi.post(`/${id}/like`, {});
};







