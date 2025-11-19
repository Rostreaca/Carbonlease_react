import { BoardInfo, BoardItemWrapper, BoardNo } from "../../../ActivityBoard/ActivityBoards/components/BoardItem.styles";

const BoardItems = ({ item }) => {
  return (
    <BoardItemWrapper>

      <BoardNo>No.{ item.boardSeq } </BoardNo>

      <BoardInfo>
        <div className="title">{ item.boardTitle}</div>
        <div className="content">{ item.boardContent }</div>
        <div className="meta">
        작성일 : { item.enrollDate } · 조회 : { item.viewCount } · 댓글 : { item.replyCount } · 닉네임 : { item.nickname }
        </div>
      </BoardInfo>
    </BoardItemWrapper>
  );
};

export default BoardItems;