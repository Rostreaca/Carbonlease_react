import { useState, useEffect } from "react";
import { toggleLike } from "../../../../api/activity/activityAPI";
import activityStore from "../../../../store/activityStore";

export default function useLike(initialIsLiked, initialLikeCount, activityNo, toastFunc) {

  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    setIsLiked(initialIsLiked);
    setLikeCount(initialLikeCount);
  }, [initialIsLiked, initialLikeCount]);

  const handleToggleLike = async () => {
    try {
      const res = await toggleLike(activityNo);

      const liked = res.data.liked;

      setIsLiked(liked);
      setLikeCount(prev => liked ? prev + 1 : prev - 1);

      activityStore.setLike(activityNo, liked);

      toastFunc(liked ? "좋아요!" : "취소됨", "success");
    } catch (e) {
      toastFunc("로그인 후 이용가능합니다!", "error");
    }
  };

  return { isLiked, likeCount, handleToggleLike };
}
