import { useCallback, useEffect, useState } from 'react';
import { findAll, toggleLike } from '../../../api/campaign/campaignApi';
import { useLikeToggle } from '../../../hooks/useLikeToggle.js';
import { useLikeStore } from '../../../store/likeStore.jsx';

const useCampaignList = (onShowToast, auth) => {
    const { likeState, updateLike } = useLikeStore();
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);  // TOBE 초기값 false
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });
    
    // mount 시 무조건 1회 실행_최신 데이터 보장
    // 1.무한 루프 발생 2. 의존성 배열 누락
    // useEffect(() => {
    //     getCampaigns(currentPage);
    // }, [currentPage]);

    // TOBE: useCallback으로 함수 메모이제이션
    // const getCampaigns = async ({page, memberNo}) => { // TOBE: 컴포넌트 렌더링마다 새 함수 생성 -> useCallback 의존성 변경 시에만 새 함수 생성
    const getCampaigns = useCallback(async (page) => { // currentPage 숫자 받음

        setLoading(true);
        setError(null);  // TOBE: 전 에러 초기화

        try {

            // 백엔드 API 파라미터 객체 생성
            const params = {
                pageNo: page
            };
            
            // auth?.memberNo 사용
            if (auth?.memberNo) {
                params.memberNo = auth.memberNo;
            }

            const result = await findAll(params);
            if (result.status === 200) {
	             // TOBE:  응답 구조 변경 대응
                const { campaigns, pageInfo } = result.data.data;
                // TOBE: spread 연산자 불필요 (이미 배열)
                setCampaigns(campaigns);
                // setCampaigns([...campaigns]);
                setPageInfo({
                    startPage: pageInfo.startPage,
                    endPage: pageInfo.endPage,
                    totalPage: pageInfo.maxPage
                });
            }

        } catch (err) {
            setError(err);
            onShowToast(
                err?.response?.data?.message || '캠페인 목록을 불러오지 못했습니다.',
                'error'
            );
        } finally {
            setLoading(false);
        }
    }, [auth?.memberNo, onShowToast]);  // 의존성 추가

    // 페이지 변경 시 목록 불러오기
    useEffect(() => {
        getCampaigns(currentPage); // 숫자 전달
    }, [currentPage]); // urrentPage 변경 시 자동 실행(새로고침) , getCampaigns 보류

    // 공통 좋아요 토글 훅 사용
    const handleLikeToggle = useLikeToggle({
        onShowToast,
        auth,
        updateLike,
        toggleLikeApi: toggleLike
    });

    return {
        campaigns,
        currentPage,
        setCurrentPage,
        loading,
        pageInfo,
        handleLikeToggle,
    };
};

export default useCampaignList;