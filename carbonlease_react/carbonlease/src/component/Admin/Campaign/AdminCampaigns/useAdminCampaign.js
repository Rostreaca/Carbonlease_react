import { useEffect, useState } from 'react';
import { deleteById, findAll } from '../../../../api/campaign/adminCampaignApi';

// 어드민 캠페인 목록/페이지네이션 관리 커스텀 훅
const useAdminCampaign = (onShowToast) => {
	const [loading, setLoading] = useState(true);
    const [campaigns, setCampaigns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });

    // 페이지 변경 시 항상 실행
    useEffect(() => {
        getCampaigns(currentPage);
        // eslint-disable-next-line
    }, [currentPage]);

    // 캠페인 목록 불러오기
    const getCampaigns = (page) => {
        
        // 캠페인 목록 불러오기 시작
        setLoading(true);

        // 캠페인 목록 API 호출
        findAll(page)
            .then((result) => {
                if (result && result.status === 200) {
                    // 캠페인 목록 및 페이지 정보 설정
                    const { campaigns, pageInfo } = result.data;

                    setCampaigns([...campaigns]);

                    setPageInfo({
                        startPage: pageInfo.startPage,
                        endPage: pageInfo.endPage,
                        totalPage: pageInfo.maxPage
                    });

                } 
            })
            .catch((error) => {
                onShowToast(
                    error?.response?.data?.["error-message"] || '캠페인 목록을 불러오지 못했습니다.',
                    'error'
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // 삭제 함수 추가
    const deleteCampaign = (id, callback) => {
        setLoading(true);
        deleteById(id)
            .then((result) => {
                if (result && result.status === 200) {
                    getCampaigns(currentPage); // 목록 새로고침
                    onShowToast('삭제되었습니다!', 'success');
                    if (callback) callback();
                } 
            })
            .catch((error) => {
                onShowToast(
                    error?.response?.data?.["error-message"] || '삭제에 실패했습니다.',
                    'error'
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return {
        campaigns,
        currentPage,
        setCurrentPage,
        loading,
        pageInfo,
        deleteCampaign,
    };
};

export default useAdminCampaign;
