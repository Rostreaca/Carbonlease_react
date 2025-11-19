import axios from 'axios';

// Spring Boot API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:80';

// Axios 인스턴스 생성
const campaignApi = axios.create({
    baseURL: `${API_BASE_URL}/campaigns`,
    timeout: 10000,
    withCredentials: true, // 쿠키(세션) 전송을 위해 추가
    headers: {
        'Content-Type': 'application/json',
    }
});

// 캠페인 리스트 조회
export const selectCampaignListWithPage  = (page = 1, size = 12) => {
    return campaignApi.get('', {
        params: { page, size }
    });
};


// 캠페인 좋아요 토글
export const toggleLike = (campaignNo) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        return Promise.reject(new Error('No token found'));
    }
    
    return campaignApi.post(`/${campaignNo}/like`, {}, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

// 캠페인 상세 조회
export const selectByCampaignNo = (campaignNo) => {
    return campaignApi.get(`/detail/${campaignNo}`);
};



