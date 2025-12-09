// CalendarModal.jsx
import React, { useContext, useEffect, useState } from "react";
import {
  ModalOverlay,
  ModalWrapper,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  Input,
  Label,
  Button
} from "./CalendarModal.styled";
import axios from "axios";
import { AuthContext } from '../../../Context/AuthContext';


const CalendarModal = ({ isOpen, onClose, onSubmit, onDelete, event, isEdit }) => {
  const { auth } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: "",
    start: "",
    end: "",
    categoryNo: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(()=> {
    if (!auth?.accessToken) return;

    axios.get("http://localhost/admin/calendar/category", {
    headers:{ Authorization:`Bearer ${auth.accessToken}` }
  }).then(res => {
    setCategories(res.data?.categories ?? []);
  });
  }, [auth])

  useEffect(() => {
    if (isEdit && event) {
      setForm({
        title: event.title,
        start: event.start,
        end: event.end,
        categoryNo: event.categoryNo
      });
    } else {
      setForm({
        title: "",
        start: "",
        end: "",
        categoryNo: ""
      });
    }
  }, [isEdit, event]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <ModalHeader>
            <h3>{isEdit ? "일정 수정" : "일정 등록"}</h3>
            <CloseButton onClick={onClose}>×</CloseButton>
          </ModalHeader>

          <ModalBody>
            <Label>제목</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
            />

            <Label>카테고리</Label>
            <select
              name="categoryNo"
              value={form.categoryNo}
              onChange={handleChange}
              style={{padding:6}}>

                <option value="">카테고리 선택</option>
                
                {categories.map(c => (
                  <option key={c.categoryNo} value={c.categoryNo}>
                    {c.categoryName}
                  </option>
                ))}
            </select>

            <Label>시작일</Label>
            <Input
              type="date"
              name="start"
              value={form.start}
              onChange={handleChange}
            />

            <Label>종료일</Label>
            <Input
              type="date"
              name="end"
              value={form.end}
              onChange={handleChange}
            />
          </ModalBody>

          <ModalFooter>
            {isEdit && (
              <Button $cancel onClick={onDelete}>
                삭제
              </Button>
            )}

            <Button onClick={handleSubmit}>
              {isEdit ? "수정 완료" : "등록"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default CalendarModal;
