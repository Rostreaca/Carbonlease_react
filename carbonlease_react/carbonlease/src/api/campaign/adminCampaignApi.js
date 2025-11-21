
import axios from 'axios';

// Spring Boot API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:80';

// Axios 인스턴스 생성
const adminCampaignApi = axios.create({
    baseURL: `${API_BASE_URL}/admin/campaigns`,
    timeout: 10000,
    withCredentials: true, // 쿠키(세션) 전송을 위해 추가
    headers: {
        'Content-Type': 'application/json',
    }
});

// 캠페인 등록 API
export const insertCampaign = (campaign, files, accessToken) => {

    return adminCampaignApi.post('/insert', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        }
    });

};


// 카테고리 목록 조회
export const fetchCategoryOptions = () => {
    return adminCampaignApi.get('/categories');
};






