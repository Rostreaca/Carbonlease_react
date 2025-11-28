import { useEffect, useState } from "react";
import { fetchActivityDetail, increaseViewCountAPI } from "../../../../api/activity/activityAPI";
import activityStore from "../../../../store/activityStore";


export default function useDetail(id, accessToken, setIsLiked, setLikeCount) {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const loadDetail = async () => {
        try {
            const res = await fetchActivityDetail(id, accessToken);
            const data = res.data;

            const localLike = activityStore.getLike(id);

            setPost({
                ...data,
                isLiked: localLike ?? data.isLiked
            });

            setIsLiked(localLike ?? data.isLiked);
            setLikeCount(data.likeCount);
        } catch (err) {
            console.error("Detail 조회 실패", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDetail();
        increaseViewCountAPI(id);
    }, [id]);

    return { post, loading, loadDetail };
}