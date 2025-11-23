
import axios from 'axios';

// Spring Boot API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios 인스턴스 생성
const adminCampaignApi = axios.create({
    baseURL: `${API_BASE_URL}/admin/campaigns`,
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

// 캠페인 게시글 등록
export const save = (campaign, files, accessToken) => {
    const formData = new FormData();

    Object.entries(campaign).forEach(([key, value]) => {
        formData.append(key, value);
    });

    // 서버가 요구하는 이름으로 추가
    formData.append("thumbnail", files[0]);
    formData.append("detailImage", files[1]);

    return adminCampaignApi.post('/insert', formData, {
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





