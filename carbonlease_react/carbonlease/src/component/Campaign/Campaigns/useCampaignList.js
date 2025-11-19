import { useState, useEffect } from 'react';
import { selectCampaignListWithPage as selectCampaignList, toggleLike } from '../../../api/campaign/campaignApi';
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

        // 캠페인 목록 불러오기 시작
        setLoading(true);

        // 캠페인 목록 API 호출
        selectCampaignList(page)
            .then(response => {

                // 캠페인 목록 및 페이지 정보 설정
                const { campaigns, pageInfo } = response.data;

                // 각 캠페인에 저장된 좋아요 상태 반영
                const updatedCampaigns = campaigns.map(campaign => {
                    const storedLike = campaignStore.getLike(campaign.campaignNo);
                    return {
                        ...campaign,
                        isLiked: storedLike !== undefined ? storedLike : campaign.isLiked
                    };
                });

                // 상태 업데이트
                setCampaigns(updatedCampaigns);
                setTotalPages(pageInfo.maxPage);
                setPageInfo(pageInfo);
            })
            .catch(() => {
                onShowToast('캠페인 목록을 불러오지 못했습니다.', 'error');
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
            .then(() => {

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
