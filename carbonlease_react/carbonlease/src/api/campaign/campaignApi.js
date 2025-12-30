import { API_BASE_URL, createApiInstance } from '../api.js';

// 공통 인터셉터가 적용된 Axios 인스턴스 생성
const campaignApi = createApiInstance(`${API_BASE_URL}/api/campaigns`);

/**
 * 필터 추가 가능성으로 parmas로 변경
 */
// 캠페인 리스트 조회
export const findAll = (params) => {
    return campaignApi.get('', { params });
};

// 캠페인 상세 조회
export const findDetailByNo = (id, memberNo) => {
    return campaignApi.get(`/detail/${id}`, {
        params: { memberNo }
    });
};

// 캠페인 좋아요 토글
export const toggleLike = (id) => {
    return campaignApi.post(`/${id}/like`, {});
};


// 댓글 목록 조회
export const getReplies = (id, pageNo = 1) => {
    return campaignApi.get(`/${id}/replies`, {
        params: { pageNo }
    });
};

// 댓글 등록
export const insertReply = (id, replyContent) => {
    return campaignApi.post(`/${id}/replies`, { replyContent });
};

// 댓글 삭제
export const deleteReply = (replyNo) => {
    return campaignApi.delete(`/replies/${replyNo}`);
};

// 댓글 수정
export const updateReply = (replyNo, replyContent) => {
    return campaignApi.put(`/replies/${replyNo}`, { replyContent });
};