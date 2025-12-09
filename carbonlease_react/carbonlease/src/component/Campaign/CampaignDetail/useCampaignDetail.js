import { useEffect, useState } from 'react';
import { findDetailByNo, toggleLike } from '../../../api/campaign/campaignApi';
import campaignStore from '../../../store/campaignStore';

const useCampaignDetail = (id, onShowToast, auth) => {
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  

    // 캠페인 ID 변경 시 상세 정보 다시 불러오기
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
        findDetailByNo(campaignNo)
            .then((result) => {
                if (result.status === 200) {
                    const campaignData = result.data;
                    const storedLike = campaignStore.getLike(campaignNo);
                    setCampaign({
                        ...campaignData,
                        isLiked: storedLike !== undefined ? storedLike : campaignData.isLiked
                    });
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError(true);
                setLoading(false);
                onShowToast(
                    error?.response?.data?.["error-message"] || "캠페인 정보를 불러오지 못했습니다.",
                    "error"
                );
            });
    };

    // 캠페인 좋아요 토글
    const handleLikeToggle = (e, campaignNo, currentLikeStatus) => {
        e.stopPropagation();

        if (!auth.isAuthenticated) {
            onShowToast('로그인이 필요합니다.', 'error');
            return;
        }

        const newLikeStatus = !currentLikeStatus;

        toggleLike(campaignNo)
            .then((result) => {
                if (result.status === 200) {
                    campaignStore.setLike(campaignNo, newLikeStatus);
                    setCampaign(prev =>
                        prev ? { ...prev, isLiked: newLikeStatus } : prev
                    );
                    if (newLikeStatus) {
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
        campaign,
        loading,
        error,
        fetchCampaignDetail,
        setCampaign,
        handleLikeToggle,
    };
};

export default useCampaignDetail;
