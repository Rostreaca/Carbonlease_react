import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const useSidoAverage = (sido) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sido) return;

    setLoading(true);

    axios
      .get(`${API_BASE}/api/air/sido`, { params: { name: sido } })
      .then((res) => {
        setData(res.data);
        // 성공하면 캐싱 처리
        localStorage.setItem(
          `sido-${sido}`,
          JSON.stringify({
            time: Date.now(),
            data: res.data
          })
        );
      })
      .catch((err) => {
        console.error(err);

        // 실패하면 캐싱된 데이터 fallBack
        const cached = localStorage.getItem(`sido-${sido}`);
        if(cached) {
          const parsed = JSON.parse(cached);
          setData(parsed.data);
        } else {
          setData(null);
        }
      })
      .finally(() => setLoading(false));
    }, [sido]);

  return { data, loading };
};
