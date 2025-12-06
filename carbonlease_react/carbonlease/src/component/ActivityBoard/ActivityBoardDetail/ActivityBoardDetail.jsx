import PageTitle from "../../Common/Layout/PageTitle/PageTitle.jsx";
import PageContent from "../../Common/PageContent/PageContent.jsx";
import { Wrapper, ActivityInfo, ButtonSection, BackButton } from "./ActivityBoardDetail.styles.js";
import ImageSection from "./components/ImageSection.jsx";
import InfoSection from "./components/InfoSection.jsx";
import MapSection from "./components/MapSection.jsx";
import ProfilCard from "./components/ProfilCard.jsx";
import ContentSection from "./components/ContentSection.jsx";

import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { deleteActivityBoard } from "../../../api/activity/activityAPI.js";
import { AuthContext } from "../../Context/AuthContext.jsx";
import Toast from "../../Common/Toast/Toast.jsx";

import useToast from "./hooks/useToast.js";
import useLike from "./hooks/useLike.js";
import useDetail from "./hooks/useDetail.js";
import activityStore from "../../../store/activityStore.js";
import ActivityDetailSkeleton from "./components/Skeleton/ActivityDetailSkeleton.jsx";
import NotFound from "../../Common/NotFound/NotFound.jsx";

import { fetchRepliesAPI, 
         insertReplyAPI,
         updateReplyAPI, 
         deleteReplyAPI 
} from "../../../api/activity/activityAPI.js";
import CommentBox from "../../Common/Comments/CommentBox.jsx";

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

  // 댓글
  const activityCommentMap = {
    id: "replyNo",
    writer: "writer",
    content: "replyContent",
    date: "enrollDate"
  };
  

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

          <CommentBox
            boardId={id}
            auth={auth}
            fetchAPI={fetchRepliesAPI}
            insertAPI={insertReplyAPI}
            updateAPI={updateReplyAPI}
            deleteAPI={deleteReplyAPI}
            mapping={activityCommentMap}
          />

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
