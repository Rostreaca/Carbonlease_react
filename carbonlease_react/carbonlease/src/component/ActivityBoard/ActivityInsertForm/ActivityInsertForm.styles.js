import styled from "styled-components";

export const FormArea = styled.div`
  min-height: 65vh;
  width: 800px;
  margin: 0 auto;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.06);
  font-family: 'NanumSquare', sans-serif;
`


export const ActivityForm = styled.form`
  padding: 48px 48px 45px;
  display: flex;
  flex-direction: column;
  font-family: 'NanumSquare', sans-serif;
  gap: 16px;

  label {
    font-size: 20px;
  }

  input {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #dcdcdc;

    &:focus {
      outline: none;
      border-color: #00a36f !important;
      box-shadow: 0 0 0 2px rgba(0,163,111,0.15) !important;
    }
  }

  textarea {
    height: 250px;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #dcdcdc;

    &:focus {
      outline: none;
      border-color: #00a36f !important;
      box-shadow: 0 0 0 2px rgba(0,163,111,0.15) !important;
    }
  }
`;

export const SelectRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`

export const CategorySelectWrapper = styled.div`
  padding: 10px;
  flex: 1;
`

export const CategorySelectButton = styled.select`
  border-radius: 10px !important;
  border: 1px solid #dcdcdc !important;
  padding: 10px 35px 10px 15px;
  appearance: none;
  background: url("data:image/svg+xml;utf8,<svg fill='black' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>") no-repeat right 12px center;
  width: 100%;

  &:focus {
      outline: none;
      border-color: #00a36f !important;
      box-shadow: 0 0 0 2px rgba(0,163,111,0.15) !important;
  }
`

export const ButtonSection = styled.div`
  display: flex;
  gap: 8px;
  align-self: flex-end;
`
export const InputButton = styled.button`
  height: 50px;
  width: 120px;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  background: #00A34A;
  color: #fff;
  font-size: 22px;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
  transition: 0.2s ease;

  &:hover {
    background: #00833bff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.18);
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0,163,111,0.25);
  }
`;

export const CancelButton = styled.button`
  height: 50px;
  width: 120px;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  background: #e5e7eb;
  color: #444;
  font-size: 22px;
  font-weight: 500;
  transition: 0.2s ease;

  &:hover {
    background: #d1d5db;
    transform: translateY(-1px);
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const SearchInput = styled.input`
`;

export const SearchButton = styled.button`
  height: 45px;
  width: 100px;
  padding: 0 20px;
  border-radius: 10px;
  border: none;

  background: #00A34A;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;

  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
  transition: 0.2s ease;

  &:hover {
    background: #00833bff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.18);
    transform: translateY(-1px);
  }
`;



export const SelectLabel = styled.label`
  font-weight: bold;
  width: 100%;
`

// 이미지 미리보기 영역
export const PreviewArea = styled.div`
  width: 100%;
  height: 200px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  background: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 14px;
`;

// 이미지
export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 6px;
`;

// (파일 없을 때 텍스트)
export const EmptyText = styled.p`
  color: #999;
  font-size: 15px;
`;