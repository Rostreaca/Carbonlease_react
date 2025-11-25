import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:80';

const adminActivityAPI = axios.create({
  baseURL: `${API_BASE_URL}/admin/activityBoards`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type' : 'application/json'
  }
});

adminActivityAPI.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchAdminBoards = (pageNo) =>
  adminActivityAPI.get("", { params: { pageNo } });

export const hideBoard = (id) =>
  adminActivityAPI.patch(`/${id}/hide`);

export const restoreBoard = (id) =>
  adminActivityAPI.patch(`/${id}/restore`);

export const deleteBoard = (id) =>
  adminActivityAPI.delete(`/${id}`);