import { MetaInfo, MetaItem } from '../CampaignDetail.styled';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

// 캠페인 메타 정보 컴포넌트
const CampaignMeta = ({ campaign }) => (
    <MetaInfo>
        <MetaItem>
            <i className="bi bi-calendar-check"></i>
            <span>
                {formatDate(campaign.startDate)} ~ {formatDate(campaign.endDate)}
            </span>
        </MetaItem>
        <MetaItem>
            <i className="bi bi-people-fill"></i>
            <strong>{(campaign.viewCount || 0).toLocaleString()}명</strong> 조회
        </MetaItem>
        <MetaItem>
            <i className="bi bi-heart-fill"></i>
            <span>{campaign.isLiked ? '공감함' : '공감하기'}</span>
        </MetaItem>
    </MetaInfo>
);

export default CampaignMeta;
