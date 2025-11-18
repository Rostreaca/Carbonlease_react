// src/store/campaignStore.js
const STORAGE_KEY = 'campaign_likes';

const campaignStore = {

    // localStorage에서 초기 데이터 로드
    likes: JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'),
    
    // 좋아요 상태 가져오기
    getLike(campaignNo) {
        return this.likes[campaignNo];
    },
    
    // 좋아요 상태 설정 (localStorage에도 저장)
    setLike(campaignNo, isLiked) {
        this.likes[campaignNo] = isLiked;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.likes));
    },
    
    // 좋아요 토글
    toggleLike(campaignNo) {
        this.likes[campaignNo] = !this.likes[campaignNo];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.likes));
        return this.likes[campaignNo];
    },
    
    // 초기화 (로그아웃 시 사용)
    clear() {
        this.likes = {};
        localStorage.removeItem(STORAGE_KEY);
    }
    
};

export default campaignStore;