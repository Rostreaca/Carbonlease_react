import { useEffect, useState } from "react";
import { fetchAirAPI } from "../../../../api/sidebar/airAPI";

export const useAir = (region) => {
  const [air, setAir] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAirAPI(region);
        setAir(data);
      } catch (err) {
        console.error("대기 정보 불러오기 실패:", err);
      }
    };

    load();
  }, [region]);

  return air;
};
