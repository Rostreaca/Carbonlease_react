// src/store/campaignStore.js

// 기존 코드
/*
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
*/

// ======================================================
// [D: 20251129] 멤버별 key로 저장되도록 store 개선
// - STORAGE_KEY 뒤에 memberId를 붙여 계정별로 분리 저장
// - init(memberId) 추가: 로그인 시 store 초기화
// - clear(memberId) 수정: 특정 계정의 좋아요 저장소 삭제
// ======================================================

const campaignStore = {
    STORAGE_KEY: 'campaign_likes_',

    // 현재 로그인된 유저의 좋아요 저장소
    likes: {},

    // 현재 사용 중인 localStorage key
    currentKey: null,

    // ------------------------------------------
    // [D: 20251129] 로그인/자동로그인 시 호출
    // 해당 memberId 기준으로 좋아요 데이터 로드
    // ------------------------------------------
    init(memberId) {
        const key = this.STORAGE_KEY + memberId;
        this.currentKey = key;
        this.likes = JSON.parse(localStorage.getItem(key) || '{}');
    },

    getLike(campaignNo) {
        return this.likes[campaignNo];
    },

    setLike(campaignNo, isLiked) {
        this.likes[campaignNo] = isLiked;
        localStorage.setItem(this.currentKey, JSON.stringify(this.likes));
    },

    toggleLike(campaignNo) {
        this.likes[campaignNo] = !this.likes[campaignNo];
        localStorage.setItem(this.currentKey, JSON.stringify(this.likes));
        return this.likes[campaignNo];
    },

    // ------------------------------------------
    // [D: 20251129] 로그아웃 시 계정별 localStorage 삭제
    // ------------------------------------------
    clear(memberId) {
        localStorage.removeItem(this.STORAGE_KEY + memberId);
        this.likes = {};
    }
};

export default campaignStore;