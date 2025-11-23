import { useEffect, useState } from 'react';
import { findByNo, toggleLike } from '../../../api/campaign/campaignApi';
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

        findByNo(campaignNo)
            .then(ressult => {
                if (ressult && ressult.status === 200) {
                    const campaignData = ressult.data;
                    const storedLike = campaignStore.getLike(campaignNo);
                    setCampaign({
                        ...campaignData,
                        isLiked: storedLike !== undefined ? storedLike : campaignData.isLiked
                    });
                    setLoading(false);
                } else {
                    setError(true);
                    setLoading(false);
                    onShowToast('캠페인 정보를 불러오지 못했습니다.', 'error');
                }
            })
            .catch(() => {
                setError(true);
                setLoading(false);
                onShowToast('캠페인 정보를 불러오지 못했습니다.', 'error');
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
            .then((ressult) => {
                if (ressult && ressult.status === 200) {
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
                } else {
                    onShowToast('좋아요 처리에 실패했습니다.', 'error');
                }
            })
            .catch(() => {
                onShowToast('좋아요 처리에 실패했습니다.', 'error');
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
};

export default useCampaignDetail;
