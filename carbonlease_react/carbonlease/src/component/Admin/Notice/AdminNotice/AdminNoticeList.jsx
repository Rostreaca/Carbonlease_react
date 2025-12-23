import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Common/DataTable/DataTable';
import Pagination from '../../../Common/Pagination/Pagination';
import ConfirmDialog from '../../../Common/ConfirmDialog/ConfirmDialog';
import Toast from '../../../Common/Toast/Toast';
import { useState, useEffect, useContext } from 'react';
import { getNoticesAdmin, deleteNotice } from '../../../../api/notice/adminNoticeAPI';
import {
    DeleteButton,
    EditButton,
    StatusBadge,
    ButtonGroup
} from '../../../Common/DataTable/DataTable.styled';

function AdminNoticeList() {

    const navigate = useNavigate();

    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });

    const [currentPage, setCurrentPage] = useState(1);
    const [notice, setNotice] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });

    useEffect(()=>{
        fetchNotices(currentPage)
    }, [currentPage]);

    const fetchNotices = async (page) => {
        try {
            const data = await getNoticesAdmin(page);
            setNotice([...data.notices]);
            setPageInfo({
                startPage: data.pageInfo.startPage,
                endPage: data.pageInfo.endPage,
                totalPage: data.pageInfo.totalPage,
            });
        } catch (err) {
            console.error(err);
        }
    }
    
    const handleEdit = (noticeNo) => {
        navigate(`/admin/notices/update/${noticeNo}`);
    };

    const handleDelete = (noticeNo) => {
        setSelectedId(noticeNo);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteNotice(selectedId);
            await fetchNotices(currentPage); // 재조회
            setToast({ show: true, message: '삭제되었습니다!', variant: 'success' });
        } catch (err) {
            console.log(err);
            setToast({ show: true, message: '삭제 실패!', variant: 'danger' });
        } finally {
            setShowConfirm(false);
            setSelectedId(null);
        }
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedId(null);
    };

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
                render: (value, row) => (
                    <ButtonGroup>
                        <EditButton onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(row.noticeNo);
                        }}>
                            수정
                        </EditButton>

                        <DeleteButton onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(row.noticeNo)
                        }}>
                            삭제
                        </DeleteButton>
                    </ButtonGroup>
                )
            }
        ];

        const handleRowClick = (row) => {
            navigate(`/admin/notices/${row.noticeNo}`);
        }


        return(
            <>
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
            </>
        )
}

export default AdminNoticeList;