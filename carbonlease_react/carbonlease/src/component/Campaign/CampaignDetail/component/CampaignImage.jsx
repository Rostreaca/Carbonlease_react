import React from 'react';
import { ImageWrapper } from '../CampaignDetail.styled';

// 캠페인 이미지 컴포넌트
const CampaignImage = ({ campaign }) => (
    <ImageWrapper>
        <img src={`${campaign.filePath}/${campaign.changeName}`} alt={campaign.campaignTitle} />
    </ImageWrapper>
);

export default CampaignImage;
