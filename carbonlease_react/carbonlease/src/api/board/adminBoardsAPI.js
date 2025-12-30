import { API_BASE_URL, createApiInstance } from '../api.js';

const adminBoardsAPI = createApiInstance(`${API_BASE_URL}/api/admin`);
adminBoardsAPI.defaults.timeout = 10000;
adminBoardsAPI.defaults.headers['Content-Type'] = 'application/json';

// 목록 조회
export const fetchAdminBoardsApi = (page, status, keyword) =>
  adminBoardsAPI.get(`/boards`, { params: { page, status, keyword } });

// 상세 조회 
export const fetchAdminBoardDetailApi = (id) =>
  adminBoardsAPI.get(`/boards/${id}`);

// 수정
export const updateAdminBoardApi = (id, data) =>
  adminBoardsAPI.patch(`/boards/${id}`, data);

// 숨김
export const hideBoardApi = (id) =>
  adminBoardsAPI.patch(`/boards/hide/${id}`);

// 복구
export const restoreBoardApi = (id) =>
  adminBoardsAPI.patch(`/boards/restore/${id}`);

// 삭제
export const deleteBoardApi = (id) =>
  adminBoardsAPI.delete(`/boards/delete/${id}`);
