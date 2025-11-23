import { BoardNo, BoardsRow, Content, ETC, ListWrapper, TextInfo, Thumbnail, Title } from "../ActivityBoards.styles";

const BoardsList = ({ boards, onClickItem }) => {

  return (
      <ListWrapper>
          {boards.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center"}}>게시글이 없습니다.</div>
          ) : (
            boards.map((item) => (

              <BoardsRow key={item.activityNo} onClick={() => onClickItem(item.activityNo)}>
                  <BoardNo>{item.activityNo}</BoardNo>
              
              <TextInfo>
                  <Title>{item.activityTitle}</Title>
                  <Content>{item.activityContent}</Content>
                  <ETC>
                    작성일 {item.enrollDate} • 조회수 {item.viewCount} • 댓글 {item.replyCount} • 닉네임 {item.nickName}
                  </ETC>
              </TextInfo>
                  
                  <Thumbnail>
                    {item.thumbnailPath ? (
                      <img src={`http://localhost:80${item.thumbnailPath}`} alt="thumbnail" />
                    ) : (
                      <img src="/images/No_Image.png" alt="no image" />
                    )}
                  </Thumbnail>
              </BoardsRow>
            ))
          )}
      </ListWrapper>
  );
};

export default BoardsList;