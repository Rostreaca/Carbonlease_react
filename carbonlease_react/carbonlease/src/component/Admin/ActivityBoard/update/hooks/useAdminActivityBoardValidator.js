export const useAdminActivityBoardValidator = (formData, setErrors) => {

  const validate = () => {
    const newErrors = {};

    if (!formData.activityTitle.trim())
      newErrors.activityTitle = "제목을 입력해주세요.";

    if (!formData.activityContent.trim())
      newErrors.activityContent = "내용을 입력해주세요.";

    if (!formData.category)
      newErrors.category = "카테고리를 선택해주세요.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { validate };
};
