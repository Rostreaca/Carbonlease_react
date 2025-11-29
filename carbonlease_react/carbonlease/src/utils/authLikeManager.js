import activityStore from "../store/activityStore";

const authLikeManager = {
  onLogin(memberId) {
    if (!memberId) return;
    activityStore.init(memberId);
  },

  onLogout(memberId) {
  },

  onAutoLogin(memberId) {
    if (!memberId) return;
    activityStore.init(memberId);
  }
};

export default authLikeManager;
