import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

export const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const SkeletonBox = styled.div`
  width: ${({ w }) => w || "100%"};
  height: ${({ h }) => h || "20px"};
  margin: ${({ margin }) => margin || "0"};

  border-radius: 6px;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e4e4e4 50%,
    #f0f0f0 75%
  );
  background-size: 500px 100%;
  animation: ${shimmer} 1.2s infinite linear;
`;

export const SkeletonImage = styled(SkeletonBox)`
  width: 100%;
  height: 280px;
  border-radius: 10px;
`;

export const SkeletonMap = styled(SkeletonBox)`
  width: 100%;
  height: 300px;
  border-radius: 10px;
`;
