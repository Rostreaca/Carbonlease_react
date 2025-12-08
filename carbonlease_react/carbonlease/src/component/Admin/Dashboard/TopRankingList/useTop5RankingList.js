import { useEffect, useState } from 'react';
import { getAllCountTop5 } from '../../../../api/dashboard/adminDashBoard';

function convertTop5StatsToList(stats) {
    // API 응답이 대문자 키로 올 경우 소문자 별칭으로 변환
    return stats.map(item => ({
        title: item.title || item.TITLE,
        views: item.views || item.VIEWS,
        boardType: item.boardType || item.BOARDTYPE,
    }));
}

const useTop5RankingList = (onShowToast) => {
    const [top5List, setTop5List] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTop5List = () => {
        setLoading(true);
        getAllCountTop5()
            .then((result) => {
                setTop5List(convertTop5StatsToList(result.data));
            })
            .catch((error) => {
                onShowToast(
                    error?.response?.data?.["error-message"] || '상위 5개 목록을 불러오지 못했습니다.',
                    'error'
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        getTop5List();
    }, []);

    return {
        top5List,
        loading,
        getTop5List,
    };
};

export default useTop5RankingList;