import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// 1. API에서 데이터 받아오기
export const getRegionCarbonStats = async () => {
  const res = await axios.get(`${API_BASE}/api/region/map`);
  console.log('[regionStatsApi] getRegionCarbonStats 응답:', res.data);
  return res.data; // [{ region, lat, lng, value }, ...]
};

// 2. 지도에서 쓸 수 있게 포맷 (단위 변환 등)
export const formatRegionStatsForMap = (list) =>
  list.map((item) => {
    return {
      region: item.region,
      lat: item.lat,
      lng: item.lng,
      value: typeof item.value === 'string'
      ? Number(item.value.replace('%', ''))
      : Number(item.value),
    };
  });