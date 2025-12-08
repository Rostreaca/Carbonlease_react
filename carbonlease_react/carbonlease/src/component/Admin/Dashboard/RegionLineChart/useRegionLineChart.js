import { useEffect, useState } from 'react';
import { getUsersRegionActivityStats } from '../../../../api/dashboard/adminDashBoard';

function convertRegionStatsToChartData(stats) {
    const labels = stats.map(item => item.regionName);
    const totalData = stats.map(item => item.totalCount);
    const boardData = stats.map(item => item.boardCount);
    const activityData = stats.map(item => item.activityCount);
    return {
        labels,
        datasets: [
            {
                label: 'Total',
                data: totalData,
                fill: false,
                borderColor: '#00a34a',
                backgroundColor: '#00a34a',
                pointBorderColor: '#00a34a',
                pointBackgroundColor: 'rgba(13, 253, 145, 0.3)',
                pointRadius: 10,
                pointHoverRadius: 14,
                pointStyle: 'circle',
                tension: 0.3
            },
            {
                label: 'Board',
                data: boardData,
                fill: false,
                borderColor: '#1976d2',
                backgroundColor: '#1976d2',
                pointBorderColor: '#1976d2',
                pointBackgroundColor: 'rgba(25, 118, 210, 0.2)',
                pointRadius: 10,
                pointHoverRadius: 14,
                pointStyle: 'rect',
                tension: 0.3
            },
            {
                label: 'Activity',
                data: activityData,
                fill: false,
                borderColor: '#ff9800',
                backgroundColor: '#ff9800',
                pointBorderColor: '#ff9800',
                pointBackgroundColor: 'rgba(255, 152, 0, 0.2)',
                pointRadius: 10,
                pointHoverRadius: 14,
                pointStyle: 'triangle',
                tension: 0.3
            }
        ]
    };
}

const useRegionLineChart = (onShowToast) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const getChartData = () => {
        setLoading(true);
        getUsersRegionActivityStats()
            .then((result) => {
                setChartData(convertRegionStatsToChartData(result.data));
            })
            .catch((error) => {
                onShowToast(
                    error?.response?.data?.["error-message"] || '지역별 커뮤니티 활동량 차트 데이터 조회 실패',
                    'error'
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getChartData();
    }, []);

    return {
        chartData,
        loading,
        getChartData,
    };
};

export default useRegionLineChart;
