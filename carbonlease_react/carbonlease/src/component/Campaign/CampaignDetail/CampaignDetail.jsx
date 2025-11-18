import { useContext, useState } from 'react';
import Toast from '../../Common/Toast/Toast';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import Loading from '../../Common/Loading/Loading';
import PageContent from '../../Common/PageContent/PageContent';
import { CampaignDetailContainer, ErrorContainer } from './CampaignDetail.styled';
import CampaignHeader from './component/CampaignHeader';
import CampaignImage from './component/CampaignImage';
import CampaignContent from './component/CampaignContent';
import CampaignMeta from './component/CampaignMeta';
import CampaignActions from './component/CampaignActions';
import { useCampaignDetail } from './useCampaignDetail';


const CampaignDetail = () => {
    const navigate = useNavigate();
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');


    const handleShowToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const {
        campaign,
        loading,
        error,
        handleLikeToggle,
    } = useCampaignDetail(id, handleShowToast, auth);

    // 목록으로 돌아가기 (변경된 캠페인 데이터 함께 전달)
    const handleBack = () => {
        navigate('/campaigns', { state: { updatedCampaign: campaign } });
    };

    if (loading) {
        return (
            <>
                <PageTitle
                    title="캠페인 상세보기"
                    breadcrumbs={[
                        { label: 'Home', path: '/' },
                        { label: '캠페인', path: '/campaigns' },
                        { label: '상세보기', current: true }
                    ]}
                />
                <PageContent>
                    <Loading message="캠페인 정보를 불러오는 중..." />
                </PageContent>
            </>
        );
    }

    if (error || !campaign) {
        return (
            <>
                <PageTitle
                    title="캠페인 상세보기"
                    breadcrumbs={[
                        { label: 'Home', path: '/' },
                        { label: '캠페인', path: '/campaigns' },
                        { label: '상세보기', current: true }
                    ]}
                />
                <PageContent>
                    <ErrorContainer>
                        <i className="bi bi-exclamation-triangle"></i>
                        <p>캠페인을 찾을 수 없습니다.</p>
                        <BackButton onClick={handleBack}>
                            <i className="bi bi-arrow-left"></i>
                            목록으로 돌아가기
                        </BackButton>
                    </ErrorContainer>
                </PageContent>
            </>
        );
    }

    return (
        <>
            <PageTitle
                title="캠페인 상세보기"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '캠페인', path: '/campaigns' },
                    { label: '상세보기', current: true }
                ]}
            />
            <PageContent>
                <CampaignDetailContainer>
                    <CampaignHeader campaign={campaign} />
                    <CampaignImage campaign={campaign} />
                    <CampaignContent campaign={campaign} />
                    <CampaignMeta campaign={campaign} />
                    <CampaignActions 
                        campaign={campaign}
                        auth={auth}
                        handleBack={handleBack}
                        handleLikeToggle={handleLikeToggle}
                        onShowToast={handleShowToast}
                    />
                </CampaignDetailContainer>
            </PageContent>
            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={handleCloseToast}
                variant={toastVariant}
            />
        </>
    );
}

export default CampaignDetail;