import { StyledButton } from "../ActivityBoardDetail.styles";

const LikeButton = ({ isLiked, onClick }) => {
  return (
    <StyledButton $liked={isLiked} onClick={onClick}>
      <img 
        src="/images/Like-icon1.png"
        alt="like-icon"
        className="like-icon"
      />
    </StyledButton>
  );
};


export default LikeButton;
