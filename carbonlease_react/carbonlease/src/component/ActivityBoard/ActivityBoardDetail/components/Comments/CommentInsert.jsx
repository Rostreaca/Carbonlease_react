import { useContext, useState } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { insertReplyAPI } from "../../../../../api/activity/activityAPI";
import { ReplyInputSection, ReplyInput, ReplyInputButton } from "../../ActivityBoardDetail.styles";
import useToast from "../../hooks/useToast";

const CommentInsert = ({ boardNo, onSuccess }) => {
  const [content, setContent] = useState("");
  const { auth } = useContext(AuthContext);
  const { showToastMessage } = useToast();

  const handleSubmit = async () => {

    if(!auth.isAuthenticated) {
      showToastMessage("로그인이 필요한 서비스입니다!", "error");
      return;
    }

    if (!content.trim()) {
      showToastMessage("댓글을 입력해주세요!", "warning");
      return;
    }

    try {
      await insertReplyAPI(boardNo, content, auth.accessToken);

      setContent("");
      if (onSuccess) onSuccess();

      showToastMessage("댓글 등록 완료!", "success");

    } catch (err) {
      console.error("댓글 등록 실패", err);
      showToastMessage("댓글 등록 실패", "error");
    }
  };

  return (
    <ReplyInputSection>
      <ReplyInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <ReplyInputButton onClick={handleSubmit}>댓글 등록</ReplyInputButton>
    </ReplyInputSection>
  );
};

export default CommentInsert;
