import { BubbleCircle, BubbleMarkerGroup, BubbleRegionText, BubbleValueText } from './RegionStatsMap.styled';

// 버블 마커 컴포넌트
const BubbleMarker = ({ region, size, isHovered, onMouseEnter, onMouseLeave, onShowToast }) => {
    // NaN 방지: size, value, y 등
    const safeSize = isNaN(Number(size)) ? 20 : Number(size);
    const safeValue = isNaN(Number(region.usagePercent)) ? 0.0 : Number(region.usagePercent);
    const safeY = isNaN(-safeSize - 10) ? -30 : -safeSize - 10;

    
    return (
        <BubbleMarkerGroup
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <BubbleCircle
                r={isHovered ? safeSize + 3 : safeSize}
                $hovered={isHovered}
            />
            <BubbleRegionText
                textAnchor="middle"
                y={safeY}
                $hovered={isHovered}
            >
                {region.topRegionName}
            </BubbleRegionText>
            <BubbleValueText
                textAnchor="middle"
                y={5}
            >
                {safeValue.toFixed(1)}%
            </BubbleValueText>
        </BubbleMarkerGroup>
    );
};

export default BubbleMarker;
