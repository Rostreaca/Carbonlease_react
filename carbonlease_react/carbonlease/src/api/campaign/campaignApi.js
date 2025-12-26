import axios from 'axios';
import { API_BASE_URL } from '../api.js';

// Axios 인스턴스 생성
const campaignApi = axios.create({
    baseURL: `${API_BASE_URL}/campaigns`
});

// 인터셉터 설정: 모든 요청에 토큰 자동 주입
campaignApi.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        console.log('accessToken:', accessToken); // 토큰 값 확인
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        console.log('요청 헤더:', config.headers); // 헤더에 토큰이 붙었는지 확인
        return config;
    },
    (error) => Promise.reject(error)
);

// 캠페인 리스트 조회
export const findAll = (page, memberNo) => {
    return campaignApi.get('', {
        params: { pageNo: page, memberNo }
    });
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