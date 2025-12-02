import { CampaignDetailHeader, CategoryBadge, Title } from './CampaignDetail.styled.js';

// 캠페인 상세 헤더 컴포넌트
const CampaignHeader = ({ campaign }) => (
    <CampaignDetailHeader>
        <Title>{campaign.campaignTitle}</Title>
        <CategoryBadge>{campaign.category?.categoryName || '카테고리 없음'}</CategoryBadge>
    </CampaignDetailHeader>
);

export default CampaignHeader;
