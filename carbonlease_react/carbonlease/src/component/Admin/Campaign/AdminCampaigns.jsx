import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../Common/ConfirmDialog/ConfirmDialog';
import DataTable from '../../Common/DataTable/DataTable';
import {
    CategoryBadge,
    CreateButton,
    DeleteButton,
    EditButton,
    PageHeader,
    StatusBadge,
    ButtonGroup
} from '../../Common/DataTable/DataTable.styled';
import Pagination from '../../Common/Pagination/Pagination';
import Toast from '../../Common/Toast/Toast';

const AdminCampaigns = () => {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });
    
    // Pagination 상태 (Spring Boot에서 받아올 데이터)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);
    const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);

    // 더미 데이터
    const [campaigns] = useState([
        {
            id: 1,
            title: '친환경 캠페인 1',
            category: '환경보호',
            status: '진행중',
            startDate: '2024-01-15',
            endDate: '2024-12-31'
        },
        {
            id: 2,
            title: '탄소중립 실천하기',
            category: '탄소절감',
            status: '진행중',
            startDate: '2024-02-01',
            endDate: '2024-11-30'
        },
        {
            id: 3,
            title: '재활용 챌린지',
            category: '재활용',
            status: '종료',
            startDate: '2024-01-01',
            endDate: '2024-06-30'
        },
        {
            id: 4,
            title: '에너지 절약 캠페인',
            category: '에너지',
            status: '진행중',
            startDate: '2024-03-01',
            endDate: '2024-12-31'
        },
        {
            id: 5,
            title: '플라스틱 제로 도전',
            category: '환경보호',
            status: '종료',
            startDate: '2024-07-01',
            endDate: '2024-12-31'
        }
    ]);

    const handleEdit = (id) => {
        navigate(`/admin/campaigns/update/${id}`);
    };

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        console.log('삭제 확정:', selectedId);
        // TODO: 삭제 API 호출
        setShowConfirm(false);
        setToast({ show: true, message: '삭제되었습니다!', variant: 'success' });
        setSelectedId(null);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedId(null);
    };

    // Pagination 핸들러 (추후 Spring Boot API 연동)
    const updatePageNumbers = (page, total) => {
        const maxVisible = 5;
        const blockNumber = Math.ceil(page / maxVisible);
        const start = (blockNumber - 1) * maxVisible + 1;
        const end = Math.min(blockNumber * maxVisible, total);
        
        const numbers = [];
        for (let i = start; i <= end; i++) {
            numbers.push(i);
        }
        setPageNumbers(numbers);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
        updatePageNumbers(1, totalPages);
        // TODO: API 호출 fetchCampaigns(1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            updatePageNumbers(newPage, totalPages);
            // TODO: API 호출 fetchCampaigns(currentPage - 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
        updatePageNumbers(page, totalPages);
        // TODO: API 호출 fetchCampaigns(page);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            updatePageNumbers(newPage, totalPages);
            // TODO: API 호출 fetchCampaigns(currentPage + 1);
        }
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
        updatePageNumbers(totalPages, totalPages);
        // TODO: API 호출 fetchCampaigns(totalPages);
    };

    // 테이블 컬럼 정의
    const columns = [
        {
            header: 'ID',
            field: 'id'
        },
        {
            header: '캠페인명',
            field: 'title',
            render: (value) => <strong>{value}</strong>
        },
        {
            header: '카테고리',
            field: 'category',
            render: (value) => (
                <CategoryBadge>{value}</CategoryBadge>
            )
        },
        {
            header: '상태',
            field: 'status',
            render: (value) => (
                <StatusBadge $status={value}>{value}</StatusBadge>
            )
        },
        {
            header: '시작일',
            field: 'startDate'
        },
        {
            header: '종료일',
            field: 'endDate'
        },
        {
            header: '관리',
            field: 'id',
            render: (value) => (
                <ButtonGroup>
                    <EditButton onClick={() => handleEdit(value)}>
                        수정
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(value)}>
                        삭제
                    </DeleteButton>
                </ButtonGroup>
            )
        }
    ];

    return (
        <div>
            <PageHeader>
                <h1>캠페인 관리</h1>
                <CreateButton onClick={() => navigate('/admin/campaigns/insert')}>
                    <i className="fas fa-plus"></i>
                    등록하기
                </CreateButton>
            </PageHeader>

            <DataTable 
                title="캠페인 목록"
                columns={columns}
                data={campaigns}
            />

            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
                onFirstPage={handleFirstPage}
                onPrevPage={handlePrevPage}
                onPageClick={handlePageClick}
                onNextPage={handleNextPage}
                onLastPage={handleLastPage}
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