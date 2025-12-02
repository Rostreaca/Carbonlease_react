import PageTitle from "../../Common/Layout/PageTitle/PageTitle.jsx";
import PageContent from "../../Common/PageContent/PageContent.jsx";
import { Wrapper, ActivityInfo, ButtonSection, CommentSection, BackButton } from "./ActivityBoardDetail.styles.js";
import CommentInsert from "./components/Comments/CommentInsert.jsx";
import Comments from "./components/Comments/Comments.jsx";
import ImageSection from "./components/ImageSection.jsx";
import InfoSection from "./components/InfoSection.jsx";
import MapSection from "./components/MapSection.jsx";
import ProfilCard from "./components/ProfilCard.jsx";
import ContentSection from "./components/ContentSection.jsx";
import CommentsPagination from "./components/Comments/CommentsPagination.jsx";

import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { deleteActivityBoard } from "../../../api/activity/activityAPI.js";
import { AuthContext } from "../../Context/AuthContext.jsx";
import Toast from "../../Common/Toast/Toast.jsx";

import useReplies from "./hooks/useReplies.js";
import useToast from "./hooks/useToast.js";
import useLike from "./hooks/useLike.js";
import useDetail from "./hooks/useDetail.js";
import activityStore from "../../../store/activityStore.js";
import ActivityDetailSkeleton from "./components/Skeleton/ActivityDetailSkeleton.jsx";
import NotFound from "../../Common/NotFound/NotFound.jsx";

const ActivityBoardDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  // 토스트 훅
  const {
    toastMessage,
    showToast,
    toastVariant,
    showToastMessage,
    closeToast,
  } = useToast();

  useEffect(() => {
    if (auth.memberId) {
      activityStore.init(auth.memberId);
    }
  }, [auth.memberId]);
  const { post, loading } = useDetail(id, auth.memberId);

  const {
    isLiked,
    likeCount,
    handleToggleLike,
  } = useLike(
    post?.isLiked ?? false,
    post?.likeCount ?? 0,
    id,
    showToastMessage
  );

  // 댓글 훅
  const {
    replies,
    pageInfo,
    currentPage,
    setCurrentPage,
    editReplyId,
    setEditReplyId,
    fetchReplies,
    updateReply,
    deleteReply
  } = useReplies(id, auth.accessToken);
  

  if (loading) return <ActivityDetailSkeleton />;
  if (!post) {
  return (
    <NotFound
      title="페이지를 찾을 수 없습니다"
      description="요청하신 페이지가 삭제되었거나 주소가 잘못되었습니다."
      backPath="/activityBoards"
      backText="목록으로 돌아가기"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "인증게시판", path: "/activityBoards" },
        { label: "조회 실패", current: true },
      ]}
    />
  );
}
  
  const handleUpdate = () => navigate(`/activityBoards/update/${id}`);

  const handleDelete = async () => {
    if (!auth.isAuthenticated) {
      showToastMessage("로그인이 필요합니다.", "warning");
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteActivityBoard(id);
      showToastMessage("삭제되었습니다.", "success");
      navigate("/activityBoards");
    } catch (err) {
      console.error("삭제 실패", err);
      showToastMessage("삭제 중 오류 발생", "error");
    }
  };

  return (
    <>
      <PageTitle
        title="인증 상세보기"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "인증게시판", path: "/activityBoards" },
          { label: "상세보기", current: true },
        ]}
      />

      <PageContent>
        <Wrapper>

          <ActivityInfo>
            <InfoSection
              title={post.activityTitle}
              writer={post.nickName}
              createDate={post.enrollDate}
              views={post.viewCount}
              likeCount={likeCount}
              isLiked={auth.isAuthenticated ? isLiked : false}
              onLike={() => handleToggleLike(auth.accessToken)}
            />
          </ActivityInfo>

          <ImageSection images={post.images} />
          <ContentSection content={post.activityContent} />
          <MapSection lat={post.lat} lng={post.lng} />

          <ProfilCard
            nickName={post.nickName}
            count={post.certificationCount}
            carbon={post.carbonSave}
          />

          <hr />

          {auth.isAuthenticated && auth.nickName === post.nickName && (
            <ButtonSection>
              <button className="update-btn" onClick={handleUpdate}>수정</button>
              <button className="delete-btn" onClick={handleDelete}>삭제</button>
            </ButtonSection>
          )}

          <CommentSection>
            <Comments
              comments={replies}
              onUpdate={(replyNo, content, stopEdit) =>
                updateReply(
                  replyNo,
                  content,
                  stopEdit,
                  () => showToastMessage("댓글 수정 완료", "success"),
                  () => showToastMessage("댓글 수정 실패", "error")
                )
              }
              onDelete={(replyNo) =>
                deleteReply(
                  replyNo,
                  () => showToastMessage("댓글 삭제 완료", "success"),
                  () => showToastMessage("댓글 삭제 실패", "error")
                )
              }
              auth={auth}
              editReplyId={editReplyId}
              stopEditing={() => setEditReplyId(null)}
            />

            <CommentsPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageInfo={pageInfo}
            />

            <CommentInsert
              boardNo={id}
              onSuccess={() => {
                fetchReplies();
                showToastMessage("댓글 등록 완료", "success");
              }}
            />
          </CommentSection>

          <BackButton onClick={() => navigate("/activityBoards")}>
            목록으로
          </BackButton>

        </Wrapper>
      </PageContent>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={closeToast}
        variant={toastVariant}
      />
    </>
  );
};

export default ActivityBoardDetail;
