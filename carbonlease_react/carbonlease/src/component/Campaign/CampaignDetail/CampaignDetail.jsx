import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import Loading from '../../Common/Loading/Loading';
import PageContent from '../../Common/PageContent/PageContent';
import Toast from '../../Common/Toast/Toast';
import { AuthContext } from '../../Context/AuthContext';
import CampaignActions from './components/CampaignActions';
import CampaignContent from './components/CampaignContent';
import { BackButton, CampaignDetailContainer, ErrorContainer } from './components/CampaignDetail.styled';
import CampaignHeader from './components/CampaignHeader';
import CampaignImage from './components/CampaignImage';
import CampaignMeta from './components/CampaignMeta';
import useCampaignDetail from './useCampaignDetail';
import CommentBox from '../../Common/Comments/CommentBox';
import { deleteReply, getReplies, insertReply, updateReply } from '../../../api/campaign/campaignApi';

const CampaignDetail = () => {
    const navigate = useNavigate();

    // Toast 상태 관리
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');
    
    // 캠페인 ID 가져오기
    const { id } = useParams();

    // 인증 정보 가져오기
    const { auth } = useContext(AuthContext);

    // 캠페인 컴포넌트 배열
    const campaignComponents = [
        CampaignHeader,
        CampaignImage,
        CampaignContent,
        CampaignMeta,
    ];

    // 토스트 메시지 표시
    const handleShowToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

    // 토스트 메시지 닫기
    const handleCloseToast = () => {
        setShowToast(false);
    };

    // 캠페인 상세 정보 훅 사용
    const {
        campaign,
        loading,
        error,
        handleLikeToggle,
    } = useCampaignDetail(id, handleShowToast, auth);

    

    // 목록으로 돌아가기 (변경된 캠페인 데이터 함께 전달(좋아요 상태 등))
    const handleBack = () => {
        navigate('/campaigns', { state: { updatedCampaign: campaign } });
    };

    // 댓글 매핑 및 API 래퍼 함수 정의
    const campaignCommentMap = {
        id: "replyNo",
        writer: "writer",
        content: "replyContent",
        date: "enrollDate"
    };

    // 로딩 상태
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

    // 에러 상태 또는 캠페인 데이터 없음
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
                    {campaignComponents.map((Component, idx) =>
                        Component === CampaignMeta
                            ? <Component key={idx} campaign={campaign} auth={auth} />
                            : <Component key={idx} campaign={campaign} />
                    )}

                    <CommentBox
                        boardId={id}
                        auth={auth}
                        fetchAPI={getReplies}
                        insertAPI={insertReply}
                        updateAPI={updateReply}
                        deleteAPI={deleteReply}
                        mapping={campaignCommentMap}
                    />
                    <CampaignActions
                        campaign={campaign}
                        auth={auth}
                        handleBack={handleBack}
                        handleLikeToggle={handleLikeToggle}
                        onShowToast={handleShowToast}
                /* ---------------------------------------------
                [D: 20251129]                             
                좋아요 상태 연동을 위해 추가된 props      
                ---------------------------------------------- */
                        isLiked={campaign.isLiked}
                        likeCount={campaign.likeCount}
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