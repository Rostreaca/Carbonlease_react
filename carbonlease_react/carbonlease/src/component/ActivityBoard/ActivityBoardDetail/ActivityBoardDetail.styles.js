import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 60px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 20px 0 15px 0;
  color: #222;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 10px 0;
`;


export const ActivityInfo = styled.div`
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 25px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  color: #666;
  font-size: 15px;
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 6px;

  span:first-child {
    font-weight: 600;
  }
`;

export const InfoBox = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;


export const WriterIcon = styled.span`
  margin-right: 5px;
  color: #ff9900;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  margin: 25px 0;
  display: flex;
  justify-content: center;
`;

export const ImageBox = styled.div`
  width: 100%;
  max-width: 830px;
  height: 500px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ContentBox = styled.div`
  width: 100%;
  max-width: 830px;
  min-height: 200px;
  margin: 20px auto;
  padding: 32px 34px;

  background: #ffffff;
  border-radius: 16px;

  border: 1px solid #e8f5e9; 
  box-shadow: 0 2px 6px rgba(0,0,0,0.03);

  font-size: 16px;
  line-height: 2;
  color: #2b2b2b;

  white-space: pre-line;
`;

export const MapArea = styled.div`
  width: 100%;
  max-width: 830px;
  margin: 20px auto;
  height: 360px;
  border-radius: 12px;
  borderRadius: 10px;
  box-shadow: 0 0 1.2px; 
`


/* 프로필 카드 */
export const ProfilCardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 18px;
  margin: 20px auto;
  width: 95%;
  max-width: 900px;

  padding: 20px 26px;
  background: #fff;
  border-radius: 20px;
  
  border: 1px solid #00A34A;
  box-shadow: 0 4px 14px rgba(0,0,0,0.04);

  height: 100px;
`;

/* 텍스트 */
export const ProfilText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0 18px;

  strong {
    font-size: 16px;
    font-weight: 600;
    color: #1c1c1e;   
  }

  div {
    font-size: 14px;
    color: #6e6e73;  
  }
`;

  /* 가로 게이지 박스 */
  export const GaugeBox = styled.div`
    margin-right: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    width: auto;
  `;

  /* 전체 트랙 */
  export const GaugeTrack = styled.div`
    width: 230px;
    height: 30px;
    background: #e9ecef;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid #d1e7dd;
  `;

  /* 채워지는 바 */
  export const GaugeBar = styled.div`
    height: 100%;
    background: #00A34A;
    transition: width 0.3s ease;
    border-radius: 18px;
  `;

  /* % 텍스트 */
  export const GaugeText = styled.div`
    font-size: 18px;
    font-weight: 600;
    color: #2f2f2f;
  `;


export const SeparatorLine = styled.div`
  width: 1px;
  height: 60px;
  background: #00A34A;
  margin: 0 18px;
  opacity: 0.8;
`;


/* ====== 좋아요 버튼 ====== */
export const StyledButton = styled.button`
  width: 120px;
  height: 54px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 4px;

  border-radius: 25px;
  border: ${p => (p.$liked ? "1px solid #ff6b6b" : "1px solid #86e5ad")};
  cursor: pointer;

  background: ${p => (p.$liked ? "#ff6b6b" : "#fff")};
  transition: 0.2s ease;

  img.like-icon {
    width: 100px;
    height: auto;
    opacity: ${p => (p.$liked ? "1" : "0.9")};
    filter: ${p => (p.$liked ? "invert(1)" : "none")};
    transition: 0.2s ease;
  }

  &:hover {
    background: ${p => (p.$liked ? "#ff6b6b" : "#eafff1")};
    border-color: ${p => (p.$liked ? "#ff6b6b" : "#86e5ad")};
    transform: translateY(-2px);
  }


  &:active {
    transform: scale(0.97);
  }
`;

const mint = {
  base: "#00A34A",
  hover: "#00833bff",
  text: "#ffffff",
  shadow: "0 2px 6px rgba(0,0,0,0.12)",
  shadowHover: "0 4px 10px rgba(0,0,0,0.18)"
};


/* ====== 수정/삭제 버튼 ====== */
export const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin: 25px 0;

  .update-btn {
    background: ${mint.base};
    color: ${mint.text};
    padding: 10px 22px;
    border-radius: 10px;
    border: none;
    font-size: 15px;
    cursor: pointer;
    box-shadow: ${mint.shadow};
    transition: 0.2s ease;
  }

  .update-btn:hover {
    background: ${mint.hover};
    box-shadow: ${mint.shadowHover};
    transform: translateY(-1px);
  }

  .delete-btn {
    background: #fd3333ff;
    color: #fff;
    padding: 10px 22px;
    border-radius: 10px;
    border: none;
    font-size: 15px;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0,0,0,0.12);
    transition: 0.2s ease;
  }

  .delete-btn:hover {
    background: #d63232ff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.18);
    transform: translateY(-1px);
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalBox = styled.div`
  width: 360px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
`;

export const BackButton = styled.button`
  background: ${mint.base};
  color: white;
  padding: 10px 22px;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s ease;
  margin-top: 15px;

  &:hover {
    background: ${mint.hover};
    transform: translateY(-1px);
  }
`;




