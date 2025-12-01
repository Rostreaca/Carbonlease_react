import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:80';

const adminActivityAPI = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

adminActivityAPI.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchAdminBoards = (page) =>
  adminActivityAPI.get(`/activityBoards`, { params: { page } });

export const fetchAdminBoardDetail = (id) =>
  adminActivityAPI.get(`/activityBoards/${id}`).then(res => {
    console.log("DETAIL:", res.data);
    return res;
  });


export const updateAdminBoard = (id, data) =>
  adminActivityAPI.patch(`/activityBoards/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
});


export const hideBoard = (id) =>
  adminActivityAPI.patch(`/activityBoards/hide/${id}`);

export const restoreBoard = (id) =>
  adminActivityAPI.patch(`/activityBoards/restore/${id}`);

export const deleteBoard = (id) =>
  adminActivityAPI.delete(`/activityBoards/${id}`);

