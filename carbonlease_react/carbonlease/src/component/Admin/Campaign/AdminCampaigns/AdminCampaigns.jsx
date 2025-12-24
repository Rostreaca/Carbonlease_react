import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../../Common/ConfirmDialog/ConfirmDialog';
import {
    CreateButton,
    PageHeader,
} from '../../../Common/DataTable/DataTable.styled';
import Loading from '../../../Common/Loading/Loading';
import Pagination from '../../../Common/Pagination/Pagination';
import Toast from '../../../Common/Toast/Toast';
import SearchFilterBox from '../../Util/StatusFilter';
import AdminCampaignList from './components/AdminCampaignList';
import useAdminCampaign from './useAdminCampaign';

const AdminCampaigns = () => {
    
    // Toast 상태 관리
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');

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

    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);  // 숨김 모달 상태
    const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);   // 복구 모달 상태
    const [selectedId, setSelectedId] = useState(null); // 선택된 캠페인 ID
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // 삭제 모달 상태


    // 캠페인 목록 훅 사용

    const {
        campaigns,
        currentPage,
        setCurrentPage,
        status,
        setStatus,
        // keyword,
        setKeyword,
        loading,
        pageInfo,
        hideCampaign,
        restoreCampaign,
        deleteCampaign,
    } = useAdminCampaign(handleShowToast);

    // 검색 입력 임시 상태
    const [tempKeyword, setTempKeyword] = useState("");


    useEffect(() => {
        setCurrentPage(1); // mount 시 무조건 1페이지로 리셋
    }, []);

    console.log('currentPage:', currentPage);
    console.log('pageInfo:', pageInfo);
    console.log('campaigns:', campaigns);
    console.log('캠페인 총 개수(전체):', pageInfo.listCount);
    console.log('캠페인 총 개수(현재 페이지):', campaigns.length);
    
    // 수정 핸들러
    const handleEdit = (campaign) => {
        navigate(`/admin/campaigns/update/${campaign.campaignNo}`, { state: campaign });
    };

    // 숨김 핸들러 (모달 오픈)
    const handleHide = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    // 숨김 모달에서 확인 클릭 시
    const confirmHide = () => {
        if (!selectedId) return;
        hideCampaign(selectedId, cancelHide);
    };

    // 숨김 모달 닫기
    const cancelHide = () => {
        setShowConfirm(false);
        setSelectedId(null);
    };

    // 복구 핸들러 (모달 오픈)
    const handleRestore = (id) => {
        setSelectedId(id);
        setShowRestoreConfirm(true);
    };

    // 복구 모달에서 확인 클릭 시
    const confirmRestore = () => {
        if (!selectedId) return;
        restoreCampaign(selectedId, () => {
            handleShowToast('복구가 완료되었습니다.', 'success');
            cancelRestore();
        });
    };

    // 복구 모달 닫기
    const cancelRestore = () => {
        setShowRestoreConfirm(false);
        setSelectedId(null);
    };

    // 삭제 핸들러 (모달 오픈)
    const handleDelete = (id) => {
        setSelectedId(id);
        setShowDeleteConfirm(true);
    };

    // 삭제 모달에서 확인 클릭 시
    const confirmDelete = () => {
        if (!selectedId) return;
        deleteCampaign(selectedId, cancelDelete);
    };

    // 삭제 모달 닫기
    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setSelectedId(null);
    };

    // 로딩 상태
    if (loading) {
        return <Loading />;
    }
    return (
        <div>
            <PageHeader
            style={{marginBottom:"20px"}}>
                <h1>캠페인 관리</h1>
                <CreateButton onClick={() => navigate('/admin/campaigns/insert')}>
                    <i className="fas fa-plus"></i>
                    등록하기
                </CreateButton>
            </PageHeader>

            {/* 검색/필터 박스 추가 */}
            <SearchFilterBox
                status={status}
                keyword={tempKeyword}
                onStatusChange={(val) => {
                    setStatus(val);
                    setCurrentPage(1);
                }}
                onKeywordChange={(e) => setTempKeyword(e.target.value)}
                onSearch={() => {
                    setKeyword(tempKeyword);
                    setCurrentPage(1);
                }}
            />

            <AdminCampaignList
                campaigns={campaigns}
                onEdit={handleEdit}
                onHide={handleHide}
                onDelete={handleDelete}
                onRestore={handleRestore}
                onShowToast={handleShowToast}
            />

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageInfo={pageInfo}
            />

            <ConfirmDialog
                show={showConfirm}
                onClose={cancelHide}
                onConfirm={confirmHide}
                title="숨김 확인"
                message="숨김처리된 캠페인은 사용자에게 노출되지 않습니다."
                confirmText="숨김"
                cancelText="취소"
                variant="danger"
                showIcon={false}
            />
            <ConfirmDialog
                show={showDeleteConfirm}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="삭제 확인"
                message="정말로 이 캠페인을 완전히 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
                confirmText="삭제"
                cancelText="취소"
                variant="danger"
                showIcon={false}
            />
            <ConfirmDialog
                show={showRestoreConfirm}
                onClose={cancelRestore}
                onConfirm={confirmRestore}
                title="복구 확인"
                message="복구된 캠페인은 사용자에게 다시 노출됩니다."
                confirmText="확인"
                cancelText="취소"
                variant="info"
                showIcon={false}
            />
            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={handleCloseToast}
                variant={toastVariant}
            />
        </div>
    );
};

export default AdminCampaigns;