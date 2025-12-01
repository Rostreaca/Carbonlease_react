import LikeButton from '../../../Common/LikeButton/LikeButton';
import { ActionButtons, BackButton } from './CampaignDetail.styled';


// 캠페인 상세보기 액션 버튼 컴포넌트
const CampaignActions = ({
    campaign,
    auth,
    handleBack,
    handleLikeToggle,
    isLiked,            // [D: 20251129] 좋아요 상태 직접 전달되도록 추가
}) => (
    <ActionButtons>
        <BackButton onClick={handleBack}>
            <i className="bi bi-list-ul"></i>
            목록보기
        </BackButton>

        {auth.isAuthenticated && (
            <>
                {/* ------------------------------------------------------------
                    [Before] campaign.isLiked 기반으로 직접 접근하던 기존 코드
                --------------------------------------------------------------
                <LikeButton
                    $liked={campaign.isLiked}
                    onClick={(e) =>
                        handleLikeToggle(e, campaign.campaignNo, campaign.isLiked)
                    }
                    disabled={!auth.isAuthenticated}
                    className="detail-like-btn"
                >
                    <i className={campaign.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                    좋아요
                </LikeButton>
                -------------------------------------------------------------- */}

                {/* ------------------------------------------------------------
                    [D: 20251129]
                    좋아요 상태를 store 기반으로 일관성 있게 관리하기 위한 변경
                -------------------------------------------------------------- */}
                <LikeButton
                    $liked={isLiked}
                    onClick={(e) =>
                        handleLikeToggle(e, campaign.campaignNo, isLiked)
                    }
                    disabled={!auth.isAuthenticated}
                    className="detail-like-btn"
                >
                    <i className={isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                    좋아요
                </LikeButton>
            </>
        )}
    </ActionButtons>
);

export default CampaignActions;
