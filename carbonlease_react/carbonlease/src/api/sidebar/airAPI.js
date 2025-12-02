import axios from "axios";
import { xml2json } from "xml-js";

const cache = {};
const CACHE_DURATION = 1000 * 60 * 5; // 5분 캐시

export const fetchAirAPI = async (region) => {
  // 캐시 체크
  const cacheKey = `air-${region}`;
  const now = Date.now();

  if (cache[cacheKey] && now - cache[cacheKey].time < CACHE_DURATION) {
    // console.log("캐시 사용:", cacheKey);
    return cache[cacheKey].data;
  }

  // API 요청
  const url =
    "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";

  const params = {
    serviceKey: import.meta.env.VITE_PUBLIC_DATA_KEY,
    returnType: "xml",
    numOfRows: 100,
    pageNo: 1,
    sidoName: "서울",
    stationName: region,
    ver: "1.0",
  };

  const res = await axios.get(url, { params, responseType: "text" });
  const json = JSON.parse(xml2json(res.data, { compact: true, spaces: 2 }));

  // 캐시 저장
  cache[cacheKey] = {
    time: Date.now(),
    data: json,
  };

  return json;
};
