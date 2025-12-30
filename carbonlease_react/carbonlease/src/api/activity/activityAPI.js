import { API_BASE_URL, createApiInstance } from '../api.js';

const activityAPI = createApiInstance(`${API_BASE_URL}/api/activityBoards`);
activityAPI.defaults.timeout = 10000;
activityAPI.defaults.headers['Content-Type'] = 'application/json';

export const activityInsertForm = (activity, file) => {
  const formData = new FormData();
  Object.entries(activity).forEach(([key, value]) => {
    formData.append(key, value);
  });
  if(file) {
    formData.append("file", file);
  }
  return activityAPI.post('/insert', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const fetchActivityBoards = (pageNo, filter, keyword) => {
  return activityAPI.get("", {
    params: {
      pageNo,
      filter,
      keyword
    }
  });
};

export const fetchActivityDetail = (activityNo) => {
  return activityAPI.get(`/${activityNo}`);
};


export const toggleLike = (activityNo) => {
  return activityAPI.post(`/${activityNo}/like`);
};


export const deleteActivityBoard = (activityNo) => {
    return activityAPI.delete(`/${activityNo}`);
};

export const fetchRepliesAPI = (activityNo, pageNo) => {
  return activityAPI.get(`/${activityNo}/replies`, {
    params: { pageNo }
  });
};

export const insertReplyAPI = (activityNo, replyContent) => {
  return activityAPI.post(
    `/${activityNo}/replies`,
    { replyContent }
  );
};

export const deleteReplyAPI = (replyNo) => {
  return activityAPI.delete(`/replies/${replyNo}`);
};


export const updateReplyAPI = async (replyNo, replyContent) => {
  return activityAPI.put(
    `/replies/${replyNo}`,
    { replyContent }
  );
};

export const increaseViewCountAPI = (activityNo) => {
  return activityAPI.post(`/${activityNo}/view`);
};

export const activityUpdateForm = (activity, file) => {
  const formData = new FormData();
  Object.entries(activity).forEach(([key, value]) => {
    formData.append(key, value);
  });
  if (file) {
    formData.append("file", file);
  }
  return activityAPI.put(`/${activity.activityNo}`, formData,{
    headers: {
      "Content-Type" : "multipart/form-data",
    },
  });
};



