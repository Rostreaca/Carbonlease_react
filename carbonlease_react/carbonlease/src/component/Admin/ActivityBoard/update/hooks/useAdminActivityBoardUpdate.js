// index.js (useAdminActivityBoardUpdate)
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateAdminBoard } from "../../../../../api/activity/adminActivityAPI";

import { useFileWithPreview } from "./useFileWithPreview";
import { useAdminActivityBoardLoader } from "./useAdminActivityBoardLoader";
import { useAdminActivityBoardValidator } from "./useAdminActivityBoardValidator";

export const useAdminActivityBoardUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    activityTitle: "",
    activityContent: "",
    category: "",
  });

  const categoryOptions = [
  { value: "1", label: "대중교통 이용" },
  { value: "2", label: "텀블러 사용" },
  { value: "3", label: "분리수거 실천" },
  { value: "4", label: "자전거 이동" },
  { value: "5", label: "계단 이용" },
  { value: "6", label: "절전 세탁" },
  { value: "7", label: "비건 식단" },
  { value: "8", label: "도보 이동" },
  { value: "9", label: "샤워 절약" },
  { value: "10", label: "전기 절약" }
];


  const [errors, setErrors] = useState({});
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [thumbnailFileName, setThumbnailFileName] = useState("");

  const {
    file: thumbnailFile,
    onFileChange: handleFileChange,
  } = useFileWithPreview({ 
      setThumbnailPreview,
      setThumbnailFileName
  });

  useAdminActivityBoardLoader({
    id,
    setFormData,
    setThumbnailPreview,
    setThumbnailFileName,
  });

  const { validate } = useAdminActivityBoardValidator(
    formData,
    setErrors
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const fd = new FormData();
    fd.append("title", formData.activityTitle);
    fd.append("content", formData.activityContent);
    fd.append("category", formData.category);

    if (thumbnailFile) {
      fd.append("thumbnailFile", thumbnailFile);
    }

    updateAdminBoard(id, fd)
      .then(() => {
        alert("수정 완료!");
        navigate("/admin/activityBoards");
      })
      .catch(console.error);
  };

  return {
    formData,
    errors,
    thumbnailPreview,
    thumbnailFileName,
    categoryOptions, 
    handleChange,
    handleFileChange,
    handleSubmit,
    handleCancel: () => navigate("/admin/activityBoards"),
  };
};
