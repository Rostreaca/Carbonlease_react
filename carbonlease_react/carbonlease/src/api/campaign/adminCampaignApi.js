import axios from 'axios';

// Spring Boot API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios 인스턴스 생성
const adminCampaignApi = axios.create({
    baseURL: `${API_BASE_URL}/admin/campaigns`,
    timeout: 10000
});

// 인터셉터 설정: 모든 요청에 토큰 자동 주입
adminCampaignApi.interceptors.request.use(
    
    (config) => {
        // 저장소에서 토큰을 꺼냅니다 (localStorage 예시)
        const accessToken = localStorage.getItem('accessToken');
        
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }

);

// 캠페인 리스트 조회
export const findAll = (page) => {
    return adminCampaignApi.get('', {
        params: { pageNo : page }
    });
};

// 캠페인 게시글 등록
export const save = (campaign, files) => {
    const formData = new FormData();

    Object.entries(campaign).forEach(([key, value]) => {
        formData.append(key, value);
    });

    // 파일 추가
    if (files && files.length > 0) {
        formData.append("thumbnail", files[0]);
        if (files[1]) {
            formData.append("detailImage", files[1]);
        }
    }

    return adminCampaignApi.post('', formData);
};


// 카테고리 목록 조회
export const getCategories = () => {
    return adminCampaignApi.get('/categories');
};


// 캠페인 게시글 수정
export const update = (id, files, campaign) => {
    const formData = new FormData();

    // 서버가 받지 않는 필드 제외
    const excludeFields = [
        'thumbnailFile', 'detailImageFile', 'thumbnailUrl', 'detailImageUrl',
        'attachments', // 첨부파일 배열도 제외
    ];

    // 캠페인 데이터 추가
    Object.entries(campaign).forEach(([key, value]) => {
        if (excludeFields.includes(key)) return;
        // undefined, null, object(파일 제외)는 추가하지 않음
        if (value === undefined || value === null) return;
        if (typeof value === 'object') return;
        formData.append(key, value);
    });

    // 파일 추가
    if (files && files.length > 0) {
        if (files[0]) formData.append("thumbnail", files[0]);
        if (files[1]) formData.append("detailImage", files[1]);
    }

    return adminCampaignApi.put(`/${id}`, formData);
}


// 캠페인 게시글 삭제
export const deleteById = (id) => {
    return adminCampaignApi.delete(`/${id}`);
};