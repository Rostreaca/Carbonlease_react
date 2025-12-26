import { useEffect, useState } from 'react';
import { findAll, toggleLike } from '../../../api/campaign/campaignApi';
import { useLikeToggle } from '../../../hooks/useLikeToggle.js';
import { useLikeStore } from '../../../store/likeStore.jsx';

const useCampaignList = (onShowToast, auth) => {
    const { likeState, updateLike } = useLikeStore();
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });

    // mount 시 무조건 1회 실행_최신 데이터 보장
    useEffect(() => {
        getCampaigns(currentPage);
    }, [currentPage]);

    // 캠페인 목록 불러오기
    const getCampaigns = async (page) => {
        setLoading(true);

        try {
            const result = await findAll(page, auth?.memberNo);
            if (result.status === 200) {
                // [D:20251223] 응답 구조 변경 대응
                const { campaigns, pageInfo } = result.data.data;
                // 상태 업데이트 (전역 상태에 바로 저장)
                setCampaigns([...campaigns]);
                // 페이지 정보 업데이트
                setPageInfo({
                    startPage: pageInfo.startPage,
                    endPage: pageInfo.endPage,
                    totalPage: pageInfo.maxPage
                });

            }
        } catch (error) {
            onShowToast(
                error?.response?.data?.message || '캠페인 목록을 불러오지 못했습니다.',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    // 공통 좋아요 토글 훅 사용
    const handleLikeToggle = useLikeToggle({ onShowToast, auth, updateLike, toggleLikeApi: toggleLike });


    // campaigns 값 변경 시 로그
    useEffect(() => {
        if (campaigns) {
            console.log('목록 campaigns:', campaigns);
        }
    }, [campaigns]);

    return {
        campaigns,
        currentPage,
        setCurrentPage,
        loading,
        pageInfo,
        handleLikeToggle,
    };
};

export default useCampaignList;