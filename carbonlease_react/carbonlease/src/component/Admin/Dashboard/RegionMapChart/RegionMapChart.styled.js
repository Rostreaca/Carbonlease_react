import styled from 'styled-components';

export const MapChartContainer = styled.div`
    width: 100%;
    height: 500px;
    position: relative;
`;

export const MapChartOverlay = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
`;

export const RegionMarker = styled.div`
    position: absolute;
    background: rgba(0, 163, 74, 0.8);
    color: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
`;

export const MapChartBackground = styled.div`
    width: 100%;
    height: 100%;
    background: #e0e0e0;
`;
