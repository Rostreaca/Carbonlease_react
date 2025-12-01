import { StyledButton } from "../ActivityBoardDetail.styles";

const LikeButton = ({ isLiked, count, onClick }) => {
  return (
    <StyledButton $liked={isLiked} onClick={onClick}>
      {isLiked ? "❤️ 공감 취소" : "🤍 공감하기"}
      <span>({count})</span>
    </StyledButton>
  )
}

export default LikeButton;