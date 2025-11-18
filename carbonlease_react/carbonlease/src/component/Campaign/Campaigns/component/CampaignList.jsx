import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../Common/Pagination/Pagination';
import CampaignSkeleton from './CampaignSkeleton';
import CampaignListItem from './CampaignListItem';
import { CampaignGrid, CampaignListContainer } from './CampaignList.styled';
import { useCampaignList } from '../useCampaignList';

    const CampaignList = ({ onShowToast }) => {
        const navigate = useNavigate();
        const { auth } = useContext(AuthContext);
        const {
            campaigns,
            currentPage,
            setCurrentPage,
            totalPages,
            loading,
            pageInfo,
            handleLikeToggle,
        } = useCampaignList(onShowToast, auth);

        const handleCardClick = (campaign) => {
            navigate(`/campaigns/detail/${campaign.campaignNo}`, { state: campaign });
        };

        if (loading) {
            return (
                <CampaignListContainer>
                    <CampaignSkeleton count={6} />
                </CampaignListContainer>
            );
        }

        if (!campaigns || campaigns.length === 0) {
            return null;
        }

        return (
            <CampaignListContainer>
                <CampaignGrid>
                    {campaigns.map((campaign) => (
                        <CampaignListItem
                            key={campaign.campaignNo}
                            campaign={campaign}
                            auth={auth}
                            onLikeToggle={handleLikeToggle}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </CampaignGrid>
                {campaigns.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        pageInfo={pageInfo}
                    />
                )}
            </CampaignListContainer>
        );
    };

    export default CampaignList;
        
