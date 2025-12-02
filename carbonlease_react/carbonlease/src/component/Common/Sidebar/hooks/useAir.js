import { useState, useEffect } from "react";
import axios from "axios";

export const useAir = (stationName) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`/api/air/station`, {
          params: { stationName }
        });
        setData(res.data);
      } catch (e) {
        console.error("대기질 조회 실패:", e);
      }
    };

    load();
  }, [stationName]);

  return data;
};
