import axios from "axios";
import { API_BASE_URL } from "../api.js";

// Axios 인스턴스 생성
const adminCampaignApi = axios.create({
    baseURL: `${API_BASE_URL}/api/main`,
});

// 지역 통계 데이터 조회
export const getRegionStats = () => {
    return adminCampaignApi.get('/regionUsage');
};
