import axios from 'axios';

// Spring Boot API Base URL
const API_BASE_URL = window.ENV?.API_URL || "http://localhost:8080";

// Axios 인스턴스 생성
const adminNoticeApi = axios.create({
    baseURL: `${API_BASE_URL}/admin/notices`,
});

// 인터셉터 설정: 모든 요청에 토큰 자동 주입
adminNoticeApi.interceptors.request.use(
    
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

// 목록조회
export const getNoticesAdmin = async (pageNo) => {
    const res = await adminNoticeApi.get("",{
        params: { pageNo },
    });
    return res.data.data;
}

// 상세조회
export const getNoticeDetailAdmin = async (noticeNo) => {
  const res = await adminNoticeApi.get(`/detail/${noticeNo}`);
  return res.data.data;
};


// 삭제
export const deleteNotice = async (noticeNo) => {
  const res = await adminNoticeApi.put(`/delete/${noticeNo}`);
  return res.data.data;
};

// (삭제된 게시물)복구
export const restoreNotice = async (noticeNo) => {
  const res = await adminNoticeApi.put(`/restore/${noticeNo}`);
  return res.data.data;
};


