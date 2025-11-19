import { CampaignGrid } from './CampaignList.styled';
import {
    SkeletonCard,
    SkeletonCategory,
    SkeletonContent,
    SkeletonDescription,
    SkeletonImage,
    SkeletonInfo,
    SkeletonInfoItem,
    SkeletonTitle
} from './CampaignSkeleton.styled';

const CampaignSkeleton = ({ viewCount = 6 }) => {
    return (
        <CampaignGrid>
            {Array.from({ length: viewCount }).map((_, idx) => (
                <SkeletonCard key={idx}>
                    <SkeletonImage />
                    <SkeletonContent>
                        <SkeletonCategory />
                        <SkeletonTitle />
                        <SkeletonDescription />
                        <SkeletonDescription />
                        <SkeletonInfo>
                            <SkeletonInfoItem />
                            <SkeletonInfoItem />
                        </SkeletonInfo>
                    </SkeletonContent>
                </SkeletonCard>
            ))}
        </CampaignGrid>
    );
};

export default CampaignSkeleton;
