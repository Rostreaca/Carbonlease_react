import { EmptyImage } from "../../../Common/NotFound/NotFound.styles";
import { EmptyMessage, EmptySub, EmptyWrapper } from "../ActivityBoards.styles";

const EmptyState = ({ message = "게시글이 없습니다." }) => {
  return (
    <EmptyWrapper>
      <EmptyImage src="/images/empty.png" alt="empty-boards" />
      <EmptyMessage>{message}</EmptyMessage>
      <EmptySub>새로운 게시글을 작성해보세요!</EmptySub>
    </EmptyWrapper>
  );
};

export default EmptyState;