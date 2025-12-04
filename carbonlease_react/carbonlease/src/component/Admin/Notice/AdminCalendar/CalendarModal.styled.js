import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

export const ModalWrapper = styled.div`
  width: 420px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  animation: fadeIn 0.25s ease;
`;

export const ModalContent = styled.div`
  padding: 20px 24px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;

  &:hover {
    color: #777;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #4d8bff;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  background: ${(props) => (props.$cancel ? "#b2b2b2" : "#4d8bff")};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
