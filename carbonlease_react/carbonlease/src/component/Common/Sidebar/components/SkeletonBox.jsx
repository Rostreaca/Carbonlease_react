import styled from "styled-components";

const SkeletonWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const SkeletonLine = styled.div`
  height: ${(props) => props.height || "14px"};
  width: ${(props) => props.width || "100%"};
  background: linear-gradient(90deg, #ececec 25%, #f4f4f4 50%, #ececec 75%);
  background-size: 200% 100%;
  border-radius: 6px;
  animation: loading 1.2s infinite;

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  margin-bottom: 10px;
`;


const SkeletonBox = () => {
  return (
    <SkeletonWrapper>
      <SkeletonLine width="60%" height="16px" />
      <SkeletonLine width="40%" height="12px" />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
      <SkeletonLine />
    </SkeletonWrapper>
  );
};

export default SkeletonBox;
