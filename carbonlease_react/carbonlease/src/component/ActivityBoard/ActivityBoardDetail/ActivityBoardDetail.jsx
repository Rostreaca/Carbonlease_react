import PageTitle from "../../Common/Layout/PageTitle/PageTitle.jsx";
import PageContent from "../../Common/PageContent/PageContent.jsx";
import { Wrapper, ActivityInfo, ProfilAndLike, ButtonSection,CommentSection, LikeButton, BackButton } from "./ActivityBoardDetail.styles.js";
import CommentInsert from "./components/Comments/CommentInsert.jsx";
import Comments from "./components/Comments/Comments.jsx";
import ImageSection from "./components/ImageSection.jsx";
import InfoSection from "./components/InfoSection.jsx";
import MapSection from "./components/MapSection.jsx";
import ProfilCard from "./components/ProfilCard.jsx";
import ContentSection from "./components/ContentSection.jsx";
import CommentsPagination from "./components/Comments/CommentsPagination.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { deleteActivityBoard } from "../../../api/activity/activityAPI.js";
import { AuthContext } from "../../Context/AuthContext.jsx";
import Toast from "../../Common/Toast/Toast.jsx";
import useReplies from "./hooks/useReplies.js";
import useToast from "./hooks/useToast.js";
import useLike from "./hooks/useLike.js";
import useDetail from "./hooks/useDetail.js";


const ActivityBoardDetail = ({}) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  
  // 댓글 hook
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
  
  // 토스트 hook
  const {
    toastMessage,
    showToast,
    toastVariant,
    showToastMessage,
    closeToast
  } = useToast();
  
  // 좋아요 hook
  const {
    isLiked,
    likeCount,
    handleToggleLike,
    setIsLiked,
    setLikeCount
  } = useLike(null, 0, id, showToastMessage);
  
  const { post, loading } = useDetail(
    id,
    auth.accessToken,
    setIsLiked,
    setLikeCount
  );

  if (loading) return <div>로딩중...</div>
  if (!post) return <div>게시글을 찾을수 없습니다.</div>

  const handleUpdate = () => {
    navigate(`/activityBoards/update/${id}`);
  };

  const handleDelete = async () => {
    if (!auth.isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteActivityBoard(id);
      alert("삭제되었습니다.");
      navigate("/activityBoards");
    } catch(err) {
      console.error("삭제 실패", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <PageTitle 
        title="인증 상세보기"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "인증게시판", path: "/ActivityBoards" },
          { label: "상세보기", current: true },
        ]}
      />

      <PageContent>
        <Wrapper>
          {/* 제목 + 등록정보 + 게시판 정보 */}
          <ActivityInfo>
            <InfoSection 
              title={post.activityTitle}
              writer={post.nickName}
              createDate={post.enrollDate}
              views={post.viewCount}
              likes={likeCount}
            />
          </ActivityInfo>
          
          {/* 이미지 */}
          <ImageSection images={post.images} />
          
          {/* 게시글 내용 */}
          
          <ContentSection content={post.activityContent} />
          
          {/* 지도 영역 */}
          <MapSection lat={post.lat} lng={post.lng}/>
          
          {/* 프로필 카드 + 좋아요 버튼 */}
          <ProfilAndLike>
            <ProfilCard 
              nickName={post.nickName}
              count={post.certificationCount}
              carbon={post.carbonSave}
            />

            <LikeButton
              $liked={isLiked}
              onClick={() => handleToggleLike(auth.accessToken)}
              className="detail-like-btn"
            >
              <i className={isLiked ? "bi bi-heart-fill" : "bi bi-heart"}></i>
              좋아요
            </LikeButton>
          </ProfilAndLike>
          <hr />

          {/* 수정/삭제 버튼 */}
          {auth.isAuthenticated && auth.nickName === post.nickName && (
            <ButtonSection>
              <button className="update-btn" onClick={handleUpdate}>수정</button>
              <button className="delete-btn" onClick={handleDelete}>삭제</button>
            </ButtonSection>
          )}

          {/* 댓글 영역 */}
          <CommentSection>
              <Comments
                comments={replies}
                onUpdate={(replyNo, content, stopEditing) =>
                  updateReply(
                    replyNo,
                    content,
                    stopEditing,
                    () => showToastMessage("댓글이 수정되었습니다!", "success"),
                    () => showToastMessage("댓글 수정 실패", "error")
                  )
                }
                onDelete={(replyNo) =>
                  deleteReply(
                    replyNo,
                    () => showToastMessage("댓글이 삭제되었습니다!", "success"),
                    () => showToastMessage("댓글 삭제 실패", "error")
                  )
                }
                auth={auth}
                editReplyId={editReplyId}
                stopEditing={() => setEditReplyId(null)}
              />
                {/* 댓글 페이징 */}
                <CommentsPagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageInfo={pageInfo}
                />

                <CommentInsert 
                  boardNo={id}
                  onSuccess={() => {
                    fetchReplies();
                    showToastMessage("댓글이 등록되었습니다!", "success");
                  }}
                />
          </CommentSection>

          <BackButton onClick={() => navigate("/activityBoards")}>목록으로</BackButton>
        
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
