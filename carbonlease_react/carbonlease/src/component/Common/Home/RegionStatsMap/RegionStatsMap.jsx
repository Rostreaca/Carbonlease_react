import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { formatRegionStatsForMap, getRegionCarbonStats } from '../../../../api/main/regionStatsApi';

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
} from './RegionStatsMap.styled';

const RegionStatsMap = () => {
    const [regionData, setRegionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredRegion, setHoveredRegion] = useState(null);
    const [tooltipContent, setTooltipContent] = useState('');

    useEffect(() => {
        const fetchRegionStats = async () => {
            try {
                const apiData = await getRegionCarbonStats();
                console.log('getRegionCarbonStats() 결과:', apiData);
                // value가 %면, k 단위로 변환해서 setRegionData
                const formatted = formatRegionStatsForMap(apiData);
                console.log('formatRegionStatsForMap() 결과:', formatted);
                setRegionData(formatted);
            } catch (err) {
                console.error("지도 데이터 로딩 실패:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRegionStats();
    }, []);

    if (loading) {
        return (
            <MapContainer>
                <LoadingText>데이터 로딩 중...</LoadingText>
            </MapContainer>
        );
    }

    // 버블 크기 계산 (value가 %면 그대로, 실제 값이면 변환)
    const getBubbleSize = (value) => {
        const minSize = 20;
        const maxSize = 60;
        const maxValue = Math.max(...regionData.map(r => r.value));
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
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{ scale: 6000, center: [127.7, 36.3] }}
                    width={500}
                    height={800}
                    style={{ width: '100%', height: 'auto' }}
                >
                    <Geographies geography="/maps/south-korea-provinces.json">
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#e8f0f3ff"
                                    stroke="#a1d4e6ff"
                                    strokeWidth={1.5}
                                    style={{
                                        default: { outline: 'none' },
                                        hover: { fill: '#aad3e2ff', outline: 'none' },
                                        pressed: { outline: 'none' }
                                    }}
                                />
                            ))
                        }
                    </Geographies>

                    {/* 버블 마커 */}
                    {regionData.map((region) => {
                        console.log(`버블 차트 지역: ${region.region}, value: ${region.value}`);
                        const size = getBubbleSize(region.value);
                        const isHovered = hoveredRegion === region.region;

                        return (
                            <Marker key={region.region} coordinates={[region.lng, region.lat]}>
                                <g
                                    onMouseEnter={() => {
                                        setHoveredRegion(region.region);
                                        setTooltipContent(`${region.region}: ${region.value.toLocaleString()} 포인트`);
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredRegion(null);
                                        setTooltipContent('');
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <circle
                                        r={isHovered ? size + 3 : size}
                                        fill="#34ade5b8"
                                        fillOpacity={isHovered ? 0.95 : 0.85}
                                        stroke="#34ade5b8"
                                        strokeWidth={2}
                                        style={{
                                            transition: 'all 0.3s ease',
                                            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                                        }}
                                    />
                                    <text
                                        textAnchor="middle"
                                        y={-size - 10}
                                        style={{
                                            fill: '#333333',
                                            fontSize: isHovered ? '22px' : '20px',
                                            fontWeight: 'bold',
                                            pointerEvents: 'none'
                                        }}
                                    >
                                        {region.region}
                                    </text>
                                    <text
                                        textAnchor="middle"
                                        y={5}
                                        style={{
                                            fill: '#ffffff',
                                            fontSize: '20px',
                                            fontWeight: 'bold',
                                            pointerEvents: 'none'
                                        }}
                                    >
                                        {/* value가 %면 (region.value).toFixed(1)+'%' / 실제 값이면 (region.value/1000).toFixed(1)+'k' */}
                                        {isNaN(Number(region.value)) ? '0.0' : Number(region.value).toFixed(1)}%
                                    </text>
                                </g>
                            </Marker>
                        );
                    })}
                </ComposableMap>

                {tooltipContent && <Tooltip>{tooltipContent}</Tooltip>}
            </MapWrapper>
        </MapContainer>
    );
};

export default RegionStatsMap;
