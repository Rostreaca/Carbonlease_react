import axios from 'axios';

// Spring Boot API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios 인스턴스 생성
const adminDashboardApi = axios.create({
    baseURL: `${API_BASE_URL}/admin/home`,
});

// 인터셉터 설정: 모든 요청에 토큰 자동 주입
adminDashboardApi.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 게시글 통계 집계 조회
export const getUsersAllBoardsCount = () => {
    return adminDashboardApi.get('/boardsAllCount');
};

// 지역별 커뮤니티 활동량(합산/일반/인증) 통합 조회
export const getUsersRegionActivityStats = () => {
    return adminDashboardApi.get('/activityRegion');
};


// 상위 5개 게시글 조회
export const getAllCountTop5 = () => {
    return adminDashboardApi.get('/boardsTop5');
};
