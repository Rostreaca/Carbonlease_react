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
  margin: 24px auto;
  padding: 28px;

  background: #ffffff;
  border-radius: 24px;

  border: 1.5px solid #e3e3e8;
  box-shadow: 0 6px 14px rgba(0,0,0,0.04);

  font-size: 17px;
  line-height: 1.8;
  color: #1c1c1e;
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

/* ====== 프로필 + 좋아요 ====== */
export const ProfilAndLike = styled.div`
  max-width: 830px;
  margin: 30px auto;
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 60px;                   
`;

/* 프로필 카드 */
export const ProfilCardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 18px;
  margin-right: 100px;

  padding: 20px 26px;
  background: #b2f2bb;
  border-radius: 40px;
  
  border: 2px solid #b2f2bb;
  box-shadow: 0 4px 14px rgba(0,0,0,0.04);

  height: 100px;
  min-width: 280px;
`;

/* 텍스트 */
export const ProfilText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  strong {
    font-size: 17px;
    font-weight: 600;
    color: #1c1c1e;   
  }

  div {
    font-size: 14px;
    color: #6e6e73;  
  }
`;

/* 게이지 컨테이너 */
export const GaugeWrapper = styled.div`
  position: relative; 
  width: 40px;
  height: 90px;
  background: #f5f5f7;
  border-radius: 15px;
  border: 1px solid #e0e0e5;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

/* 채워지는 액체 */
export const GaugeFill = styled.div`
  width: 100%;
  background: linear-gradient(
    180deg,
    #ffa500 0%,
    #ff7b00 100%
  );
  transition: height 0.3s ease;
`;

/* 4등분 라인 */
export const GaugeLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4px 0;

  div {
    width: 100%;
    height: 1px;
    background: rgba(0,0,0,0.15);
  }
`;

/* % 텍스트 */
export const GaugePercentText = styled.div`
  position: absolute;
  bottom: 50%; 
  left: 50%;
  transform: translate(-50%, 50%);

  font-size: 12px;
  font-weight: 600;
  color: #333;
  text-shadow: 0 0 2px white;
`;

/* ====== 좋아요 버튼 ====== */
export const LikeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 10px;
  height: 100px;
  min-width: 220px;

  padding: 16px 38px;
  font-size: 28px;

  background: ${p => p.$liked ? '#ff3b30' : '#b2f2bb'};
  color: #fff;
  border: 2px solid ${p => p.$liked ? '#ff3b30' : '#b2f2bb'};

  border-radius: 40px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);

  transition: all 0.2s ease;

  i {
    font-size: 30px;
  }

  &:hover {
    background: ${p => p.$liked ? '#ff3b30' : '#b2f2bb'};
  }
`;


/* ====== 수정/삭제 버튼 ====== */
export const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin: 25px 0;

  .update-btn {
    background: #27ae60;
    color: #fff;
    padding: 10px 22px;
    border-radius: 8px;
    border: none;
    font-size: 15px;
    cursor: pointer;
  }

  .delete-btn {
    background: #e74c3c;
    color: #fff;
    padding: 10px 22px;
    border-radius: 8px;
    border: none;
    font-size: 15px;
    cursor: pointer;
  }
`;

/* ====== 댓글 ====== */
export const CommentSection = styled.div`
  margin-top: 40px;
  padding-top: 16px;
  border-top: 1px solid #eee;

  display: flex;
  flex-direction: column;
`;

export const ReplyListBox = styled.div`
  width: 100%;
`;

export const ReplyInputSection = styled.div`
  display: flex;
`

export const ReplyInput = styled.textarea`
  flex: 0.85;
  width: 100%;
  height: 100px;
  min-height: 100px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;

  &:focus {
    outline: none;
    border: 1px solid #3cb371;
    box-shadow: 0 0 0 2px rgba(60,179,113,0.2);
  }
`
export const ReplyInputButton = styled.button`
  flex: 0.15;
  padding: 10px 0;
  background: #4caf50;
  color: #fff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
`

export const Reply = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #eee;
  font-size: 15px;
`;

/* 닉네임 */
export const ReplyWriter = styled.div`
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 15px;
  color: #111;
`;

/* 댓글 본문 */
export const ReplyContent = styled.div`
  margin: 4px 0 8px 0;
  line-height: 1.6;
  color: #333;
  white-space: pre-line;
`;

/* 날짜 + 수정 삭제 줄 */
export const ReplyFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
  font-size: 14px;
  color: #777;
`;

/* 날짜 */
export const ReplyDate = styled.span`
  color: #aaa;
  font-size: 13px;
  margin-right: 14px;
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
  background: #27ae60;
  margin-top: 15px;
  color: #fff;
  padding: 10px 22px;
  border-radius: 8px;
  border: none;
  font-size: 15px;
  cursor: pointer;
`




