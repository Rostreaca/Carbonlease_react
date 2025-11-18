import { useState, useEffect } from 'react';
import { selectByCampaignNo, toggleLike } from '../../../api/campaign/campaignApi';
import campaignStore from '../../../store/campaignStore';

export function useCampaignDetail(id, onShowToast, auth) {
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) {
            setError(true);
            setLoading(false);
            return;
        }
        fetchCampaignDetail(id);
    }, [id]);

    // 캠페인 상세 정보 불러오기
    const fetchCampaignDetail = (campaignNo) => {
        setLoading(true);
        setError(false);
        selectByCampaignNo(campaignNo)
            .then(response => {
                const campaignData = response.data;
                const storedLike = campaignStore.getLike(campaignNo);
                setCampaign({
                    ...campaignData,
                    isLiked: storedLike !== undefined ? storedLike : campaignData.isLiked
                });
                setLoading(false);
            })
            .catch(() => {
                setError(true);
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
                setCampaign(prevCampaign =>
                    prevCampaign ? { ...prevCampaign, isLiked: newLikeStatus } : prevCampaign
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
        campaign,
        loading,
        error,
        fetchCampaignDetail,
        handleLikeToggle,
        setCampaign,
    };
}
