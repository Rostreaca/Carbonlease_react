import { useNavigate } from 'react-router-dom';
import DataTable from '../../../Common/DataTable/DataTable';
import Pagination from '../../../Common/Pagination/Pagination';
import ConfirmDialog from '../../../Common/ConfirmDialog/ConfirmDialog';
import Toast from '../../../Common/Toast/Toast';
import { useState, useEffect } from 'react';
import { getNoticesAdmin, deleteNotice, restoreNotice } from '../../../../api/notice/adminNoticeAPI';
import {
    DeleteButton,
    EditButton,
    StatusBadge,
    ButtonGroup
} from '../../../Common/DataTable/DataTable.styled';

function AdminNoticeList() {

    const navigate = useNavigate();

    const [showDelete, setShowDelete] = useState(false);
    const [showRestore, setShowRestore] = useState(false);
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
        setShowDelete(true);
    };

    const handleRestore = (noticeNo) => {
        setSelectedId(noticeNo);
        setShowRestore(true);
    }

    const confirmDelete = async () => {
        try {
            await deleteNotice(selectedId);
            await fetchNotices(currentPage); // 재조회
            setToast({ show: true, message: '삭제되었습니다!', variant: 'success' });
        } catch (err) {
            console.log(err);
            setToast({ show: true, message: '삭제 실패!', variant: 'danger' });
        } finally {
            setShowDelete(false);
            setSelectedId(null);
        }
    };

    const confirmRestore = async () => {
        try {
            await restoreNotice(selectedId);
            await fetchNotices(currentPage); // 재조회
            setToast({ show: true, message: '복구되었습니다!', variant: 'success' });
        } catch (err) {
            console.log(err);
            setToast({ show: true, message: '복구 실패!', variant: 'danger' });
        } finally {
            setShowRestore(false);
            setSelectedId(null);
        }
    };

    const cancelDelete = () => {
        setShowDelete(false);
        setSelectedId(null);
    };

    const cancelRestore = () => {
        setShowRestore(false);
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
                render: (v) => (
                <StatusBadge $status={v === "Y" ? "진행중" : "삭제"}>
                    {v === "Y" ? "정상" : "삭제됨"}
                </StatusBadge>
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

                        {row.status === "Y" ? (
                            <DeleteButton onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(row.noticeNo)
                            }}>
                                삭제
                            </DeleteButton>
                        ) : (
                            <DeleteButton onClick={(e) => {
                                e.stopPropagation();
                                handleRestore(row.noticeNo)
                            }}>
                                복구
                            </DeleteButton>
                        )}

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
                show={showDelete}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="삭제 확인"
                message="정말로 삭제하시겠습니까?"
                confirmText="삭제"
                cancelText="취소"
                variant="danger"
                showIcon={false}
            />

            <ConfirmDialog
                show={showRestore}
                onClose={cancelRestore}
                onConfirm={confirmRestore}
                title="복구 확인"
                message="정말로 복구하시겠습니까?"
                confirmText="복구"
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