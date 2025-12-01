import { useEffect } from "react";
import { fetchAdminBoardDetail } from "../../../../../api/activity/adminActivityAPI";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:80";

export const useAdminActivityBoardLoader = ({
  id,
  setFormData,
  setThumbnailPreview,
  setThumbnailFileName,
}) => {
  
useEffect(() => {
  fetchAdminBoardDetail(id)
    .then(res => {
      const data = res.data;

      setFormData(prev => ({
        ...prev,
        activityTitle: data.title || "",
        activityContent: data.content || "",
        category: data.categoryNo ? String(data.categoryNo) : ""
      }));

      let thumbUrl = data.thumbnailPath || "";
      if (thumbUrl && !thumbUrl.startsWith("http")) {
        thumbUrl = `${API_BASE_URL}${thumbUrl}`;
      }

      setThumbnailPreview(thumbUrl);
      setThumbnailFileName(data.thumbnailName || "");
    })
    .catch(console.error);
}, [id]);

};
