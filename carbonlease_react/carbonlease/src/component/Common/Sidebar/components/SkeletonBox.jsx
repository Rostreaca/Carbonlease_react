import styled from "styled-components";

const Wrap = styled.div`
  background:#fff;
  border:1px solid #eee;
  padding:16px;
  border-radius:12px;
`;

const Line = styled.div`
  height:${p => p.h || "14px"};
  width:${p => p.w || "100%"};
  background:#eee;
  border-radius:6px;
  margin-bottom:8px;
`;

export default function SkeletonBox() {
  return (
    <Wrap>
      <Line w="60%" h="16px"/>
      <Line w="40%" h="12px"/>
      <Line/>
      <Line/>
      <Line/>
    </Wrap>
  );
}
