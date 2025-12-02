import PageTitle from "../Layout/PageTitle/PageTitle";
import PageContent from "../PageContent/PageContent";
import { Link } from "react-router-dom";

import {
  EmptyWrapper,
  EmptyCard,
  EmptyImage,
  EmptyTitle,
  EmptyText,
  BackButton,
} from "./NotFound.styles";

/**
 * NotFound Component (공통 404/조회 실패 화면)
 *
 * @param {string} title - 큰 제목 (예: "게시글을 찾을 수 없습니다.")
 * @param {string} description - 상세 설명 (예: "삭제되었거나 주소가 잘못되었습니다.")
 * @param {string} backPath - 돌아가기 버튼 클릭 시 이동할 경로
 * @param {string} backText - 버튼 안에 표시할 텍스트
 * @param {string} image - 표시할 이미지 경로 (기본: /images/empty.png)
 * @param {Array} breadcrumbs - PageTitle에 전달할 breadcrumb 리스트
 *
 * 사용 예시는 아래 따로 정리되어 있음.
 */
const NotFound = ({
  title = "페이지를 찾을 수 없습니다.",          // 기본 제목
  description = "요청하신 페이지가 존재하지 않습니다.", // 기본 설명
  backPath = "/",                                  // 기본 버튼 이동 경로
  backText = "돌아가기",                           // 기본 버튼 문자
  image = "/images/empty.png",                     // 기본 이미지
  breadcrumbs = [],                                // 기본 breadcrumb
}) => {
  return (
    <>
      {/* 상단 breadcrumb + 페이지 타이틀 */}
      <PageTitle
        title={title}
        breadcrumbs={breadcrumbs}
      />

      {/* 본문 영역 공통 Wrapper */}
      <PageContent>
        <EmptyWrapper>
          <EmptyCard>
            
            {/* 중앙 이미지 */}
            <EmptyImage src={image} alt="not-found" />
            
            {/* 제목 / 설명 */}
            <EmptyTitle>{title}</EmptyTitle>
            <EmptyText>{description}</EmptyText>

            {/* 버튼 */}
            <Link to={backPath}>
              <BackButton>{backText}</BackButton>
            </Link>

          </EmptyCard>
        </EmptyWrapper>
      </PageContent>
    </>
  );
};

export default NotFound;
