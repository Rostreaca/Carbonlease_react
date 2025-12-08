import { ComposableMap as BaseComposableMap, Geographies as BaseGeographies, Geography as BaseGeography } from 'react-simple-maps';
import styled from 'styled-components';

export const StyledComposableMap = styled(BaseComposableMap)`
    width: 100%;
    height: auto;
`;

export const StyledGeographies = styled(BaseGeographies)``;

export const StyledGeography = styled(BaseGeography)`
    fill: #e8f0f3ff;
    stroke: #a1d4e6ff;
    stroke-width: 1.5;
    & path {
        outline: none;
    }
    &:hover {
        fill: #aad3e2ff;
        outline: none;
    }
`;
// 버블 마커 스타일
export const BubbleMarkerGroup = styled.g`
    cursor: pointer;
`;

export const BubbleCircle = styled.circle`
    fill: #34ade5b8;
    stroke: #34ade5b8;
    stroke-width: 2;
    transition: all 0.3s ease;
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
    fill-opacity: ${({ $hovered }) => ($hovered ? 0.95 : 0.85)};
`;

export const BubbleRegionText = styled.text`
    fill: #333333;
    font-size: ${({ $hovered }) => ($hovered ? '22px' : '20px')};
    font-weight: bold;
    pointer-events: none;
`;

export const BubbleValueText = styled.text`
    fill: #ffffff;
    font-size: 20px;
    font-weight: bold;
    pointer-events: none;
`;

export const MapContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    @media (max-width: 768px) {
        min-height: 350px;
    }
`;

export const InfoBox = styled.div`
    background-color: #f0f9ff;
    padding: 16px;
    border-radius: 12px;
    border: 1px solid #d1e8f5;
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    ${'' /* margin-bottom: 24px; */}

    /* 말풍선 꼬리 (아래 가리키는 삼각형) */
    &::after {
        content: '';
        position: absolute;
        z-index:1;
        bottom: -9px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #f0f9ff;
    }

    /* 꼬리 테두리 */
    &::before {
        content: '';
        position: absolute;
        bottom: -11px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 11px solid transparent;
        border-right: 11px solid transparent;
        border-top: 11px solid #d1e8f5;
        z-index: -1;
    }

    @media (max-width: 768px) {
        gap: 10px;
        margin-bottom: 20px;
    }
`;

export const InfoIcon = styled.i`
    font-size: 24px;
    color: #0DB157;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

export const InfoContent = styled.div`
    flex: 1;
`;

export const InfoTitle = styled.strong`
    color: #1a237e;
    font-size: 16px;
    font-weight: 700;
    display: block;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

export const InfoDescription = styled.p`
    margin: 4px 0 0 0;
    font-size: 14px;
    color: #546e7a;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

export const MapTitle = styled.h3`
    font-size: 20px;
    font-weight: 700;
    color: var(--heading-color);
    margin: 0 0 20px 0;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 17px;
        margin-bottom: 15px;
    }
`;

export const MapWrapper = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        max-width: 100%;
        max-height: 100%;
    }
`;

export const LoadingText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 16px;
    color: var(--default-color);
`;

export const Tooltip = styled.div`
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    text-align: center;
    pointer-events: none;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    strong {
        color: #4caf50;
    }
`;

export const Legend = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.95);
    padding: 12px 16px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        bottom: 15px;
        right: 15px;
        padding: 10px 12px;
    }
`;

export const LegendTitle = styled.div`
    font-size: 13px;
    font-weight: 600;
    color: var(--heading-color);
    ${'' /* margin-bottom: 10px; */}
`;

export const LegendRow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
    font-size: 12px;
    color: var(--default-color);
`;

export const LegendCircle = styled.div`
    width: ${props =>
        props.size === 'small' ? '12px' :
        props.size === 'medium' ? '16px' : '22px'
    };
    height: ${props => 
        props.size === 'small' ? '12px' :
        props.size === 'medium' ? '16px' : '22px'
    };
    border-radius: 50%;
    background-color: #2F8F2F;
    opacity: 0.85;
    border: 1px solid #2F8F2F;
`;
