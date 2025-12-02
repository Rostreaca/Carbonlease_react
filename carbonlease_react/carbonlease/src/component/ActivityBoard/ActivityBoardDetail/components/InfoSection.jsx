import { InfoBox, InfoItem, InfoRow, Title, TitleRow, WriterIcon } from "../ActivityBoardDetail.styles";
import LikeButton from "./LikeButton";

const InfoSection = ({
  title,
  writer,
  createDate,
  views,
  likeCount,
  isLiked,
  onLike
}) => {
  return (
    <>
      <TitleRow>
        <Title>{title}</Title>

        <LikeButton 
          isLiked={isLiked}
          count={likeCount}
          onClick={onLike}
        />
      </TitleRow>

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
            <span>좋아요</span>
            <span>{likeCount}</span>
          </InfoItem>
        </InfoRow>
      </InfoBox>
    </>
  );
};



export default InfoSection;
