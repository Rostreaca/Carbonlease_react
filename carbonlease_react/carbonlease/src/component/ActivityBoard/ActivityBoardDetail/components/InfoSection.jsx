import { InfoBox, InfoItem, InfoRow, Title, WriterIcon } from "../ActivityBoardDetail.styles";

const InfoSection = ({ title, writer, createDate, views, likes }) => {
  return (
    <>
      {/* 제목 */}
      <Title>{title}</Title>

      <hr />

      <InfoBox>
        <InfoRow>
          <InfoItem>
            <WriterIcon>🖋️</WriterIcon>
            <span><strong>작성자</strong> {writer}</span>
            <span>·</span>
            <span><strong>작성일</strong> {createDate}</span>
          </InfoItem>

          <InfoItem>
            <span>조회</span>
            <span>{views}</span>
            <span>·</span>
            <span> 좋아요</span>
            <span>{likes}</span>
          </InfoItem>
        </InfoRow>
      </InfoBox>
    </>
  );
};

export default InfoSection;
