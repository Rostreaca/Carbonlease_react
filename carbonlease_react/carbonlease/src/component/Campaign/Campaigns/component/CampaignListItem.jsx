import React from 'react';
import { CampaignCard, CampaignImage, CampaignContent, CampaignCategory, CampaignTitle, CampaignDescription, CampaignInfo, ParticipantCount, CampaignDate } from './CampaignList.styled';
import LikeButton from '../../../Common/LikeButton/LikeButton';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}.${date.getDate()}`;
};

const CampaignListItem = ({ campaign, auth, onLikeToggle, onCardClick }) => (
    <CampaignCard key={campaign.campaignNo} onClick={() => onCardClick(campaign)}>
        <CampaignImage>
            <img src={`${campaign.filePath}/${campaign.changeName}`} alt={campaign.campaignTitle} />
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

export default CampaignListItem;
