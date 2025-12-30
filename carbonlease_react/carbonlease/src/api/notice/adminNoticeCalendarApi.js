import { API_BASE_URL, createApiInstance } from "../api.js";

// 공통 인터셉터가 적용된 Axios 인스턴스 생성
const adminCalendarApi = createApiInstance(`${API_BASE_URL}/api/admin/calendar`);

// 일정 전체 조회
export const getCalendarEvents = async () => {
  const res = await adminCalendarApi.get("");
  return res.data; 
};

// 일정 등록
export const createCalendarEvent = async (payload) => {
  const res = await adminCalendarApi.post("", payload);
  return res.data;
};

// 일정 수정
export const updateCalendarEvent = async (calendarNo, payload) => {
  const res = await adminCalendarApi.put(`/${calendarNo}`, payload);
  return res.data;
};

// 일정 삭제
export const deleteCalendarEvent = async (calendarNo) => {
  const res = await adminCalendarApi.delete(`/${calendarNo}`);
  return res.data;
};

// 카테고리 불러오기
export const getCategories = async () => {
  const res = await adminCalendarApi.get("category");
  return res.data;
}
