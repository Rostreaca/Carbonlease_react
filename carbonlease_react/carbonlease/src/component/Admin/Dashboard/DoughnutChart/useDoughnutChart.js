import { useEffect, useState } from 'react';
import { getUsersAllBoardsCount } from '../../../../api/dashboard/adminDashBoard';

function convertStatsToChartData(stats) {
    return stats.map(item => {
        const labels = [];
        const data = [];
        const backgroundColor = [];

        if (item.totalCount > 0) {
            labels.push('정상');
            data.push(item.totalCount);
            backgroundColor.push('#9ac6a5ff');
        }
        if (item.hiddenCount > 0) {
            labels.push('숨김');
            data.push(item.hiddenCount);
            backgroundColor.push('#ff6f61');
        }
        if (item.commentCount !== undefined && item.commentCount !== null && item.commentCount > 0) {
            labels.push('댓글');
            data.push(item.commentCount);
            backgroundColor.push('#8bb0e8ff');
        }
        if (item.likeCount !== undefined && item.likeCount !== null && item.likeCount > 0) {
            labels.push('좋아요');
            data.push(item.likeCount);
            backgroundColor.push('#f6e393ff');
        }

        let title = item.BOARDTYPE;
        
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
                //alert(JSON.stringify(result.data, null, 2)); // 응답 구조 확인
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
