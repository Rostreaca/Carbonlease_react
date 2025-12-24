// src/api/common/reqObj.js
import axiosInstance from './axiosInstance';

// 공통 요청 객체
export const reqObj = {
    getList: (url) =>
        axiosInstance.get(url).then(res => res.data.data),
    create: (url, obj, file) => {
        const formData = new FormData();
        formData.append("obj", obj);
        if (file) formData.append("file", file);

        return axiosInstance.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(res => res.data.data);
    },
    delete: (url, pk) =>
        axiosInstance.delete(`${url}/${pk}`).then(res => res.data.data),
};