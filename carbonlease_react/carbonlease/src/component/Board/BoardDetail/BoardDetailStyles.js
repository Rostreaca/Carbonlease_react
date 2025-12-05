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

  button {
    height: 50px;
    width: 120px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  button[type='submit'] {
    background: #2ecc71;
  }
  button[type='submit']:hover {
    background: #27ae60;
  }

  button[type="button"] {
    background: #e0e0e0;
    color: #333;
  }
  button[type='button']:hover {
    background: #d0d0d0;
  }
`

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
  padding: 10px;
  width: 100%;

  &:focus {
      outline: none;
      border-color: #00a36f !important;
      box-shadow: 0 0 0 2px rgba(0,163,111,0.15) !important;
  }
`

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

/* ====== 좋아요 버튼 ====== */
export const StyledButton = styled.button`
  width: 110px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  

  border-radius: 20px;
  border: ${p => (p.$liked ? "1px solid #eb5252" : "1px solid #86e5ad")};
  cursor: pointer;

  background: ${p => (p.$liked ? "#ff6b6b" : "#fff")};
  transition: 0.2s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);

  img.like-icon {
    width: 100px;
    height: auto;
    opacity: ${p => (p.$liked ? "1" : "0.9")};
    filter: ${p => (p.$liked ? "invert(1)" : "none")};
    transition: 0.2s ease;
  }

  &:hover {
    background: ${p => (p.$liked ? "#ff8787" : "#eafff1")};
    border-color: ${p => (p.$liked ? "#ff8787" : "#86e5ad")};
    transform: translateY(-2px);
  }


  &:active {
    transform: scale(0.97);
  }
`;

const mint = {
  base: "#81f1b0",      // 기본 민트
  hover: "#34d399",     // hover 민트
  text: "#ffffff",      // 텍스트 white
  shadow: "0 2px 6px rgba(0,0,0,0.12)",
  shadowHover: "0 4px 10px rgba(0,0,0,0.18)"
};


// 목록으로, 수정, 삭제
export const BackButton = styled.button`
  background: ${mint.base};
  color: white;
  padding: 10px 22px;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  cursor: pointer;
  box-shadow: ${mint.shadow};
  transition: 0.2s ease;
  margin-top: 15px;

  &:hover {
    background: ${mint.hover};
    box-shadow: ${mint.shadowHover};
    transform: translateY(-1px);
  }
`;


/* 수정/삭제 버튼 */
export const ReplyButton = styled.span`
  font-size: 13px;
  color: #007aff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

/* 검색 바 */
export const SearchBox = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;

  input {
    width: 60%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;

    &:focus {
      outline: none;
      border-color: #00a36f !important;
      box-shadow: 0 0 0 2px rgba(0,163,111,0.15) !important;
    }
  }`;

