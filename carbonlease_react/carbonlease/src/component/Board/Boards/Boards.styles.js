import styled from "styled-components";

export const BoardItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 140px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #e4e4e4;
`;

export const BoardNo = styled.div`
  font-weight: 600;
  color: #666;
`;

export const BoardInfo = styled.div`
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 6px;
  }
  .content {
    font-size: 14px;
    color: #555;
    margin-bottom: 6px;
  }
  .meta {
    font-size: 12px;
    color: #888;
  }
`;

export const Thumbnail = styled.div`
  width: 120px;
  height: 90px;
  border-radius: 6px;
  overflow: hidden;
  background: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .no-image {
    color: #aaa;
    font-size: 12px;
  }
`;
