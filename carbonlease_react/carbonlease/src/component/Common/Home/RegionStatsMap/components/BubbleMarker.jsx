import { BubbleMarkerGroup, BubbleCircle, BubbleRegionText, BubbleValueText } from './RegionStatsMap.styled';

// 버블 마커 컴포넌트
const BubbleMarker = ({ region, size, isHovered, onMouseEnter, onMouseLeave }) => (
    <BubbleMarkerGroup
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <BubbleCircle
            r={isHovered ? size + 3 : size}
            $hovered={isHovered}
        />
        <BubbleRegionText
            textAnchor="middle"
            y={-size - 10}
            $hovered={isHovered}
        >
            {region.region}
        </BubbleRegionText>
        <BubbleValueText
            textAnchor="middle"
            y={5}
        >
            {isNaN(Number(region.value)) ? '0.0' : Number(region.value).toFixed(1)}%
        </BubbleValueText>
    </BubbleMarkerGroup>
);

export default BubbleMarker;
