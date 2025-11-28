import axios from "axios";
import { xml2json } from "xml-js";

export const fetchForecastAPI = async () => {
  const url =
    "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth";

  const today = new Date().toISOString().slice(0, 10);

  const params = {
    serviceKey: import.meta.env.VITE_PUBLIC_DATA_KEY,
    returnType: "xml",
    numOfRows: 100,
    pageNo: 1,
    searchDate: today,
    informCode: "PM25",
  };

  const res = await axios.get(url, { params, responseType: "text" });

  return JSON.parse(xml2json(res.data, { compact: true, spaces: 2 }));
};
