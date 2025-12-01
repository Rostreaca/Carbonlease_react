import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

export const SkeletonWrapper = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
`;

export const SkeletonRow = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 120px;   // ActivityBoards와 동일하게 맞춰줌!
  padding: 20px 0;
  border-bottom: 1px solid #eaeaea;
  border-radius: 6px;
  gap: 20px;
`;

export const SkeletonBox = styled.div`
  width: ${({ w }) => w || "100%"};
  height: ${({ h }) => h || "20px"};
  border-radius: 6px;
  background: #e0e0e0;
  background: linear-gradient(90deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

export const SkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SkeletonImage = styled.div`
  width: 110px;
  height: 80px;
  border-radius: 8px;
  background: #ddd;
  background: linear-gradient(90deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;