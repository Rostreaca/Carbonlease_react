import axios from 'axios';

// Spring Boot API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios 인스턴스 생성
const eventMainApi = axios.create({
    baseURL: `${API_BASE_URL}/api/events`
});

// 인터셉터 설정: 모든 요청에 토큰 자동 주입
eventMainApi.interceptors.request.use(
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


// 메인 이벤트 정보 조회 (누구나 가능)
export const fetchMainEvent = () => {
    return eventMainApi.get(`/main`);
};

// 이벤트 참여
export const participateEvent = (eventId) => {
    return eventMainApi.post(`/${eventId}/participate`);
};