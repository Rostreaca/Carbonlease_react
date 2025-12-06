import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import CommentPagination from "./CommentPagination";
import { CommentSection } from "./Comment.styled";
import { useComment } from "./useComment";

import Toast from "../Toast/Toast";
import useToast from "../Toast/useToast";

const CommentBox = ({
  boardId,
  auth,
  fetchAPI,
  insertAPI,
  updateAPI,
  deleteAPI,
  mapping,
}) => {

  // CommentBox 전용 Toast (페이지 토스트와 완전 별개로 독립 작동)
  const {
    toastMessage,
    showToast,
    toastVariant,
    showToastMessage,
    closeToast,
  } = useToast();

  const {
    comments,
    pageInfo,
    currentPage,
    setCurrentPage,
    loadPage
  } = useComment(fetchAPI, boardId, mapping);

  // 댓글 등록
  const handleInsert = async (text, clear) => {
    try {
      await insertAPI(boardId, text, auth?.accessToken);
      clear();
      loadPage(1);
      showToastMessage("댓글 등록 완료!", "success");
    } catch {
      showToastMessage("댓글 등록 실패", "error");
    }
  };

  // 댓글 수정
  const handleUpdate = async (replyId, text, stop) => {
    try {
      await updateAPI(replyId, text, auth?.accessToken);
      stop();
      loadPage(currentPage);
      showToastMessage("댓글 수정 완료!", "success");
    } catch {
      showToastMessage("댓글 수정 실패", "error");
    }
  };

  // 댓글 삭제
  const handleDelete = async (replyId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteAPI(replyId, auth?.accessToken);
      loadPage(currentPage);
      showToastMessage("댓글 삭제 완료!", "success");
    } catch {
      showToastMessage("댓글 삭제 실패", "error");
    }
  };

  return (
    <>
      <CommentSection>
        <CommentList
          comments={comments}
          auth={auth}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />

        <CommentPagination
          pageInfo={pageInfo}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        <CommentInput
          onSubmit={handleInsert}
          auth={auth}
          onToast={showToastMessage}
        />
      </CommentSection>

      {/* CommentBox 전용 Toast */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={closeToast}
        variant={toastVariant}
      />
    </>
  );
};

export default CommentBox;
