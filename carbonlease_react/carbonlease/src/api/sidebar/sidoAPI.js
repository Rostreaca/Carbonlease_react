import axios from "axios";
import { xml2json } from "xml-js";

const cache = {};
const CACHE_DURATION = 1000 * 60 * 5; // 5분 캐시

export const fetchSidoAPI = async (sido) => {
  const cacheKey = `sido-${sido}`;
  const now = Date.now();

  // 캐시 존재 + 유효하면 바로 리턴
  if (cache[cacheKey] && now - cache[cacheKey].time < CACHE_DURATION) {
    // console.log("시도 캐시 사용:", cacheKey);
    return cache[cacheKey].data;
  }

  // API 요청
  const url =
    "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";

  const params = {
    serviceKey: import.meta.env.VITE_PUBLIC_DATA_KEY,
    returnType: "xml",
    numOfRows: 1000,
    pageNo: 1,
    sidoName: sido,
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
