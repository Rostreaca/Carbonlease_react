import axios from "axios";

export const fetchSidoAverage = async (sido) => {
  const res = await axios.get(`/api/air/sido`, {
    params: { sido },
  });

  // backend가 { sido, value, time } 형태로 주도록 맞춰둠
  return res.data; 
};
