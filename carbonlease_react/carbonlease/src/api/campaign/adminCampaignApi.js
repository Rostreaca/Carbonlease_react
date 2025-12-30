import { API_BASE_URL, createApiInstance } from '../api.js';

// 공통 인터셉터가 적용된 Axios 인스턴스 생성
const adminCampaignApi = createApiInstance(`${API_BASE_URL}/api/admin/campaigns`);

// 캠페인 게시글 전체 조회
export const findAllApi = (page, status, keyword) => {
    return adminCampaignApi.get('', {
        params: {
            pageNo: page,
            status: status,
            keyword: keyword,
        }
    });
};

// 캠페인 게시글 등록
export const saveApi = (campaign, files) => {
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
export const getCategoriesApi = () => {
    return adminCampaignApi.get('/categories');
};


// 캠페인 게시글 수정
export const updateApi = (id, files, campaign) => {
    
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
    if (files?.[0]) formData.append("thumbnail", files[0]);
    if (files?.[1]) formData.append("detailImage", files[1]);
    
    return adminCampaignApi.put(`/${id}`, formData);
}


// 캠페인 게시글 숨김 처리 (상태값 N으로 변경)
export const hideByIdApi = (id) => {
    return adminCampaignApi.post(`/${id}/hide`);
};

// 캠페인 게시글 복구
export const restoreByIdApi = (id) => {
    return adminCampaignApi.post(`/${id}/restore`);
};

// 캠페인 게시글 완전 삭제
export const deleteByIdApi = (id) => {
    return adminCampaignApi.delete(`/${id}`);
};