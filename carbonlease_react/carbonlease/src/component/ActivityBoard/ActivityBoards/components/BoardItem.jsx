import { BoardInfo, BoardItemWrapper, BoardNo, Thumbnail } from "./BoardItem.styles";

const BoardItem = ({ item }) => {
  return (
    <BoardItemWrapper>
      <BoardNo>{ item.id }</BoardNo>

      <BoardInfo>
        <div className="title">{ item.title }</div>
        <div className="content">{ item.content }</div>
        <div className="meta">
          { item.regDate } · 조회 { item.viewCnt } · 댓글 { item.commentCnt } · 닉네임 { item.nickname }
        </div>
      </BoardInfo>

      <Thumbnail>
        { item.thumbnail ? (
          <img src={ item.thumbnail } alt="thumbnail" />
        ) : (
          <span className="no-image">No Image</span>
        ) }
      </Thumbnail>
    </BoardItemWrapper>
  );
};

export default BoardItem;