import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toggleCampaignLike } from '../../../api/campaign/campaignApi';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import Loading from '../../Common/Loading/Loading';
import PageContent from '../../Common/PageContent/PageContent';
import Toast from '../../Common/Toast/Toast';
import {
    ActionButtons,
    BackButton,
    CampaignDetailContainer,
    CategoryBadge,
    Content,
    ErrorContainer,
    ImageWrapper,
    LikeButton,
    MetaInfo,
    MetaItem,
    Title
} from './CampaignDetail.styled';

const CampaignDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');

    useEffect(() => {
        fetchCampaignDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchCampaignDetail = () => {
        setLoading(true);
        setError(false);
        
        // TODO: 추후 Spring Boot API 연동
        // 임시 더미 데이터
        setTimeout(() => {
            const dummyData = {
                id: id,
                title: '친환경 캠페인 - 지구를 지키는 작은 실천',
                category: '환경보호',
                content: `
                    <h3>캠페인 소개</h3>
                    <p>우리의 작은 실천이 지구를 살립니다. 일회용품 사용을 줄이고, 재활용을 생활화하며, 에너지 절약을 실천해보세요.</p>
                    
                    <h3>참여 방법</h3>
                    <ul>
                        <li>텀블러 사용하기</li>
                        <li>장바구니 챙기기</li>
                        <li>분리수거 철저히 하기</li>
                        <li>불필요한 전등 끄기</li>
                    </ul>
                    
                    <h3>기대 효과</h3>
                    <p>여러분의 참여로 연간 약 1,000톤의 탄소 배출을 줄일 수 있습니다.</p>
                `,
                startDate: '2024-01-15',
                endDate: '2024-12-31',
                participantCount: 1234,
                isLiked: false,
                detailImageUrl: 'https://via.placeholder.com/800x400?text=Campaign+Detail+Image'
            };
            
            setCampaign(dummyData);
            setLoading(false);
        }, 500);
        
        // getCampaignDetail(id)
        //     .then(data => {
        //         setCampaign(data);
        //     })
        //     .catch(error => {
        //         console.error('캠페인 상세 조회 실패:', error);
        //         setError(true);
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });
    };

    const handleLikeToggle = () => {
        if (!campaign) return;

        const prevLikeStatus = campaign.isLiked;

        // Optimistic Update
        setCampaign(prev => ({
            ...prev,
            isLiked: !prev.isLiked,
            participantCount: prev.isLiked
                ? prev.participantCount - 1
                : prev.participantCount + 1
        }));

        // 토스트 메시지
        if (!prevLikeStatus) {
            showToastMessage('이 캠페인에 공감해주셨어요!', 'success');
        } else {
            showToastMessage('참여를 취소했어요. 언제든 다시 함께해주세요!', 'success');
        }

        // API 호출
        toggleCampaignLike(id)
            .then(() => {
                // 성공 시 추가 작업 (필요시)
            })
            .catch(error => {
                console.error('좋아요 처리 실패:', error);
                // 실패 시 원래 상태로 복구
                setCampaign(prev => ({
                    ...prev,
                    isLiked: prevLikeStatus,
                    participantCount: prevLikeStatus
                        ? prev.participantCount + 1
                        : prev.participantCount - 1
                }));
                showToastMessage('좋아요 처리에 실패했습니다.', 'error');
            });
    };

    const showToastMessage = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

    const handleBack = () => {
        navigate('/campaigns');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
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

    return(
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
                    <CategoryBadge>{campaign.category}</CategoryBadge>
                    <Title>{campaign.title}</Title>
                    
                    <MetaInfo>
                        <MetaItem>
                            <i className="bi bi-calendar-check"></i>
                            <span>
                                {formatDate(campaign.startDate)} ~ {formatDate(campaign.endDate)}
                            </span>
                        </MetaItem>
                        <MetaItem>
                            <i className="bi bi-people-fill"></i>
                            <strong>{campaign.participantCount.toLocaleString()}명</strong> 참여
                        </MetaItem>
                        <MetaItem>
                            <i className="bi bi-heart-fill"></i>
                            <span>{campaign.isLiked ? '공감함' : '공감하기'}</span>
                        </MetaItem>
                    </MetaInfo>

                    {campaign.detailImageUrl && (
                        <ImageWrapper>
                            <img src={campaign.detailImageUrl} alt={campaign.title} />
                        </ImageWrapper>
                    )}

                    <Content dangerouslySetInnerHTML={{ __html: campaign.content || campaign.description }} />

                    <ActionButtons>
                        <BackButton onClick={handleBack}>
                            <i className="bi bi-list-ul"></i>
                            목록보기
                        </BackButton>
                        <LikeButton
                            $liked={campaign.isLiked}
                            onClick={handleLikeToggle}
                        >
                            <i className={campaign.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                            {campaign.isLiked ? '공감 취소' : '공감하기'}
                        </LikeButton>
                    </ActionButtons>
                </CampaignDetailContainer>
            </PageContent>

            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
                variant={toastVariant}
            />
        </>
    )
}

export default CampaignDetail;