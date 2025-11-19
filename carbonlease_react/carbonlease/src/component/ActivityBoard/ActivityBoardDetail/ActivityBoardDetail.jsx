import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle.jsx";
import PageContent from "../../Common/PageContent/PageContent.jsx";

import BoardContent from "./components/BoardContent.jsx";
import ImageSection from "./components/ImageSection.jsx";
import PostHeader from "./components/PostHeader.jsx";
import PostTitle from "./components/Title.jsx";
import ThermometerGauge from "./components/ThermometerGauge.jsx";
import ReplyPagination from "../../Common/UI/ReplyPagination.jsx";
import ProfileCard from "./components/ProfileCard.jsx";
import MapSection from "./components/MapSection.jsx";
import ReplyEditForm from "./components/ReplyEditForm.jsx";
import InputButton from "./components/InputButton.jsx";
import OutlineSuccessButton from "../../Common/UI/Button/OutlineWriterButton.jsx";
import OutlineDangerButton from "../../Common/UI/Button/OutlineDangerButton.jsx";
import {
  Wrapper, Section, ImageCard, ContentCard, MapCard,
  ButtonArea, ButtonGroup, ReplyWriteArea,
  ProfileAndLike, LikeCard
} from "./ActivityBoardDetail.styles.js";
import axios from "axios";

const ActivityBoardDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  axios.get(`/activityBoards/${id}`)
  const [post, setPost] = useState({
    id: 1,
    title: "대중교통 이용하기",
    writer: "아이언군",
    createdDate: "2025.01.11",
    views: 123,
    likes: 12,
    isLiked: false,
    content: `출퇴근할 때 버스를 이용했습니다.\n도보 + 대중교통으로 이동하면서 탄소 절감을 실천했어요.\n앞으로도 꾸준히 대중교통 이용을 실천할 예정! ✨`,
    images: [
      "https://img.khan.co.kr/news/r/700xX/2024/10/28/news-p.v1.20240501.1bdd2e3a6ae647d48bfcaf6c9d216739_P1.webp"
    ],
    profile: {
      nickname: "아이언군",
      totalCarbonSave: 19.21,
      count: 999,
      grade: "leaf",
    },
    map: { lat: 37.566826, lng: 126.9786567 }
  });

  const [comments] = useState([
    { id:1, writer:"탄소아끼미", date:"2025.02.01", content:"대중교통 이용 멋져요! 👍" },
    { id:2, writer:"지구지킴이", date:"2025.02.02", content:"저도 도전해봐야겠어요 🌍" }
  ]);

  // 공감 토글
  const handleLikeToggle = () => {
    setPost(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleUpdate = () => {
    navigate(`/activityBoards/updateForm/${post.id}`);
  };
  const goList = () => {
    navigate("/activityBoards");
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

          <Section style={{ textAlign: "center", borderBottom: "none" }}>
            <PostTitle title={post.title} />
            <PostHeader data={{
              nickname: post.writer,
              date: post.createdDate,
              views: post.views,
              likes: post.likes
            }} />
          </Section>

          <Section>
            <ImageCard>
              <ImageSection images={post.images} />
            </ImageCard>
          </Section>

          <Section>
            <ContentCard>
              <BoardContent content={post.content} />
            </ContentCard>
          </Section>

          <Section>
            <MapCard>
              <MapSection lat={post.map.lat} lng={post.map.lng} />
            </MapCard>
          </Section>

          {/* 프로필 + 공감 */}
          <ProfileAndLike>
            <ProfileCard
              nickname={post.profile.nickname}
              count={post.profile.count}
              carbon={post.profile.totalCarbonSave}
              grade={post.profile.grade}
            />

            <ThermometerGauge
              value={post.profile.totalCarbonSave}
              max={30}
            />

            <LikeCard $liked={post.isLiked} onClick={handleLikeToggle}>
              <i className={post.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
              {post.isLiked ? '공감 취소' : '공감하기'}
            </LikeCard>
          </ProfileAndLike>


          {/* 버튼 */}
          <ButtonArea>
            <OutlineSuccessButton onClick={goList}>목록으로</OutlineSuccessButton>
            <ButtonGroup>
              <OutlineSuccessButton onClick={handleUpdate}>수정</OutlineSuccessButton>
              <OutlineDangerButton>삭제</OutlineDangerButton>
            </ButtonGroup>
          </ButtonArea>

          {/* 댓글 리스트 */}
          <Section>
            <div style={{ width:"100%" }}>
              {comments.length === 0 ? (
                <div style={{ padding:"20px", textAlign:"center", color:"#777" }}>
                  아직 댓글이 없습니다. 첫 댓글을 남겨보세요! 💬
                </div>
              ) : (
                comments.map((reply) => (
                  <div key={reply.id} style={{
                    padding:"14px 10px",
                    borderBottom:"1px solid #eee",
                    fontSize:"14px"
                  }}>
                    <b>{reply.writer}</b> · {reply.date}
                    <div style={{ marginTop:"6px" }}>{reply.content}</div>
                  </div>
                ))
              )}
            </div>
          </Section>
          
          <ReplyWriteArea>
            <ReplyEditForm style={{ flex: 1 }} />
            <InputButton />
          </ReplyWriteArea>

          <ReplyPagination currentPage={1} totalPages={5} />

        </Wrapper>
      </PageContent>
    </>
  );
};

export default ActivityBoardDetail;
