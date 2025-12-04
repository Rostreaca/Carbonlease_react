import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// 1. API에서 데이터 받아오기 (백엔드 DTO 구조에 맞춤)
export const getRegionStats = async () => {
  const res = await axios.get(`${API_BASE}/api/main/regions`);
  console.log('[regionStatsApi] getRegionStats 응답:', res.data);
  // [{ localName, topRegionName, year, avgUseQnt, usagePercent, latitude, longitude }, ...]
  return res.data;
};

// 2. 지도/차트에서 쓸 수 있게 포맷
export const formatRegionStatsForMap = (list) =>
  list.map((item) => ({
    localName: item.localName,
    topRegionName: item.topRegionName,
    year: item.year,
    avgUseQnt: item.avgUseQnt,
    usagePercent: item.usagePercent,
    latitude: Number(item.latitude),
    longitude: Number(item.longitude)
  }));