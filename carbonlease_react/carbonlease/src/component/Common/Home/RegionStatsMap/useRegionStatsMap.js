import { useEffect, useState } from 'react';
import { formatRegionStatsForMap, getRegionCarbonStats } from '../../../../api/main/regionStatsApi';

export default function useRegionStatsMap() {
    const [regionData, setRegionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredRegion, setHoveredRegion] = useState(null);
    const [tooltipContent, setTooltipContent] = useState('');

    // 컴포넌트 마운트 시 지역 통계 데이터 불러오기
    useEffect(() => {
        const fetchRegionStats = async () => {
            try {
                const apiData = await getRegionCarbonStats();
                const formatted = formatRegionStatsForMap(apiData);
                setRegionData(formatted);
            } catch (err) {
                console.error('지도 데이터 로딩 실패:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchRegionStats();
    }, []);

    return {
        regionData,
        loading,
        hoveredRegion,
        setHoveredRegion,
        tooltipContent,
        setTooltipContent,
    };
}
