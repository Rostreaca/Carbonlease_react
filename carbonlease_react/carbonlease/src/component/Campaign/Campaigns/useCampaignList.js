import { useState, useEffect } from 'react';
import { selectCampaignList, toggleLike } from '../../../api/campaign/campaignApi';
import campaignStore from '../../../store/campaignStore';

export function useCampaignList(onShowToast, auth) {
    const [campaigns, setCampaigns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [pageInfo, setPageInfo] = useState(null);

    useEffect(() => {
        fetchCampaigns(currentPage);
    }, [currentPage]);

    // 캠페인 목록 불러오기
    const fetchCampaigns = (page) => {
        setLoading(true);
        selectCampaignList(page, 6)
            .then(response => {
                const { campaigns, pageInfo } = response.data;
                const updatedCampaigns = campaigns.map(campaign => {
                    const storedLike = campaignStore.getLike(campaign.campaignNo);
                    return {
                        ...campaign,
                        isLiked: storedLike !== undefined ? storedLike : campaign.isLiked
                    };
                });
                setCampaigns(updatedCampaigns);
                setTotalPages(pageInfo.maxPage);
                setPageInfo(pageInfo);
            })
            .catch(() => {})
            .finally(() => {
                setLoading(false);
            });
    };

    // 캠페인 좋아요 토글
    const handleLikeToggle = (e, campaignNo, currentLikeStatus) => {
        e.stopPropagation();
        if (!auth.isAuthenticated) {
            onShowToast('로그인이 필요합니다.', 'error');
            return;
        }
        toggleLike(campaignNo)
            .then(() => {
                const newLikeStatus = !currentLikeStatus;
                campaignStore.setLike(campaignNo, newLikeStatus);
                setCampaigns(prevCampaigns =>
                    prevCampaigns.map(campaign =>
                        campaign.campaignNo === campaignNo
                            ? { ...campaign, isLiked: newLikeStatus }
                            : campaign
                    )
                );
                if (!currentLikeStatus) {
                    onShowToast('이 캠페인에 공감해주셨어요!');
                } else {
                    onShowToast('참여를 취소했어요. 언제든 다시 함께해주세요!');
                }
            })
            .catch(error => {
                onShowToast('좋아요 처리에 실패했습니다.', error);
            });
    };

    return {
        campaigns,
        currentPage,
        setCurrentPage,
        totalPages,
        loading,
        pageInfo,
        handleLikeToggle,
    };
}
