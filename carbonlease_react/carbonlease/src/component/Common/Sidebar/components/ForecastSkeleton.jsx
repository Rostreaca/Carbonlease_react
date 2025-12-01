import styled from "styled-components";

const Box = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 18px;
  border: 1px solid #e5e5e5;
`;

const Line = styled.div`
  height: ${(props) => props.height || "14px"};
  width: ${(props) => props.width || "100%"};
  background: linear-gradient(90deg, #eaeaea 25%, #f5f5f5 50%, #eaeaea 75%);
  background-size: 200% 100%;
  animation: loading 1.3s infinite;
  border-radius: 6px;
  margin-bottom: 10px;

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const IconSkeleton = styled.div`
  width: 60px;
  height: 60px;
  background: #eaeaea;
  border-radius: 12px;
  animation: loading 1.3s infinite;

  @keyframes loading {
    0% { opacity: 0.6; }
    100% { opacity: 1; }
  }
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  margin-top: 12px;
`;

const ForecastSkeleton = () => {
  return (
    <Box>
      <Line width="70%" height="16px" />
      <Line width="40%" height="12px" />

      <Row>
        <IconSkeleton />
        <IconSkeleton />
        <IconSkeleton />
      </Row>
    </Box>
  );
};

export default ForecastSkeleton;
