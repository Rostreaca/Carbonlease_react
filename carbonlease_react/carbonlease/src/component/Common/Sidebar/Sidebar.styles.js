import styled from "styled-components";

/*  전체 Sidebar Wrapper   */
export const SidebarWrapper = styled.div`
  position: sticky;
  top: 220px;
  align-self: flex-start;

  width: 270px;
  padding: 16px;
  background: white;

  border-radius: 14px;
  border: 1px solid rgba(35,165,91,0.4);

  height: fit-content;

  box-shadow:
    0 0 10px rgba(35,165,91,0.4),
    0 4px 12px rgba(0,0,0,0.08);

  z-index: 2000;

  @media(max-width: 992px) {
  display: none;
}


  .region-select-box {
    margin-bottom: 12px;
    text-align: center;
  }

  .region-select {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgba(35,165,91,0.4);
    background: #f6fff9;

    font-size: 14px;
    font-weight: 600;
    color: #1a6b3e;
  }
`;

/* 지역 대기 정보 박스 */
export const RegionBox = styled.div`
  background: #ffffff;
  border: 1px solid rgba(35,165,91,0.4);
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;

  .title {
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 6px;
  }

  .time {
    font-size: 12px;
    color: #777;
    margin-bottom: 12px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 14px;
  }

  .value {
    font-weight: 700;
    color: #28a745;
  }
`;

/* 감싸는 영역 */
export const BottomArea = styled.div`
  margin-top: 16px;
`;

/* 예보 박스 */
export const ForecastBox = styled.div`
  width: 100%;
  background: #fcfffc;
  border-radius: 12px;
  padding: 13px;
  border: 1px solid rgba(35,165,91,0.4);
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);

  margin-bottom: 18px;

  .title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .date {
    font-size: 12px;
    color: #666;
    margin-bottom: 12px;
  }

  .forecast-list {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  .item {
    width: 70px;
    height: 70px;
    background: #eafff1;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding-top: 6px;
  }

  .forecast-icon {
    width: 56px;
    height: 56px;
    border-radius: 12px;
    object-fit: contain;
  }

  .grade {
    font-size: 13px;
    font-weight: 600;
    color: #1a6b3e;
  }

  .no-data {
    margin-top: 10px;
    font-size: 14px;
    color: #777;
    text-align: center;
    padding: 20px 0;
  }
`;

/* 서울시 평균 */
export const SidoInfoBox = styled.div`
  background: #f6fff9;
  padding: 18px;
  border: 1px solid rgba(35,165,91,0.4);
  border-radius: 12px;
  text-align: center;

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .arrow {
    background: none;
    border: none;
    font-size: 18px;
    font-weight: 700;
    color: #1a6b3e;
    cursor: pointer;
    padding: 4px 8px;
  }

  .title {
    font-size: 15px;
    font-weight: 700;
    color: #1a6b3e;
  }

  .date {
    font-size: 12px;
    color: #666;
    margin: 4px 0;
  }

  .value {
    font-size: 20px;
    font-weight: 800;
    color: #1b9a50;
  }

  &.slide-reset {
    transform: translateX(0);
    opacity: 1;
    transition: all 0.4s ease;
  }

  &.slide-left {
    transform: translateX(-30px);
    opacity: 0;
    transition: all 0.4s ease;
  }

  &.slide-right {
    transform: translateX(30px);
    opacity: 0;
    transition: all 0.4s ease;
  }

`;




