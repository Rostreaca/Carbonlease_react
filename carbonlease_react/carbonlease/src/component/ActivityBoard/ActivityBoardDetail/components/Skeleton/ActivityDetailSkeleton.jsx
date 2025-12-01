import { 
  SkeletonWrapper,
  SkeletonBox,
  SkeletonImage,
  SkeletonMap 
} from "./ActivityDetailSkeleton.styles";

const ActivityDetailSkeleton = () => {

  return (
    <SkeletonWrapper>
      
      {/* 제목 & 작성 정보 */}
      <SkeletonBox w="40%" h="28px" />
      <SkeletonBox w="25%" h="18px" margin="12px 0 25px 0" />

      {/* 이미지 */}
      <SkeletonImage />

      {/* 내용 */}
      <SkeletonBox w="100%" h="18px" />
      <SkeletonBox w="90%" h="18px" margin="10px 0" />
      <SkeletonBox w="95%" h="18px" margin="10px 0 30px 0" />

      {/* 지도 */}
      <SkeletonMap />

      {/* 프로필 카드 */}
      <SkeletonBox w="100%" h="120px" margin="20px 0" />

      {/* 댓글 영역 */}
      <SkeletonBox w="100%" h="50px" />
      <SkeletonBox w="100%" h="50px" margin="10px 0" />
      <SkeletonBox w="100%" h="50px" />

    </SkeletonWrapper>
  );
};

export default ActivityDetailSkeleton;
