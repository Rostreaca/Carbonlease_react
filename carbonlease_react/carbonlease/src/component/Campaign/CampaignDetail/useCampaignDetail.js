import { useEffect, useState } from 'react';
import { findDetailByNo, toggleLike } from '../../../api/campaign/campaignApi';
import { useLikeToggle } from '../../../hooks/useLikeToggle.js';
import { useLikeStore } from '../../../store/likeStore.jsx';

const useCampaignDetail = (id, onShowToast, auth) => {
    // ===== 전역 좋아요 상태 =====
    const { likeState, updateLike } = useLikeStore();

    // ===== 로컬 상태 =====
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // ===== campaign 값 변경 시 로그 =====
    useEffect(() => {
        if (campaign) {
            console.log('상세 campaign:', campaign);
        }
    }, [campaign]);

    // ===== 캠페인 ID 변경 시 상세 정보 다시 불러오기 =====
    useEffect(() => {
        if (!id) {
            setError(true);
            setLoading(false);
            return;
        }
        fetchCampaignDetail(id);
    }, [id]);
    
    // ===== 캠페인 상세 정보 불러오기 =====
    const fetchCampaignDetail = async (campaignNo) => {
        setLoading(true);
        setError(false);
        try {
            const res = await findDetailByNo(campaignNo, auth?.memberNo);
            if (res.status === 200) {
                const campaignData = res.data.data;
                setCampaign({ ...campaignData });
                setLoading(false);
            }
        } catch (error) {
            setError(true);
            setLoading(false);
            onShowToast(
                error?.response?.data?.message || "캠페인 정보를 불러오지 못했습니다.",
                "error"
            );
        }
    };

    // ===== 공통 좋아요 토글 =====
    const handleLikeToggle = useLikeToggle({ onShowToast, auth, updateLike, toggleLikeApi: toggleLike });

    // ===== 반환 객체 =====
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