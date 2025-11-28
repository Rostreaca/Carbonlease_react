import { useContext, useState } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { insertReplyAPI } from "../../../../../api/activity/activityAPI";
import { ReplyInputSection, ReplyInput, ReplyInputButton } from "../../ActivityBoardDetail.styles";

const CommentInsert = ({ boardNo, onSuccess }) => {
  const [content, setContent] = useState("");
  const { auth } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!content.trim()) return alert("댓글을 입력하세요!");

    if (!auth.isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await insertReplyAPI(boardNo, content, auth.accessToken);

      setContent("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("댓글 등록 실패", err);
      alert("댓글 등록 실패");
    }
  };

  return (
    <ReplyInputSection>
      <ReplyInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: "80px" }}
      />
      <ReplyInputButton onClick={handleSubmit}>댓글 등록</ReplyInputButton>
    </ReplyInputSection>
  );
};

export default CommentInsert;
