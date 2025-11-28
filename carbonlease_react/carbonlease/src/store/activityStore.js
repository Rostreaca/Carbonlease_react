// src/store/campaignStore.js
const STORAGE_KEY = 'activity_likes';

const activityStore = {

    // localStorage에서 초기 데이터 로드
    likes: JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'),
    
    // 좋아요 상태 가져오기
    getLike(activityNo) {
        return this.likes[activityNo];
    },
    
    // 좋아요 상태 설정 (localStorage에도 저장)
    setLike(activityNo, isLiked) {
        this.likes[activityNo] = isLiked;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.likes));
    },
    
    // 좋아요 토글
    toggleLike(activityNo) {
        this.likes[activityNo] = !this.likes[activityNo];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.likes));
        return this.likes[activityNo];
    },
    
    // 초기화 (로그아웃 시 사용)
    clear() {
        this.likes = {};
        localStorage.removeItem(STORAGE_KEY);
    }
    
};

export default activityStore;