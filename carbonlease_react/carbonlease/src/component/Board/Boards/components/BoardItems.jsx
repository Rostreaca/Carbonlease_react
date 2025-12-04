import { useNavigate } from 'react-router-dom';
import { BoardInfo, BoardItemWrapper, BoardNo } from "./BoardItem.styles";

const BoardItems = ({ item }) => {
  const navigate = useNavigate();
  const onClickBoardDetail = (item) =>{
    console.log("클릭한 값:", item);
    console.log("key vale : ", item.boardNo);
    navigate(`/boards/${item.boardNo}`);
  }

  return (
    <BoardItemWrapper>

      <BoardNo>{ item.boardSeq } </BoardNo>

      <BoardInfo key={item.replyNo}>
        <div className="title" onClick={() => onClickBoardDetail(item)}>{ item.boardTitle}</div>
        <div className="content" onClick={() => onClickBoardDetail(item)} >{ item.boardContent }</div>
        <div className="meta" onClick={() => onClickBoardDetail(item)}>
        작성일 : { item.enrollDate } · 조회 : { item.viewCount } · 댓글 : { item.replyCount } · 닉네임 : { item.nickname }
        </div>

      </BoardInfo>
    </BoardItemWrapper>
  );
};

export default BoardItems;