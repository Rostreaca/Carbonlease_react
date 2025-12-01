import { useEffect, useState } from "react"
import { fetchForecastAPI } from "../../../../api/sidebar/forecastAPI";

export const useForecast = () => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    fetchForecastAPI()
      .then(setForecast)
      .catch((err) => console.error("예보 실패", err));
  }, []);

  return forecast;
};