
import { ImageWrapper } from './CampaignDetail.styled';

// 캠페인 이미지 컴포넌트
const CampaignImage = ({ campaign }) => {
    // fileLevel이 1인 상세 이미지 찾기
    const detailImage = campaign.attachments?.find(att => att.fileLevel === 1);
    return (
        <ImageWrapper>
            {detailImage ? (
                <img src={detailImage.filePath} alt={campaign.campaignTitle} />
            ) : (
                <span>상세 이미지가 없습니다.</span>
            )}
        </ImageWrapper>
    );
};

export default CampaignImage;
