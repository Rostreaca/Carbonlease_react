import { useEffect, useState } from 'react';
import { findAll, toggleLike } from '../../../api/campaign/campaignApi';
import campaignStore from '../../../store/campaignStore';

const useCampaignList = (onShowToast, auth) => {
    const [loading, setLoading] = useState(true);
    const [campaigns, setCampaigns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });

    // mount 시 무조건 1회 실행 (최신 데이터 보장)
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

                    // 각 캠페인에 저장된 좋아요 상태 반영
                    const updatedCampaigns = campaigns.map(campaign => {
                        const storedLike = campaignStore.getLike(campaign.campaignNo);
                        return {
                            ...campaign,
                            isLiked: storedLike !== undefined ? storedLike : campaign.isLiked
                        };
                    });

                    // 상태 업데이트
                    setCampaigns([...updatedCampaigns]);
                    // pageInfo 구조를 Pagination에서 기대하는 형태로 변환
                    setPageInfo({
                        startPage: pageInfo.startPage,
                        endPage: pageInfo.endPage,
                        totalPage: pageInfo.maxPage
                    });
                } else {
                    onShowToast('캠페인 목록을 불러오지 못했습니다.', 'error');
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

    // 캠페인 좋아요 토글
    const handleLikeToggle = (e, campaignNo, currentLikeStatus) => {

        e.stopPropagation();

        // 인증 여부 확인
        if (!auth.isAuthenticated) {
            onShowToast('로그인이 필요합니다.', 'error');
            return;
        }
        
        // 좋아요 상태 토글
        toggleLike(campaignNo)
            .then((result) => {
                if (result && result.status === 200) {
                    
                    // 좋아요 상태 토글 성공
                    const newLikeStatus = !currentLikeStatus;

                    // 좋아요 상태 저장
                    campaignStore.setLike(campaignNo, newLikeStatus);

                    // 캠페인 목록에서 좋아요 상태 업데이트
                    setCampaigns(prevCampaigns =>
                        prevCampaigns.map(campaign =>
                            campaign.campaignNo === campaignNo
                                ? { ...campaign, isLiked: newLikeStatus }
                                : campaign
                        )
                    );

                    // 토스트 메시지 표시
                    if (!currentLikeStatus) {
                        onShowToast('이 캠페인에 공감해주셨어요!');
                    } else {
                        onShowToast('참여를 취소했어요. 언제든 다시 함께해주세요!');
                    }
                }
            })
            .catch((error) => {
                onShowToast(
                    error?.response?.data?.["error-message"] || '좋아요 처리에 실패했습니다.',
                    'error'
                );
            });
    };
    

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
