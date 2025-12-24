import axios from "axios";

// Spring Boot API Base URL
const API_BASE_URL = window.ENV?.API_URL || "http://localhost:8080";

// Axios 인스턴스 생성
const adminCalendarApi = axios.create({
  baseURL: `${API_BASE_URL}/admin/calendar`,
});

// 인터셉터 설정: 모든 요청에 토큰 자동 주입
adminCalendarApi.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
