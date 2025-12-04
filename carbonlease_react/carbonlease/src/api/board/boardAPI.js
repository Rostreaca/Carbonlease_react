import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:80';

const boardAPI = axios.create({
  baseURL: `${API_BASE_URL}/boards`,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type' : 'application/json'
  }
});

export const BoardInsertForm = (board, accessToken) => {

  const formData = new FormData();

  Object.entries(board).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return boardAPI.post('/insert', formData, {
    headers: {
      Authorization : `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data"
    }
  });
};

export const Boards = (pageNo, filter, keyword) => {
  return boardAPI.get("", {
    params: {
      pageNo,
      filter,
      keyword
    }
  });
};

export const increaseViewCountAPI = (boardNo) => {
  return boardAPI.post(`/${boardNo}/view`);
};