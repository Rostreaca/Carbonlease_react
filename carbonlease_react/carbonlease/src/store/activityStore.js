const activityStore = {
    STORAGE_KEY: 'activity_likes_',   // 기본 prefix

    likes: {},

    init(userId) {
        const key = this.STORAGE_KEY + userId;
        this.currentKey = key;
        this.likes = JSON.parse(localStorage.getItem(key) || '{}');
    },

    getLike(activityNo) {
        return this.likes[activityNo];
    },

    setLike(activityNo, isLiked) {
        this.likes[activityNo] = isLiked;
        localStorage.setItem(this.currentKey, JSON.stringify(this.likes));
    },

    toggleLike(activityNo) {
        this.likes[activityNo] = !this.likes[activityNo];
        localStorage.setItem(this.currentKey, JSON.stringify(this.likes));
        return this.likes[activityNo];
    },

    clear(userId) {
        localStorage.removeItem(this.STORAGE_KEY + userId);
        this.likes = {};
    }
};

export default activityStore;
