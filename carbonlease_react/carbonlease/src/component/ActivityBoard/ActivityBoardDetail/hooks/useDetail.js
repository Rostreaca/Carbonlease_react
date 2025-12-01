import { useEffect, useState } from "react";
import { fetchActivityDetail, increaseViewCountAPI } from "../../../../api/activity/activityAPI";
import activityStore from "../../../../store/activityStore";

export default function useDetail(activityNo, memberId) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadDetail = async () => {
    try {
      const result = await fetchActivityDetail(activityNo, memberId);
      const data = result.data;

      const storedLike = activityStore.getLike(activityNo);
        if (storedLike !== undefined) {
            data.isLiked = storedLike;
        }

      setPost(data);
    } catch (error) {
      console.error("Detail 조회 실패", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
    increaseViewCountAPI(activityNo);
  }, [activityNo, memberId]);

  return { post, loading };
}

