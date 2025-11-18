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

const CampaignSkeleton = ({ count = 6 }) => {
    return (
        <CampaignGrid>
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard key={index}>
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
