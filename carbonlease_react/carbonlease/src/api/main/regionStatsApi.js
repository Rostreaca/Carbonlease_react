import axios from "axios";

// Spring Boot API Base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios 인스턴스 생성
const adminCampaignApi = axios.create({
    baseURL: `${API_BASE_URL}/api/main`,
    timeout: 10000,
});

// 지역 통계 데이터 조회
export const getRegionStats = () => {
    return adminCampaignApi.get('/regionUsage');
};


// // 1. API에서 데이터 받아오기 (백엔드 DTO 구조에 맞춤)
// export const getRegionStats = async () => {
//   const res = await axios.get(`${API_BASE}/api/main/regions`);
//   console.log('[regionStatsApi] getRegionStats 응답:', res.data);
//   return res.data;
// };

// // 2. 지도/차트에서 쓸 수 있게 포맷
// export const formatRegionStatsForMap = (list) =>
//   list.map((items) => ({
//     localName: items.localName,
//     topRegionName: items.topRegionName,
//     year: items.year,
//     avgUseQnt: items.avgUseQnt,
//     usagePercent: items.usagePercent,
//     latitude: Number(items.latitude),
//     longitude: Number(items.longitude)
// }));