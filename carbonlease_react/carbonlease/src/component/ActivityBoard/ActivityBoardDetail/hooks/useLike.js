import { useState } from "react";
import activityStore from "../../../../store/activityStore";
import { toggleLike } from "../../../../api/activity/activityAPI";


export default function useLike(initialLiked, initialCount, activityNo, showToastMessage){
    const [isLiked, setIsLiked] = useState(initialLiked);
    const [likeCount, setLikeCount] = useState(initialCount);

     const handleToggleLike = async (accessToken) => {
    if (!accessToken) {
      showToastMessage("로그인 후 이용 가능합니다.", "error");
      return;
    }

    try {
      await toggleLike(activityNo);

      const newLikeStatus = !isLiked;

      activityStore.setLike(activityNo, newLikeStatus);

      setIsLiked(newLikeStatus);
      setLikeCount((prev) => (newLikeStatus ? prev + 1 : prev - 1));

      showToastMessage(
        newLikeStatus ? "이 활동에 공감해주셨어요!" : "공감을 취소했어요."
      );

    } catch (err) {
      showToastMessage("좋아요 처리 중 오류가 발생했습니다.", "error");
      console.error(err);
    }
  };

  return {
    isLiked,
    likeCount,
    handleToggleLike,
    setIsLiked,
    setLikeCount
  };
}
