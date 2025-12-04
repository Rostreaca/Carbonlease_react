
import { Marker } from 'react-simple-maps';
import { StyledComposableMap, StyledGeographies, StyledGeography } from './components/RegionStatsMap.styled';
import BubbleMarker from './components/BubbleMarker';
import {
    InfoBox,
    InfoContent,
    InfoDescription,
    InfoIcon,
    InfoTitle,
    LoadingText,
    MapContainer,
    MapWrapper,
    Tooltip
} from './components/RegionStatsMap.styled';
import useRegionStatsMap from './useRegionStatsMap';

const RegionStatsMap = () => {
    const {
        regionData,
        loading,
        hoveredRegion,
        setHoveredRegion,
        tooltipContent,
        setTooltipContent,
    } = useRegionStatsMap();

    if (loading) {
        return (
            <MapContainer>
                <LoadingText>데이터 로딩 중...</LoadingText>
            </MapContainer>
        );
    }


    // 버블 크기 계산 (value가 %면 그대로, 실제 값이면 변환)
    const getBubbleSize = (value) => {
        const minSize = 30;
        const maxSize = 50;
        // usagePercent 기준으로 maxValue 계산
        const maxValue = Math.max(...regionData.map(r => r.usagePercent));
        return minSize + ((value / maxValue) * (maxSize - minSize));
    };

    return (
        <MapContainer>
            <InfoBox>
                <InfoIcon className="bi bi-geo-alt-fill" />
                <InfoContent>
                    <InfoTitle>탄소중립포인트 에너지 사용량</InfoTitle>
                    <InfoDescription>
                        각 지역별 탄소중립포인트 에너지 사용량을 확인해보세요.
                    </InfoDescription>
                </InfoContent>
            </InfoBox>

            <MapWrapper>
                <StyledComposableMap
                    projection="geoMercator"
                    projectionConfig={{ scale: 6000, center: [127.7, 36.3] }}
                    width={500}
                    height={800}
                >
                    <StyledGeographies geography="/maps/south-korea-provinces.json">
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <StyledGeography
                                    key={geo.rsmKey}
                                    geography={geo}
                                />
                            ))
                        }
                    </StyledGeographies>

                    {/* 버블 마커 */}
                    {regionData.map((region) => {
                        // 백엔드에서 key를 '지역명-위도-경도-평균값'으로 생성함
                        const size = getBubbleSize(region.usagePercent);
                        const isHovered = hoveredRegion === region.topRegionName;
                        return (
                            <Marker key={region.key} coordinates={[region.longitude, region.latitude]}>
                                <BubbleMarker
                                    region={region}
                                    size={size}
                                    isHovered={isHovered}
                                    onMouseEnter={() => {
                                        setHoveredRegion(region.topRegionName);
                                        setTooltipContent(`${region.topRegionName}: ${region.avgUseQnt}kWh (${region.usagePercent.toFixed(1)}%)`);
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredRegion(null);
                                        setTooltipContent('');
                                    }}
                                />
                            </Marker>
                        );
                    })}
                </StyledComposableMap>

                {tooltipContent && <Tooltip>{tooltipContent}</Tooltip>}
            </MapWrapper>
        </MapContainer>
    );
};

export default RegionStatsMap;
