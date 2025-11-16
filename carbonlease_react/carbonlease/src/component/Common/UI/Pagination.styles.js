import styled from "styled-components";

export const PagingWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 20px 0;
`;

export const PageBtn = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  font-size: 14px;

  &.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }
`;