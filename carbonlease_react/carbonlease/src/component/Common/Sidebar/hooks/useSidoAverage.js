import { useEffect, useState } from "react";
import { fetchSidoAverage } from "../../../../api/sidebar/sidoAPI";

export const useSidoAverage = (sido) => {
  const [avg, setAvg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setError(null);
        const data = await fetchSidoAverage(sido);
        if (!cancelled) {
          if (data.error) {
            setError(data.error);
            setAvg(null);
          } else {
            setAvg({
              value: data.value,
              time: data.time,
            });
          }
        }
      } catch (e) {
        console.error("시/도 평균 조회 실패", e);
        if (!cancelled) {
          setError("조회 실패");
          setAvg(null);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [sido]);

  return avg;
};
