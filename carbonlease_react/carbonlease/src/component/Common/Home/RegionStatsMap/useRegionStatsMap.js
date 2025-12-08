import { useEffect, useState } from 'react';
import { getRegionStats } from '../../../../api/main/regionStatsApi';


const useRegionStatsMap = (onShowToast) => {

    // 1. 상태 선언
    const [regionData, setRegionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredRegion, setHoveredRegion] = useState(null);
    const [tooltipContent, setTooltipContent] = useState('');

    // 2. 지역 통계 데이터를 지도용 포맷으로 변환
    const formatRegionStatsForMap = (list) =>
        list.map((items) => ({
            //localName: items.localName,
            topRegionName: items.topRegionName,
            //year: items.year,
            avgUseQnt: items.avgUseQnt,
            usagePercent: items.usagePercent,
            latitude: Number(items.latitude),
            longitude: Number(items.longitude)
    }));

    // 3. useEffect로 데이터 불러오기 (최초 마운트 시 한 번만 호출)
    useEffect(() => {
        console.log('API 호출!');
        getRegionStats()
            .then((result) => {
                const raw = result.data ?? result;
                const formatted = formatRegionStatsForMap(raw);
                setRegionData(formatted);
            })
            .catch((error) => {
                onShowToast(
                    error?.response?.data?.["error-message"] || '지역 통계 데이터를 불러오지 못했습니다.',
                    'error'
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // 4. 버블 크기 계산 함수 (value가 %면 그대로, 실제 값이면 변환)
    const getBubbleSize = (value) => {
        const minSize = 30;
        const maxSize = 50;
        const maxValue = Math.max(...regionData.map(r => r.usagePercent));
        return minSize + ((value / maxValue) * (maxSize - minSize));
    };

    return {
        regionData,
        loading,
        hoveredRegion,
        setHoveredRegion,
        tooltipContent,
        setTooltipContent,
        getBubbleSize,
    }
}

export default useRegionStatsMap;
