import { BoardInfo, BoardItemWrapper, BoardNo, Thumbnail } from "./BoardItem.styles";

const BoardItem = ({ item, onClick }) => {
  return (
    <BoardItemWrapper onClick={onClick} style={{ cursor : "pointer"}}>
      <BoardNo>{ item.activityNo }</BoardNo>

      <BoardInfo>
        <div className="title">{ item.activitytitle }</div>
        <div className="content">{ item.activityContent }</div>
        <div className="meta">
          { item.enrollDate } · 조회 { item.viewCount } · 댓글 { item.replyCount } · 닉네임 { item.nickname ?? item.nickName }
        </div>
      </BoardInfo>

      <Thumbnail>
        { item.thumbnail ? (
          <img src={ item.thumbnailPath } alt="thumbnail" />
        ) : (
          <span className="no-image">No Image</span>
        ) }
      </Thumbnail>
    </BoardItemWrapper>
  );
};

export default BoardItem;