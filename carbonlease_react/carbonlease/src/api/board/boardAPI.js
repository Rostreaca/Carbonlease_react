import { API_BASE_URL, createApiInstance } from '../api.js';

const boardAPI = createApiInstance(`${API_BASE_URL}/api/boards`);
boardAPI.defaults.timeout = 10000;
boardAPI.defaults.headers['Content-Type'] = 'application/json';

export const boardInsertFormApi = (board) => {
  const formData = new FormData();
  Object.entries(board).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return boardAPI.post('/insert', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const boardsApi = (pageNo, filter, keyword) => {
  return boardAPI.get("", {
    params: {
      pageNo,
      filter,
      keyword
    }
  });
};

export const increaseViewCountApi = (boardNo) => {
  return boardAPI.post(`/${boardNo}/view`);
};

// 댓글 목록 조회
export const getRepliesApi = (boardNo, pageNo = 1) => {
  return boardAPI.get(`/detail/${boardNo}`); 
};

// 댓글 작성
export const insertReplyApi = (replyData) => {
  return boardAPI.post(`/detail/replyInsert`, replyData);
};

// 댓글 수정
export const updateReplyApi = (replyData) => {
  return boardAPI.post(`/detail/replyUpdate`, replyData);
};

// 댓글 삭제
export const deleteReplyApi = (replyNo) => {
  return boardAPI.delete(`/detail/replyDelete/${replyNo}`);
};