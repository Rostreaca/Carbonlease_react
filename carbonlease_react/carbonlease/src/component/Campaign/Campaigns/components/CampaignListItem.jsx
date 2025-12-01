import LikeButton from '../../../Common/LikeButton/LikeButton';
import { CampaignCard, CampaignCategory, CampaignContent, CampaignDate, CampaignDescription, CampaignImage, CampaignInfo, CampaignTitle, ParticipantCount } from './CampaignList.styled';

// 날짜 형식 변환 함수
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}.${date.getDate()}`;
};

// 캠페인 리스트 아이템 컴포넌트
const CampaignListItem = ({ campaign, auth, onLikeToggle, onCardClick }) => {
    
    // 목록에서 썸네일 이미지
    const thumbnail = campaign.attachments?.find(att => att.fileLevel === 0);

    return (
        <CampaignCard key={campaign.campaignNo} onClick={() => onCardClick(campaign)}>
            <CampaignImage>
                <img src={thumbnail?.filePath} alt={campaign.campaignTitle} />
                {auth.isAuthenticated && (
                    <LikeButton
                        $liked={campaign.isLiked}
                        onClick={(e) => onLikeToggle(e, campaign.campaignNo, campaign.isLiked)}
                        disabled={!auth.isAuthenticated}
                    >
                        <i className={campaign.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                    </LikeButton>
                )}
            </CampaignImage>
            <CampaignContent>
                <CampaignCategory>{campaign.category?.categoryName || '카테고리 없음'}</CampaignCategory>
                <CampaignTitle>{campaign.campaignTitle}</CampaignTitle>
                <CampaignDescription>{campaign.campaignContent}</CampaignDescription>
                <CampaignInfo>
                    <ParticipantCount>
                        <i className="bi bi-people-fill"></i>
                        <span>{(campaign.viewCount || 0).toLocaleString()}명 조회</span>
                    </ParticipantCount>
                    <CampaignDate>
                        <i className="bi bi-calendar-check"></i>
                        <span>{formatDate(campaign.startDate)} ~ {formatDate(campaign.endDate)}</span>
                    </CampaignDate>
                </CampaignInfo>
            </CampaignContent>
        </CampaignCard>
    );
};

export default CampaignListItem;
