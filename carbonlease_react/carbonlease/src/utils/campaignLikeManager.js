import campaignStore from "../store/campaignStore";

const campaignLikeManager = {
  onLogin(memberId) {
    if (!memberId) return;
    campaignStore.init(memberId);
  },

  onLogout(memberId) {
  },

  onAutoLogin(memberId) {
    if (!memberId) return;
    campaignStore.init(memberId);
  }
};

export default campaignLikeManager;
