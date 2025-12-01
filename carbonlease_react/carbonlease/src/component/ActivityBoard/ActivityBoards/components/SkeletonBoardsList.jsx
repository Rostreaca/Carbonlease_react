import { SkeletonBox, SkeletonContent, SkeletonImage, SkeletonRow, SkeletonWrapper } from "./SkeletonBoardsList.styles";

const SkeletonBoardsList = () => {
  return (
    <SkeletonWrapper>
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonRow key={i}>

          <SkeletonBox w="30px" h="18px" />

          <SkeletonContent>
            <SkeletonBox w="60%" h="18px" />
            <SkeletonBox w="90%" h="15px" />
            <SkeletonBox w="70%" h="14px" />
          </SkeletonContent>

          <SkeletonImage />

        </SkeletonRow>
      ))}
    </SkeletonWrapper>
  );
};

export default SkeletonBoardsList;
