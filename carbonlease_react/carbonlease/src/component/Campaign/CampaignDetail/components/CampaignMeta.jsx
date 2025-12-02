import { MetaInfo, MetaItem } from './CampaignDetail.styled.js';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

// 캠페인 메타 정보 컴포넌트
const CampaignMeta = ({ campaign, auth }) => (
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
        {auth.isAuthenticated && (
            <MetaItem>
                <i className={campaign.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                <span>{campaign.isLiked ? '공감 완료' : '공감하기'}</span>
            </MetaItem>
        )}
    </MetaInfo>
);

export default CampaignMeta;
