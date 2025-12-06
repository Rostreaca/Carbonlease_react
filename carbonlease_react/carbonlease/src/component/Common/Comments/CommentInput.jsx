import { useState } from "react";
import {
  ReplyInputSection,
  ReplyInput,
  ReplyInputButton
} from "./Comment.styled";

const CommentInput = ({ onSubmit, auth, onToast }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!auth?.isAuthenticated) {
      onToast("로그인이 필요합니다.", "warning");
      return;
    }
    if (!text.trim()) {
      onToast("댓글을 입력해주세요.", "warning");
      return;
    }
    onSubmit(text, () => setText(""));
  };

  return (
    <ReplyInputSection>
      <ReplyInput
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <ReplyInputButton onClick={handleSubmit}>등록</ReplyInputButton>
    </ReplyInputSection>
  );
};

export default CommentInput;
