import styled from "styled-components";

/* Sidebar 전체 */
export const SidebarWrapper = styled.div`
  position: sticky;
  top: 220px;
  align-self: flex-start;

  width: 210px;
  min-width:210px;
  flex-shrink: 0;

  padding: 11px;
  background: #fff;

  border-radius: 14px;
  border: 1px solid rgba(35,165,91,0.15);

  height: fit-content;

  box-shadow:
    0 0 4px rgba(35,165,91,0.15),
    0 2px 6px rgba(0,0,0,0.08);

  z-index: 2000;

  @media(max-width: 992px) {
    display: none;
  }

  .region-select-box {
    margin-bottom: 9px;
    text-align: center;
  }

  .region-select {
    width: 98%;
    padding: 10px 35px 10px 15px;
    appearance: none;
    background: url("data:image/svg+xml;utf8,<svg fill='black' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>") no-repeat right 12px center;
    border-radius: 10px;
    border: 1px solid rgba(35,165,91,0.4);

    font-size: 14px;
    font-weight: 600;
    color: #1a6b3e;
  }
`;

export const RegionSelect = styled.select`
  width: 98%;
    padding: 10px 35px 10px 15px;
    appearance: none;
    background: url("data:image/svg+xml;utf8,<svg fill='black' xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>") no-repeat right 12px center;
    border-radius: 10px;
    border: 1px solid rgba(35,165,91,0.4);

    font-size: 14px;
    font-weight: 600;
    color: #1a6b3e;
`

export const RegionBox = styled.div`
  background: #ffffff;
  border: 1px solid rgba(35,165,91,0.4);
  padding: 15px;
  margin: 2px;
  border-radius: 12px;
  margin-bottom: 9px;
  margin-top: 9px;
  height: 325px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

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

export const RegionSkeletonBox = styled.div`
  background: #ffffff;
  border: 1px solid rgba(35,165,91,0.4);
  padding: 15px;
  margin: 2px;
  border-radius: 12px;
  margin-bottom: 9px;
  height: 180px;

  display: flex;
  align-items: center;
  gap: 10px;

  .bar {
    height: 12px;
    border-radius: 8px;
    background: #eaeaea;
  }

  .bar.short {
    width: 50%;
  }
  .bar.medium {
    width: 70%;
  }
  .bar.long {
    width: 100%;
  }
`;

export const RegionNullBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  height: 320px;

  img {
    width: 160px;
    opacity: 0.7;
  }
`;

export const SidoInfoBox = styled.div`
  background: #f6fff9;
  padding: 15px;
  border: 1px solid rgba(35,165,91,0.4);
  border-radius: 12px;
  text-align: center;
  height: 120px;
  transition: opacity 0.85s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.85s cubic-bezier(0.22, 0.61, 0.36, 1);

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
  }

  .arrow {
    background: none;
    border: none;
    font-size: 18px;
    font-weight: 700;
    color: #1a6b3e;
    cursor: pointer;
    padding: 2px 8px;
  }

  .title {
    font-size: 15px;
    font-weight: 700;
    color: #1a6b3e;
  }

  .date {
    font-size: 12px;
    color: #666;
    margin: 2px 0;
  }

  .value {
    font-size: 20px;
    font-weight: 800;
    color: #1b9a50;
  }
`;


export const SidoNullBox = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #777;
`;
