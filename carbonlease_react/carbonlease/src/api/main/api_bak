
// 지역별 탄소중립 포인트 API
export const getRegionCarbonStats = () => {
    // Spring Boot API 호출 (실제 API 사용 시 주석 해제 및 URL 수정)
    // return axios.get('http://localhost:8080/api/region/carbon-stats')
    //     .then(response => formatRegionStatsForMap(response.data))
    //     .catch(error => {
    //         console.error('Error fetching region carbon stats:', error);
    //         return getDummyRegionStats(); // fallback to dummy data
    //     });

    // 임시 더미 데이터
    return Promise.resolve(getDummyRegionStats());
};

// API 응답 데이터를 지도 형식으로 변환
export const formatRegionStatsForMap = (apiData) => {
    // API 응답 구조에 맞게 변환 로직 작성
    return apiData.map(item => ({
        region: item.regionName,
        lat: item.latitude,
        lng: item.longitude,
        value: item.carbonPoints,
        label: `${item.regionName} ${item.carbonPoints.toLocaleString()}P`,
        population: item.population
    }));
};

// 더미 데이터 (SVG 좌표 기준)
const getDummyRegionStats = () => {
    return [
        {
            region: '서울',
            x: 250,
            y: 180,
            value: 45800,
            lat: 37.5665,
            lng: 126.9780
        },
        {
            region: '부산',
            x: 350,
            y: 420,
            value: 38200,
            lat: 35.1796,
            lng: 129.0756
        },
        {
            region: '인천',
            x: 180,
            y: 190,
            value: 32600,
            lat: 37.4563,
            lng: 126.7052
        },
        {
            region: '대구',
            x: 320,
            y: 320,
            value: 29500,
            lat: 35.8714,
            lng: 128.6014
        },
        {
            region: '대전',
            x: 220,
            y: 280,
            value: 27100,
            lat: 36.3504,
            lng: 127.3845
        },
        {
            region: '광주',
            x: 180,
            y: 380,
            value: 25800,
            lat: 35.1595,
            lng: 126.8526
        },
        {
            region: '울산',
            x: 370,
            y: 370,
            value: 23400,
            lat: 35.5384,
            lng: 129.3114
        },
        {
            region: '세종',
            x: 230,
            y: 250,
            value: 18900,
            lat: 36.4801,
            lng: 127.2890
        }
    ];
};
