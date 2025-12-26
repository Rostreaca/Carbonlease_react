// 캠페인 좋아요 토글 공통 핸들러 (공통 hooks로 이동)
import { useContext, useEffect } from 'react';
import { toggleLike } from '../api/campaign/campaignApi';
import { AuthContext } from '../component/Context/AuthContext';
import { useLikeStore } from '../store/likeStore.jsx';

/**
 * @param {Function} params.updateLike - Context에서 상태 업데이트 함수 (updateLikeInList 또는 updateLikeInDetail)
 */
export function useLikeToggle({ onShowToast, auth, updateLike }) {
    const { resetLikeState } = useLikeStore();
    const { auth: globalAuth } = useContext(AuthContext);

    // 유저가 변경될 때마다 초기화
    useEffect(() => {
        resetLikeState();
    }, [globalAuth?.memberId]);

    return async function handleLikeToggle(e, campaignNo) {
        e.stopPropagation();

        if (!auth.isAuthenticated) {
            onShowToast('로그인이 필요합니다.', 'error');
            return;
        }

        try {
            const res = await toggleLike(campaignNo);
            if (res && res.status === 200) {
                const isLiked = res.data.data.isLiked;
                updateLike(campaignNo, isLiked);
                setTimeout(() => {
                    if (isLiked) {
                        onShowToast('이 캠페인에 공감해주셨어요!');
                    } else {
                        onShowToast('참여를 취소했어요. 언제든 다시 함께해주세요!');
                    }
                }, 0);
            }
        } catch (error) {
            onShowToast(
                error?.response?.data?.message || '좋아요 처리에 실패했습니다.',
                'error'
            );
        }
    }
}
