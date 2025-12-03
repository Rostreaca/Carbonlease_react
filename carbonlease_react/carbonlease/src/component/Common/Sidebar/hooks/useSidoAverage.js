import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const useSidoAverage = (sido) => {
  const [data, setData] = useState(null);


  useEffect(() => {
    if (!sido) return;

    axios
      .get(`${API_BASE}/api/air/sido`, { params: { name: sido } })
      .then((res) => setData(res.data))
      .catch(console.error);
  }, [sido]);

  return data;
};
