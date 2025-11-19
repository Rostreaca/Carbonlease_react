import styled from "styled-components";

export const FormCard = styled.div`
  width: 760px;
  margin: 0 auto;
  background: #fff;
  padding: 48px 48px 56px;
  border-radius: 18px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.06);
  border: 1px solid #e9e9e9;
  min-height: 65vh;  /* 👈 최소 높이 확보 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: 0 14px 34px rgba(0,0,0,0.10);
  }

  @media (max-width: 820px) {
    width: 100%;
    padding: 32px 22px 40px;
  }

  form label {
    font-weight: 600;
    margin-bottom: 6px;
    display: block;
  }

  input, textarea, select {
    border-radius: 10px !important;
    border: 1px solid #dcdcdc !important;

    &:focus {
      border-color: #00a36f !important;
      box-shadow: 0 0 0 2px rgba(0,163,111,0.15) !important;
    }
  }
`;


// 이미지 미리보기 영역
export const PreviewArea = styled.div`
  width: 100%;
  height: 200px;          /* 원하는 높이 */
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  background: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;       /* 넘친 이미지 숨김 */
  margin-bottom: 14px;
`;

// 이미지
export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;    /* 🔥 핵심: 전체가 보이도록 축소 */
  border-radius: 6px;
`;

// (파일 없을 때 텍스트)
export const EmptyText = styled.p`
  color: #999;
  font-size: 15px;
`;