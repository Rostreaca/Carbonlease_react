import { API_BASE_URL, createApiInstance } from '../api.js';

// 공통 인터셉터가 적용된 Axios 인스턴스 생성
const eventMainApi = createApiInstance(`${API_BASE_URL}/api/events`);

// 메인 이벤트 정보 조회 (누구나 가능)
export const fetchMainEvent = () => {
    return eventMainApi.get(`/main`);
};

// 이벤트 참여
export const participateEvent = (eventId) => {
    return eventMainApi.post(`/${eventId}/participate`);
};