import axios from 'axios';

// Spring Boot API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios 인스턴스 생성
const campaignApi = axios.create({
    baseURL: `${API_BASE_URL}/campaigns`,
    timeout: 10000,
    //withCredentials: true, // 쿠키(세션) 전송을 위해 추가
    headers: {
        'Content-Type': 'application/json',
    }
});

// 캠페인 리스트 조회
export const findAll = (page) => {
    return campaignApi.get('', {
        params: { pageNo : page }
    });
};

// 캠페인 상세 조회
export const findByNo = (id) => {
    return campaignApi.get(`/detail/${id}`);
};

// 캠페인 좋아요 토글
export const toggleLike = (id) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        return Promise.reject(new Error('No token found'));
    }
    
    return campaignApi.post(`/${id}/like`, {}, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};







