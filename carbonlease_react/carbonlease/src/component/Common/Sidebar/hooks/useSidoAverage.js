import { useEffect, useState } from "react";
import { fetchSidoAPI } from "../../../../api/sidebar/sidoAPI";

export const useSidoAverage = (sido) => {
  const [avg, setAvg] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSidoAPI(sido);

        const items = data?.response?.body?.items?.item;
        if (!items) return;

        const pm25Values = items
          .map((i) => Number(i.pm25Value?._text || 0))
          .filter((v) => !isNaN(v) && v > 0);

        const avgValue =
          Math.round(
            pm25Values.reduce((a, b) => a + b, 0) / pm25Values.length
          ) || 0;

        const time = items[0].dataTime._text;

        setAvg({ value: avgValue, time });
      } catch (err) {
        console.error("시도 평균 실패:", err);
      }
    };

    load();
  }, [sido]);

  return avg;
};
