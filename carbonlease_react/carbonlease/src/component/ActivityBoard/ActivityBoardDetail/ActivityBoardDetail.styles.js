import styled from "styled-components";
import BootstrapButton from "react-bootstrap/Button";

export const Wrapper = styled.div`
  width: 760px;
  margin: 0 auto;
  padding-bottom: 60px;
`;

export const Section = styled.div`
  width: 100%;
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #ececec;
  padding-bottom: 24px;
  &:last-of-type {
    border-bottom: none;
  }
`;

export const ImageCard = styled.div`
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0,0,0,0.07);
`;

export const ImgGrid = styled.div`
  width: 100%;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
`;

export const ImgThumb = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  transition: .2s;
  &:hover { transform: scale(1.03); }
`;

export const ImgLarge = styled.img`
   width: 100%;
   max-height: 420px;
   object-fit: cover;
   border-radius: 12px;
   cursor: pointer;
`;

export const ContentCard = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 14px;
  padding: 26px 28px;
  line-height: 1.75;
  font-size: 17px;
  color: #222;
  box-shadow: 0 4px 14px rgba(0,0,0,0.07);
  white-space: pre-line;
`;

export const MapCard = styled.div`
  width: 100%;
  height: 360px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0,0,0,0.07);
`;

export const ButtonArea = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const ReplyWriteArea = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  margin-top: 30px;
`;

export const PostTitle = styled.h2`
  font-size: 26px;
  font-weight: 700;
  text-align: left;
  margin: 0 0 20px 0;
`;

export const ReplyButton = styled(BootstrapButton)`
  white-space: nowrap;
  height: 100px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileCardBox = styled.div`
  background: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  padding: 14px 18px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 310px;
`;

export const ProfileGradeIcon = styled.div`
  font-size: 32px;
`;

export const ProfileNickname = styled.div`
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 4px;
`;

export const ProfileAndLike = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  width: 100%;
  margin: 40px 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const LikeCard = styled.div`
  width: 240px;
  background: ${props => props.$liked ? '#00a34a' : '#ffffff'};
  color: ${props => props.$liked ? '#ffffff' : '#333'};
  border: 1px solid ${props => props.$liked ? '#00a34a' : '#ddd'};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  i {
    font-size: 22px;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(0,0,0,0.12);
    background: ${props => props.$liked ? '#00913f' : '#fafafa'};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Wrap = styled.div`
  width: 110px;  /* 기존 140px → 축소 */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 0;
`;

export const Title = styled.div`
  font-size: 13px; /* 기존 14px */
  font-weight: 600;
  margin-bottom: 4px;
  color: #444;
  text-align: center;
`;

export const ThermoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Tube = styled.div`
  width: 16px; /* 기존 22px 줄임 */
  height: 90px; /* 기존 150px 줄임 */
  background: #e6e6e6;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  border: 2px solid #ccc;
`;

export const Fill = styled.div`
  width: 100%;
  transition: height 0.4s ease;
`;

export const Bulb = styled.div`
  width: 32px;  /* 기존 42px → 축소 */
  height: 32px;
  border-radius: 50%;
  margin-top: -6px;
  border: 2px solid #ccc;
`;

export const Value = styled.div`
  font-size: 12px;
  margin-top: 4px;
  color: #333;
  text-align: center;
  line-height: 1.35;
`;
