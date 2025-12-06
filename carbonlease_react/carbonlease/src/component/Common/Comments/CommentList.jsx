import CommentItem from "./CommentItem";
import { NoReplyText } from "./Comment.styled";

const CommentList = ({ comments, auth, onUpdate, onDelete }) => {
  if (!comments.length) return <NoReplyText>댓글이 없습니다.</NoReplyText>;

  return (
    <>
      {comments.map(reply => (
        <CommentItem
          key={reply.id}
          reply={reply}
          auth={auth}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default CommentList;
