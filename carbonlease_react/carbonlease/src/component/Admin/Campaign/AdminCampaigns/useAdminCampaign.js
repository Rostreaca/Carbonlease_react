    
import { useEffect, useState } from 'react';
import { hideById, restoreById, deleteById, findAll } from '../../../../api/campaign/adminCampaignApi';


// 내부에서 currentPage, status, keyword를 useState로 관리
const useAdminCampaign = (onShowToast) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState("");
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const [campaigns, setCampaigns] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });

    useEffect(() => {
        getCampaigns(currentPage, status, keyword);
        // eslint-disable-next-line
    }, [currentPage, status, keyword]);


    // 캠페인 목록 불러오기 (status, keyword만 백엔드 전달)
    const getCampaigns = (page, statusParam = "", keywordParam = "") => {
        setLoading(true);
        findAll(page, statusParam, keywordParam)
            .then((result) => {
                if (result && result.status === 200) {
                    const { campaigns, pageInfo } = result.data;
                    setCampaigns([...campaigns]);
                    setPageInfo({
                        startPage: pageInfo.startPage,
                        endPage: pageInfo.endPage,
                        totalPage: pageInfo.maxPage
                    });
                }
            })
            .catch((error) => {
                onShowToast(
                    error?.response?.data?.["error-message"] || '캠페인 목록을 불러오지 못했습니다.',
                    'error'
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // 숨김 함수 추가
    const hideCampaign = (id, callback) => {
        setLoading(true);
        hideById(id)
            .then((result) => {
                if (result && result.status === 200) {
                    getCampaigns(currentPage); // 목록 새로고침
                    onShowToast('숨김처리되었습니다!', 'success');
                    if (callback) callback();
                } 
            })
            .catch((error) => {
                onShowToast(
                    error?.response?.data?.["error-message"] || '숨김처리에 실패했습니다.',
                    'error'
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // 복구 함수 추가
    const restoreCampaign = (id, callback) => {
        setLoading(true);
        restoreById(id)
            .then((result) => {
                if (result && result.status === 200) {
                    getCampaigns(currentPage); // 목록 새로고침
                    onShowToast('복구되었습니다!', 'success');
                    if (callback) callback();
                }
            })
            .catch((error) => {
                onShowToast(
                    error?.response?.data?.["error-message"] || '복구에 실패했습니다.',
                    'error'
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // 완전 삭제 함수 추가
    const deleteCampaign = (id, callback) => {
        setLoading(true);
        deleteById(id)
            .then((result) => {
                if (result.status === 200 || result.status === 204) {
                    getCampaigns(currentPage); // 목록 새로고침
                    onShowToast('완전 삭제되었습니다.', 'success');
                    if (callback) callback();
                } 
            })
            .catch((error) => {
                onShowToast(
                    error?.response?.data?.["error-message"] || '삭제에 실패했습니다.',
                    'error'
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return {
        campaigns,
        currentPage,
        setCurrentPage,
        status,
        setStatus,
        keyword,
        setKeyword,
        loading,
        pageInfo,
        hideCampaign,
        restoreCampaign,
        deleteCampaign,
        getCampaigns,
    };
};

export default useAdminCampaign;
