// src/store/likeStore.jsx
import { createContext, useCallback, useContext, useState } from 'react';

// 전역 좋아요 상태 관리 (entityId별)
const LikeContext = createContext();


export function LikeProvider({ children }) {
    const [likeState, setLikeState] = useState({}); // { [entityId]: { isLiked, likeCount } }

    const updateLike = useCallback((entityId, isLiked) => {
        setLikeState(prev => ({
            ...prev,
            [entityId]: {
                ...(prev[entityId] || {}),
                isLiked,
            },
        }));
    }, []);

    const setLikeCount = useCallback((entityId, likeCount) => {
        setLikeState(prev => ({
        ...prev,
        [entityId]: {
            ...(prev[entityId] || {}),
            likeCount,
        },
        }));
    }, []);

    // likeState를 외부에서 초기화할 수 있도록 함수 추가
    const resetLikeState = useCallback(() => {
        setLikeState({});
    }, []);

    const value = { likeState, setLikeCount, updateLike, resetLikeState };
    return <LikeContext.Provider value={value}>{children}</LikeContext.Provider>;
}

export function useLikeStore() {
    return useContext(LikeContext);
}