import styled from "styled-components";

export const LayoutWrap = styled.div`
  width: 100%;
`;

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  gap: ${props => (props.$showSidebar ? "90px" : "0px")};
  padding: 40px 0;
  min-height: 800px;
`;

export const MainContent = styled.div`
  flex: 1;
  max-width: ${({ showSidebar }) => (showSidebar ? "1100px" : "100%")};
`;


