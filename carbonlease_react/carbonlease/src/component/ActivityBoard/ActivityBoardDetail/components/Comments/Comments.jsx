import { useState } from "react";
import {
  Reply,
  ReplyWriter,
  ReplyContent,
  ReplyFooter,
  ReplyDate,
  ReplyButton,
  ReplyEditInput,
  NoReplyText
} from "../../ActivityBoardDetail.styles";

const Comments = ({
  comments = [],
  onUpdate,
  onDelete,
  auth,
  editReplyId,
  stopEditing
}) => {
  const [editContent, setEditContent] = useState("");

  const startEdit = (reply) => {
    onUpdate(reply.replyNo, undefined); // 수정 모드 진입 신호
    setEditContent(reply.replyContent);
  };

  return (
    <div>
      {comments.length === 0 && <NoReplyText>댓글이 없습니다.</NoReplyText>}

      {comments.map(reply => (
        <Reply key={reply.replyNo}>
          <ReplyWriter>{reply.writer}</ReplyWriter>

          {editReplyId === reply.replyNo ? (
            <>
              <ReplyEditInput
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <ReplyFooter>
                <ReplyButton onClick={() => onUpdate(reply.replyNo, editContent, stopEditing)}>
                  저장
                </ReplyButton>
                <ReplyButton onClick={stopEditing}>취소</ReplyButton>
              </ReplyFooter>
            </>
          ) : (
            <>
              <ReplyContent>{reply.replyContent}</ReplyContent>
              <ReplyFooter>
                <ReplyDate>{reply.enrollDate}</ReplyDate>
                {auth.isAuthenticated && auth.nickName === reply.writer && (
                  <>
                    |
                    <ReplyButton onClick={() => startEdit(reply)}>수정</ReplyButton>
                    |
                    <ReplyButton onClick={() => onDelete(reply.replyNo)}>삭제</ReplyButton>
                  </>
                )}
              </ReplyFooter>
            </>
          )}
        </Reply>
      ))}
    </div>
  );
};

export default Comments;
