import { Content } from '../CampaignDetail.styled';

// 캠페인 상세 내용 컴포넌트
const CampaignContent = ({ campaign }) => (
    <Content dangerouslySetInnerHTML={{ __html: campaign.campaignContent }} />
);

export default CampaignContent;
