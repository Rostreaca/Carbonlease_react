import { API_BASE_URL, createApiInstance } from '../api.js';

// 공통 인터셉터가 적용된 Axios 인스턴스 생성
const noticeApi = createApiInstance(`${API_BASE_URL}/api/notices`);

// 목록조회
export const getNotices = async (pageNo) => {
    const res = await noticeApi.get("",{
        params: { pageNo },
    });
    return res.data;
}

// 상세조회
export const getNoticeDetail = async (noticeNo) => {
  const res = await noticeApi.get(`detail/${noticeNo}`);
  return res.data;
};

// TopBar
export const getNoticeTop = async () => {
    const res = await noticeApi.get("fix");
    return res.data;
}