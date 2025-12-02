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

export const fetchActivityBoards = (pageNo, filter, keyword) => {
  return activityAPI.get("", {
    params: {
      pageNo,
      filter,
      keyword
    }
  });
};

export const fetchActivityDetail = (activityNo, accessToken) => {
  return activityAPI.get(`/${activityNo}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};


export const toggleLike = (activityNo) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return Promise.reject(new Error('No token found'));
    }
    return activityAPI.post(`/${activityNo}/like`, {}, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};


export const deleteActivityBoard = (activityNo) => {
    const accessToken = localStorage.getItem("accessToken");

    return activityAPI.delete(`/${activityNo}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const fetchRepliesAPI = (activityNo, pageNo) => {
  return activityAPI.get(`/${activityNo}/replies`, {
    params: { pageNo }
  });
};

export const insertReplyAPI = (activityNo, replyContent, accessToken) => {
  return activityAPI.post(
    `/${activityNo}/replies`,
    { replyContent },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
};

export const deleteReplyAPI = (replyNo, accessToken) => {
  return activityAPI.delete(`/replies/${replyNo}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};


export const updateReplyAPI = async (replyNo, replyContent, accessToken) => {
  return activityAPI.put(
    `/replies/${replyNo}`,
    { replyContent },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
};

export const increaseViewCountAPI = (activityNo) => {
  return activityAPI.post(`/${activityNo}/view`);
};

export const activityUpdateForm = (activity, file, accessToken) => {

  const formData = new FormData();

  Object.entries(activity).forEach(([key, value]) => {
    formData.append(key, value);
  });

  if (file) {
    formData.append("file", file);
  }

  return activityAPI.put(`/${activity.activityNo}`, formData,{
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type" : "multipart/form-data",
    },
  });
};



