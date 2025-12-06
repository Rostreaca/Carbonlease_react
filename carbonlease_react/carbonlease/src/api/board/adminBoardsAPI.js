import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:80';

const adminBoardsAPI = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 토큰 자동 주입
adminBoardsAPI.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 목록 조회
export const fetchAdminBoards = (page, status, keyword) =>
  adminBoardsAPI.get(`/boards`, { params: { page, status, keyword } });

// 상세 조회 ★ 여기서 백엔드 지원이 필요함
export const fetchAdminBoardDetail = (id) =>
  adminBoardsAPI.get(`/boards/${id}`);

// 수정
export const updateAdminBoard = (id, data) =>
  adminBoardsAPI.patch(`/boards/${id}`, data);

// 숨김
export const hideBoard = (id) =>
  adminBoardsAPI.patch(`/boards/hide/${id}`);

// 복구
export const restoreBoard = (id) =>
  adminBoardsAPI.patch(`/boards/restore/${id}`);

// 삭제
export const deleteBoard = (id) =>
  adminBoardsAPI.delete(`/boards/delete/${id}`);
