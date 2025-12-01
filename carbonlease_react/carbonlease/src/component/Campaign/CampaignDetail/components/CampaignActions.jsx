import LikeButton from '../../../Common/LikeButton/LikeButton';
import { ActionButtons, BackButton } from './CampaignDetail.styled';


// 캠페인 상세보기 액션 버튼 컴포넌트
const CampaignActions = ({ campaign, auth, handleBack, handleLikeToggle }) => (
    <ActionButtons>
        <BackButton onClick={handleBack}>
            <i className="bi bi-list-ul"></i>
            목록보기
        </BackButton>
        {auth.isAuthenticated && (
            <LikeButton
                $liked={campaign.isLiked}
                onClick={(e) => handleLikeToggle(e, campaign.campaignNo, campaign.isLiked)}
                disabled={!auth.isAuthenticated}
                className="detail-like-btn"
            >
                <i className={campaign.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                좋아요
            </LikeButton>
        )}
    </ActionButtons>
    
);

export default CampaignActions;
