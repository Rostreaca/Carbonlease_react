import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 10px;
`;

export const Btn = styled.button`
  padding: 6px 10px;
  border: none;
  background: #f2f2f2;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  &.active {
    background: #007bff;
    color: white;
  }
`;
