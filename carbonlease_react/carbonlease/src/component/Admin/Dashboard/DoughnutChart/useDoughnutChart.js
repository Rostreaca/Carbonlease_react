import { useEffect, useState } from 'react';
import { getUsersAllBoardsCount } from '../../../../api/dashboard/adminDashBoard';

function convertStatsToChartData(stats) {
    return stats.map(item => {
        const labels = [];
        const data = [];
        const backgroundColor = [];

        if (item.TOTAL_CNT > 0) {
            labels.push('정상');
            data.push(item.TOTAL_CNT);
            backgroundColor.push('#9ac6a5ff');
        }
        if (item.HIDDEN_CNT > 0) {
            labels.push('숨김');
            data.push(item.HIDDEN_CNT);
            backgroundColor.push('#ff6f61');
        }
        if (item.COMMENT_CNT !== undefined && item.COMMENT_CNT !== null && item.COMMENT_CNT > 0) {
            labels.push('댓글');
            data.push(item.COMMENT_CNT);
            backgroundColor.push('#8bb0e8ff');
        }
        if (item.LIKE_CNT !== undefined && item.LIKE_CNT !== null && item.LIKE_CNT > 0) {
            labels.push('좋아요');
            data.push(item.LIKE_CNT);
            backgroundColor.push('#f6e393ff');
        }

        let title = item.BOARD_TYPE;
        if (title) {
            title = title.charAt(0).toUpperCase() + title.slice(1);
        }

        return {
            title,
            data: {
                labels,
                datasets: [
                    {
                        data,
                        backgroundColor,
                        borderWidth: 0
                    }
                ]
            }
        };
    });
}

const useDoughnutChart = (onShowToast) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getChartData = () => {
        setLoading(true);
        getUsersAllBoardsCount()
            .then((result) => {
                const stats = result.data;
                setChartData(convertStatsToChartData(stats));
            })
            .catch((error) => {
                onShowToast(
                    error?.response?.data?.["error-message"] || '도넛 차트 데이터 조회 실패',
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

export default useDoughnutChart;
