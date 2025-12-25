import { useEffect, useState } from 'react';
import { getRegionStats } from '../../../../api/main/regionStatsApi';

// 지역 통계 지도용 커스텀 훅
const useRegionStatsMap = (onShowToast) => {
    // -------------------- 상태 선언 --------------------
    const [regionData, setRegionData] = useState([]); // 지도에 표시할 지역 데이터
    const [loading, setLoading] = useState(true);      // 로딩 상태
    const [hoveredRegion, setHoveredRegion] = useState(null); // 마우스 오버 지역
    const [tooltipContent, setTooltipContent] = useState('');  // 툴팁 내용

    // -------------------- 데이터 포맷 변환 함수 --------------------
    // API 응답을 지도에서 사용할 형태로 변환
    const formatRegionStatsForMap = (list) =>
        list.map((item) => ({
            topRegionName: item.topRegionName,
            avgUseQnt: item.avgUseQnt,
            usagePercent: item.usagePercent,
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
        }));

    // -------------------- 데이터 불러오기 --------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('API 호출!');
                const result = await getRegionStats();
                // ResponseData 구조 대응
                const raw = result.data?.data ?? result.data ?? result;
                setRegionData(formatRegionStatsForMap(raw));
            } catch (error) {
                onShowToast(
                    error?.response?.data?.['error-message'] || '지역 통계 데이터를 불러오지 못했습니다.',
                    'error'
                );
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // -------------------- 버블 크기 계산 함수 --------------------
    const getBubbleSize = (value) => {
        const minSize = 30;
        const maxSize = 50;
        const maxValue = Math.max(...regionData.map(r => r.usagePercent));
        return minSize + ((value / maxValue) * (maxSize - minSize));
    };

    // -------------------- 반환 객체 --------------------
    return {
        regionData,
        loading,
        hoveredRegion,
        setHoveredRegion,
        tooltipContent,
        setTooltipContent,
        getBubbleSize,
    };
};

export default useRegionStatsMap;
