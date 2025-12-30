import { API_BASE_URL, createApiInstance } from '../api.js';

const adminActivityAPI = createApiInstance(`${API_BASE_URL}/api/admin/`);

export const fetchAdminBoards = (page, status, keyword) =>
  adminActivityAPI.get(`/activityBoards`, {
    params: { 
      page,
      status,
      keyword
    }
  });

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
  adminActivityAPI.delete(`/activityBoards/delete/${id}`);

