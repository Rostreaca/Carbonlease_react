import { API_BASE_URL, createApiInstance } from '../api.js';

// 공통 인터셉터가 적용된 Axios 인스턴스 생성 (baseURL만 지정)
const adminNoticeApi = createApiInstance(`${API_BASE_URL}/api/admin/notices`);

// 목록조회
export const getNoticesAdmin = async (pageNo) => {
    const res = await adminNoticeApi.get("",{
        params: { pageNo },
    });
    return res.data;
}

// 상세조회
export const getNoticeDetailAdmin = async (noticeNo) => {
  const res = await adminNoticeApi.get(`/detail/${noticeNo}`);
  return res.data;
};


// 삭제
export const deleteNotice = async (noticeNo) => {
  const res = await adminNoticeApi.put(`/delete/${noticeNo}`);
  return res.data;
};