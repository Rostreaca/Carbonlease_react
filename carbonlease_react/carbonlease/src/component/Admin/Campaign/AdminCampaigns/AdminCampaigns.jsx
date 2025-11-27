import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../../Common/ConfirmDialog/ConfirmDialog';
import Pagination from '../../../Common/Pagination/Pagination';
import Toast from '../../../Common/Toast/Toast';
import useAdminCampaign from './useAdminCampaign';
import AdminCampaignList from './components/AdminCampaignList';
import {
    PageHeader,
    CreateButton,
} from '../../../Common/DataTable/DataTable.styled';

const AdminCampaigns = () => {

    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });
    const [selectedId, setSelectedId] = useState(null);

    // 캠페인 목록 훅 사용
    const {
        campaigns,
        currentPage,
        setCurrentPage,
        loading,
        pageInfo,
    } = useAdminCampaign(setToast);

    console.log('currentPage:', currentPage);
    console.log('pageInfo:', pageInfo);
    console.log('campaigns:', campaigns);
    console.log('캠페인 총 개수(전체):', pageInfo.listCount);
    console.log('캠페인 총 개수(현재 페이지):', campaigns.length);
    
    useEffect(() => {
        setCurrentPage(1); // mount 시 무조건 1페이지로 리셋
        // eslint-disable-next-line
    }, []);

    const handleEdit = (campaign) => {
        navigate(`/admin/campaigns/update/${campaign.campaignNo}`, { state: campaign });
    };

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        console.log('삭제 확정:', selectedId);
        // TODO: 삭제 API 호출
        // API 호출 성공 후:
        setShowConfirm(false);
        setToast({ show: true, message: '삭제되었습니다!', variant: 'success' });
        setSelectedId(null);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedId(null);
    };


    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>로딩중...</div>;
    }

    return (
        <div>
            <PageHeader>
                <h1>캠페인 관리</h1>
                <CreateButton onClick={() => navigate('/admin/campaigns/insert')}>
                    <i className="fas fa-plus"></i>
                    등록하기
                </CreateButton>
            </PageHeader>

            <AdminCampaignList
                campaigns={campaigns}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Pagination
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage}
                pageInfo={pageInfo}
            />

            <ConfirmDialog
                show={showConfirm}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="삭제 확인"
                message="정말로 삭제하시겠습니까?"
                confirmText="삭제"
                cancelText="취소"
                variant="danger"
                showIcon={false}
            />
            
            <Toast
                isVisible={toast.show}
                message={toast.message}
                variant={toast.variant}
                onClose={() => setToast({ ...toast, show: false })}
            />
        </div>
    );
};

export default AdminCampaigns;