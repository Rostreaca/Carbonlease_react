import PageTitle from "../../Common/Layout/PageTitle/PageTitle.jsx";
import PageContent from "../../Common/PageContent/PageContent.jsx";
import { Wrapper, ActivityInfo, ProfilAndLike, ButtonSection,CommentSection, LikeButton, BackButton } from "./ActivityBoardDetail.styles.js";
import CommentInsert from "./components/CommentInsert.jsx";
import Comments from "./components/Comments.jsx";
import ImageSection from "./components/ImageSection.jsx";
import InfoSection from "./components/InfoSection.jsx";
import MapSection from "./components/MapSection.jsx";
import ProfilCard from "./components/ProfilCard.jsx";
import ContentSection from "./components/ContentSection.jsx";
import CommentsPagination from "./components/CommentsPagination.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { 
  fetchActivityDetail,
  toggleLike,
  deleteActivityBoard,
  fetchRepliesAPI,
  updateReplyAPI,
  deleteReplyAPI,
  increaseViewCountAPI
} from "../../../api/activity/activityAPI.js";
import { AuthContext } from "../../Context/AuthContext.jsx";
import Toast from "../../Common/Toast/Toast.jsx";
import activityStore from "../../../store/activityStore.js";


const ActivityBoardDetail = ({}) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState('success');

  const [replies, setReplies] = useState([]);
  const [editReplyId, setEditReplyId] = useState(null);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [replyPageInfo, setReplyPageInfo] = useState({
      startPage: 1,
      endPage: 1,
      totalPage: 1
  });

  // 토스트 메시지 표시
    const handleShowToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

    // 토스트 메시지 닫기
    const handleCloseToast = () => {
        setShowToast(false);
    };

  useEffect(() => {
    loadDetail();
    increaseViewCountAPI(id);
    fetchReplies();
  }, [currentPage]);

  const loadDetail = async () => {
    try {
      const res = await fetchActivityDetail(id, auth.accessToken);
      const data = res.data;

      const localLike = activityStore.getLike(id);

      setPost({
        ...data,
        isLiked: localLike ?? data.isLiked
      });

    } catch (err) {
      console.error("Detail조회 실패", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReplies = async () => {
    try {
      const res = await fetchRepliesAPI(id, currentPage);

      setReplies(res.data.replies || []);

      setReplyPageInfo({
        startPage: res.data.pageInfo.startPage,
        endPage: res.data.pageInfo.endPage,
        totalPage: res.data.pageInfo.maxPage
      });

    } catch (err) {
      console.error("댓글 조회 실패", err);
    }
  };


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


  const handleLikeToggle = async (e) => {
    e.stopPropagation();

    if (!auth.isAuthenticated) {
      handleShowToast("로그인 후 이용 가능합니다.", "error");
      return;
    }

    try {
      await toggleLike(post.activityNo);

      const newLikeStatus = !post.isLiked;

      activityStore.setLike(post.activityNo, newLikeStatus);

      setPost(prev => ({
        ...prev,
        isLiked: newLikeStatus,
        likeCount: newLikeStatus ? prev.likeCount + 1 : prev.likeCount - 1
      }));

      handleShowToast(
        newLikeStatus ? "이 활동에 공감해주셨어요!" : "공감을 취소했어요."
      );

    } catch (error) {
      handleShowToast("좋아요 처리에 실패했습니다.", "error");
      console.error(error);
    }
  };

  const stopEditing = () => setEditReplyId(null);

  // 댓글 수정
  const handleUpdateReply = async (reply, content, stopEditing) => {
    if (content === undefined) {
      setEditReplyId(reply.replyNo);
      return;
    }

    try {
      await updateReplyAPI(reply.replyNo, content, auth.accessToken);
      stopEditing();
      fetchReplies();

      handleShowToast("댓글이 수정되었습니다!", "success");

    } catch (err) {
      console.error("댓글 수정 실패", err);
      alert("댓글 수정 실패");
    }
  };


  // 댓글 삭제
  const handleDeleteReply = async (replyNo) => {
    if (!auth.isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteReplyAPI(replyNo, auth.accessToken);
      fetchReplies();
      handleShowToast("댓글이 삭제되었습니다!", "success");
    } catch (err) {
      console.error("댓글 삭제 실패", err);
      alert("삭제 실패");
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
              likes={post.likeCount}
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
              $liked={post.isLiked}
              onClick={handleLikeToggle}
              className="detail-like-btn"
            >
              <i className={post.isLiked ? "bi bi-heart-fill" : "bi bi-heart"}></i>
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
                onUpdate={handleUpdateReply}
                onDelete={handleDeleteReply}
                auth={auth}
                editReplyId={editReplyId}
                stopEditing={stopEditing}
              />
                {/* 댓글 페이징 */}
                <CommentsPagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageInfo={replyPageInfo}
                />

                <CommentInsert 
                  boardNo={id}
                  onSuccess={fetchReplies}
                />

          </CommentSection>

          <BackButton onClick={() => navigate("/activityBoards")}>목록으로</BackButton>
        
        </Wrapper>
      </PageContent>
      <Toast
          message={toastMessage}
          isVisible={showToast}
          onClose={handleCloseToast}
          variant={toastVariant}
      />
    </>
  );
};

export default ActivityBoardDetail;
