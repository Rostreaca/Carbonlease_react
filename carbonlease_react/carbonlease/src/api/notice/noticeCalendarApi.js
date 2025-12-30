import { API_BASE_URL, createApiInstance } from '../api.js';

// 공통 인터셉터가 적용된 Axios 인스턴스 생성
const calendarApi = createApiInstance(`${API_BASE_URL}/api/notices/calendar`);

// 일정 카테고리 갖고오기
export const getCategories = async () => {
    const res = await calendarApi.get("categories");
    return res.data;
}

// 일정 갖고오기
export const getEvents = async () => {
    const res = await calendarApi.get("");
    return res.data;
}