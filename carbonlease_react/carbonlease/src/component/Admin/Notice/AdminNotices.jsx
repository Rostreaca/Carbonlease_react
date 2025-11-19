import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const AdminNotices = () => {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });
    
    // Pagination 상태 (Spring Boot에서 받아올 데이터)
    const [currentPage, setCurrentPage] = useState(1);
    const [notice, setNotice] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });

    useEffect (()=>{
        getNotices(currentPage);
    }, [currentPage])

    const getNotices = (page) => {
        axios
            .get(`http://localhost/admin/notices?pageNo=${page}`)
            .then((result) => {
                console.log(result); // OK
                const responseNotice = result.data.notices;
                const responsePageInfo = result.data.pageInfo;
                setNotice([...responseNotice]);
                setPageInfo({
                    startPage: responsePageInfo.startPage,
                    endPage: responsePageInfo.endPage,
                    totalPage: responsePageInfo.maxPage
                })
            })
    }

    const handleEdit = (id) => {
        navigate(`/admin/notices/update/${id}`);
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

    const handleRowClick = (row) => {
        navigate(`/notices/${row.noticeNo}`)
    }

    // 테이블 컬럼 정의
    const columns = [
        {
            header: '순번',
            field: 'noticeNo'
        },
        {
            header: '제목',
            field: 'noticeTitle',
            render: (value) => <strong>{value}</strong>

        },
        {   
            header: '등록일자',
            field: 'createDate',
            render: (value) => <strong>{value}</strong>
        },
        {
            header: '조회수',
            field: 'viewCount',
            render: (value) => <strong>{value}</strong>
        },
        {
            header: '상태',
            field: 'status',
            render: (value) => (
                <StatusBadge $status={value}>{value}</StatusBadge>
            )
        },
        {
            header: '상단 고정',
            field: 'fix',
            render: (value) => (
                <StatusBadge $status={value}>{value}</StatusBadge>
            )
        },
        {
            header: '작성자',
            field: 'noticeWriter',
            render: (value) => (
                <StatusBadge $status={value}>{value}</StatusBadge>
            )
        },
        {
            header: '관리',
            field: 'id',
            render: (value) => (
                <ButtonGroup>
                    <EditButton onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(value);
                    }}>
                        수정
                    </EditButton>
                    <DeleteButton onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(value)
                    }}>
                        삭제
                    </DeleteButton>
                </ButtonGroup>
            )
        }
    ];

    return (
        <div>
            <PageHeader>
                <h1>공지사항 관리</h1>
                <CreateButton onClick={() => navigate('/admin/notices/insert')}>
                    <i className="fas fa-plus"></i>
                    등록하기
                </CreateButton>
            </PageHeader>

            <DataTable 
                title="공지사항 목록"
                columns={columns}
                data={notice}
                onRowClick={handleRowClick}
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

export default AdminNotices;
