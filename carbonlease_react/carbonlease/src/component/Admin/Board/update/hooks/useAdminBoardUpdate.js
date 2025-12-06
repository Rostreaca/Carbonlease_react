import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchAdminBoardDetail,
  updateAdminBoard
} from "../../../../../api/board/adminBoardsAPI";

export const useAdminBoardUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    regionNo: ""
  });

  const [errors, setErrors] = useState({});

  const regionOptions = [
    { value: "1", label: "서울특별시" },
    { value: "2", label: "부산광역시" },
    { value: "3", label: "대구광역시" },
    { value: "4", label: "인천광역시" },
    { value: "5", label: "광주광역시" },
    { value: "6", label: "대전광역시" },
    { value: "7", label: "울산광역시" },
    { value: "8", label: "세종특별자치시" },
    { value: "9", label: "경기도" },
    { value: "10", label: "강원도" },
    { value: "11", label: "충청북도" },
    { value: "12", label: "충청남도" },
    { value: "13", label: "전라북도" },
    { value: "14", label: "전라남도" },
    { value: "15", label: "경상북도" },
    { value: "16", label: "경상남도" },
    { value: "17", label: "제주특별자치도" }
  ];

  useEffect(() => {
    fetchAdminBoardDetail(id)
      .then((res) => {
        const d = res.data;
        setFormData({
          title: d.title || "",
          content: d.content || "",
          regionNo: d.regionNo ? String(d.regionNo) : ""
        });
      })
      .catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const err = {};
    if (!formData.title.trim()) err.title = "제목을 입력하세요.";
    if (!formData.content.trim()) err.content = "내용을 입력하세요.";
    if (!formData.regionNo) err.regionNo = "지역을 선택하세요.";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    updateAdminBoard(id, formData)
      .then(() => {
        alert("수정 완료!");
        navigate("/admin/boards");
      })
      .catch(console.error);
  };

  return {
    formData,
    errors,
    regionOptions,
    handleChange,
    handleSubmit,
    handleCancel: () => navigate("/admin/boards"),
  };
};
