import axios from "axios";
import { xml2json } from "xml-js";

export const fetchAirAPI = async (region) => {
  const url = "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";

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
  return JSON.parse(xml2json(res.data, { compact: true, spaces: 2 }));
};
