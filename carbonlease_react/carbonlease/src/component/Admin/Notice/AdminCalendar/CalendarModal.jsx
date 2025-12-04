import React, { useState } from "react";
import {
  ModalWrapper,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  Input,
  Label,
  Button
} from "./CalendarModal.styled";



const CalendarModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    start: "",
    end: ""
  });

  const handleChange = (e) => {

    // const response = (e.target.value) 

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!form.title || !form.start || !form.end) {
      alert("모든 값을 입력하세요.");
      return;
    }
    onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <ModalHeader>
            <h3>일정 등록</h3>
            <CloseButton onClick={onClose}>×</CloseButton>
          </ModalHeader>

          <ModalBody>
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

            <Label>이벤트 내용</Label>
            <Input
              name="title"
              placeholder="내용을 입력하세요"
              value={form.title}
              onChange={handleChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} $cancel>
              취소
            </Button>
            <Button onClick={handleSubmit}>등록</Button>
          </ModalFooter>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default CalendarModal;

