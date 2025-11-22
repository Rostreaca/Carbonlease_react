import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:80';

const activityAPI = axios.create({
  baseURL: `${API_BASE_URL}/activityBoards`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type' : 'application/json'
  }
});

export const activityInsertForm = (activity, file, accessToken) => {

  const formData = new FormData();

  Object.entries(activity).forEach(([key, value]) => {
    formData.append(key, value);
  });

  if(file) {
    formData.append("file", file);
  }

  return activityAPI.post('/insert', formData, {
    headers: {
      Authorization : `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data"
    }
  });
};