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
                if (result && result.status === 200) {

                    const campaignData = result.data;
                    const storedLike = campaignStore.getLike(campaignNo);

                    setCampaign({
                        ...campaignData,
                        isLiked: storedLike !== undefined ? storedLike : campaignData.isLiked
                    });
                    setLoading(false);
                } else {
                    setError(true);
                    setLoading(false);
                    onShowToast && onShowToast("알 수 없는 오류가 발생했습니다.", "error");
                }
            })
            .catch((error) => {
                setError(true);
                setLoading(false);
                onShowToast && onShowToast(
                    error?.response?.data?.["error-message"] || "캠페인 정보를 불러오지 못했습니다.",
                    "error"
                );
            });
    };

    // 캠페인 좋아요 토글
    const handleLikeToggle = (e, campaignNo, currentLikeStatus) => {
        e.stopPropagation();

        if (!auth.isAuthenticated) {
            onShowToast && onShowToast('로그인이 필요합니다.', 'error');
            return;
        }

        toggleLike(campaignNo)
            .then((result) => {
                if (result && result.status === 200) {
                    const newLikeStatus = !currentLikeStatus;
                    campaignStore.setLike(campaignNo, newLikeStatus);
                    setCampaign(prevCampaign =>
                        prevCampaign ? { ...prevCampaign, isLiked: newLikeStatus } : prevCampaign
                    );
                    if (!currentLikeStatus) {
                        onShowToast && onShowToast('이 캠페인에 공감해주셨어요!');
                    } else {
                        onShowToast && onShowToast('참여를 취소했어요. 언제든 다시 함께해주세요!');
                    }
                } else {
                    onShowToast && onShowToast('좋아요 처리에 실패했습니다.', 'error');
                }
            })
            .catch((error) => {
                onShowToast && onShowToast(
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
