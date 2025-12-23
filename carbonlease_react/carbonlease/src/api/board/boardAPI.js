import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

// 댓글 목록 조회
export const getReplies = (boardNo, pageNo = 1) => {
  return boardAPI.get(`/detail/${boardNo}`); 
};

// 댓글 작성
export const insertReply = (replyData, accessToken) => {
  return boardAPI.post(`/detail/replyInsert`, replyData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
};

// 댓글 수정
export const updateReply = (replyData, accessToken) => {
  return boardAPI.post(`/detail/replyUpdate`, replyData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
};

// 댓글 삭제
export const deleteReply = (replyNo, accessToken) => {
  return boardAPI.delete(`/detail/replyDelete/${replyNo}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });
};