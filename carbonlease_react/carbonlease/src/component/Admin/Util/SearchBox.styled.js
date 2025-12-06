import styled from "styled-components";

export const FilterSearchRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;   /* 왼쪽은 필터, 오른쪽은 검색 */
  align-items: center;
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const FilterButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.2s, color 0.2s, border 0.2s;

  /* 브라우저 기본 클릭/포커스 스타일 제거 */
  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:active {
    background: inherit;   /* 기본 회색 눌림 배경 제거 */
    box-shadow: none;
  }

  /* 전체 버튼 (중립색) */
  ${p => p.$type === "ALL" && `
    background: ${p.$active ? "#dee2e6" : "#ffffff"};
    color: ${p.$active ? "#212529" : "#495057"};
    border: 1px solid ${p.$active ? "#adb5bd" : "#ced4da"};

    &:hover {
      background: ${p.$active ? "#d6d8db" : "#f1f3f5"};
    }
  `}

  /* 정상(Y) */
  ${p => p.$type === "Y" && `
    background: ${p.$active ? "#d4edda" : "#ffffff"};
    color: ${p.$active ? "#155724" : "#495057"};
    border: 1px solid ${p.$active ? "#c3e6cb" : "#ced4da"};

    &:hover {
      background: ${p.$active ? "#c3e6cb" : "#f1f3f5"};
    }
  `}

  /* 숨김(N) */
  ${p => p.$type === "N" && `
    background: ${p.$active ? "#f8d7da" : "#ffffff"};
    color: ${p.$active ? "#721c24" : "#495057"};
    border: 1px solid ${p.$active ? "#f5c6cb" : "#ced4da"};

    &:hover {
      background: ${p.$active ? "#f5c6cb" : "#f1f3f5"};
    }
  `}
`;

export const SearchGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 10px;
`;

export const SearchInput = styled.input`
  width: 220px;
  padding: 8px 10px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2ca88f;
  }

`;

export const SearchButton = styled.button`
  width: 80px;
  padding: 8px 16px;
  background: #c3e6cb;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  border: #2f2f2f;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
