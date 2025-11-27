import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../Common/Pagination/Pagination';
import { AuthContext } from '../../../Context/AuthContext';
import useCampaignList from '../useCampaignList';
import { CampaignGrid, CampaignListContainer } from './CampaignList.styled';
import CampaignListItem from './CampaignListItem';
import CampaignSkeleton from './CampaignSkeleton';

// 캠페인 리스트 컴포넌트
const CampaignList = ({ onShowToast }) => {

        const navigate = useNavigate();

        // 인증 정보 가져오기
        const { auth } = useContext(AuthContext);

        // 캠페인 목록 훅 사용
        const {
            campaigns,
            currentPage,
            setCurrentPage,
            loading,
            pageInfo,
            handleLikeToggle,
        } = useCampaignList(onShowToast, auth);
        

        console.log('currentPage:', currentPage);
        console.log('pageInfo:', pageInfo);
        console.log('campaigns:', campaigns);
        console.log('캠페인 총 개수(전체):', pageInfo.listCount);
        console.log('캠페인 총 개수(현재 페이지):', campaigns.length);
        
        // 캠페인 카드 클릭 핸들러
        const handleCardClick = (campaign) => {
            navigate(`/campaigns/detail/${campaign.campaignNo}`, { state: campaign });
        };

        // 로딩 중일 때 스켈레톤 표시
        if (loading) {
            return (
                <CampaignListContainer>
                    <CampaignSkeleton count={6} />
                </CampaignListContainer>
            );
        }

        // 캠페인 목록이 없을 때 null 반환
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
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageInfo={pageInfo}
                />
            </CampaignListContainer>
        );
    };

    export default CampaignList;
        
