import { API_BASE_URL, createApiInstance } from '../api.js';

// 공통 인터셉터가 적용된 Axios 인스턴스 생성
const adminDashboardApi = createApiInstance(`${API_BASE_URL}/api/admin/home`);

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
