import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmDialog from '../../Common/ConfirmDialog/ConfirmDialog';
import DataTable from '../../Common/DataTable/DataTable';
import {
    CreateButton,
    DeleteButton,
    EditButton,
    PageHeader,
    StatusBadge,
    ButtonGroup
} from '../../Common/DataTable/DataTable.styled';
import Pagination from '../../Common/Pagination/Pagination';
import Toast from '../../Common/Toast/Toast';
import { AuthContext } from '../../Context/AuthContext';
import NoticeCalendar from './AdminCalendar/NoticeCalendar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



const AdminNotices = () => {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });
    const [key, setKey] = useState('notice');
    const { auth } = useContext(AuthContext);
    
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
        if(auth.accessToken){
            axios
                .get(`http://localhost/admin/notices?pageNo=${page}`, {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`
                    },
                })
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
    }

    const handleEdit = (noticeNo) => {
        navigate(`/admin/notices/update/${noticeNo}`);
    };

    const handleDelete = (noticeNo) => {
        setSelectedId(noticeNo);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        console.log('삭제 확정:', selectedId);

        axios.put(`http://localhost/admin/notices/delete/${selectedId}`,{}, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
            alert("삭제 실패");
        });
        
        setShowConfirm(false);
        setToast({ show: true, message: '삭제되었습니다!', variant: 'success' });
        setSelectedId(null);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedId(null);
    };

    const handleRowClick = (row) => {
        navigate(`/admin/notices/${row.noticeNo}`)
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

    return (
        <div>
            <PageHeader>
                <h1>공지사항 관리</h1>
                <CreateButton onClick={() => navigate('/admin/notices/insert')}>
                    <i className="fas fa-plus"></i>
                    등록하기
                </CreateButton>
            </PageHeader>

            <Tabs
                id="controlled-tab-notice"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            > 

                <Tab eventKey="notice" title="공지사항">
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
                </Tab>

                <Tab eventKey="calendar" title="일정">
                    <NoticeCalendar key={key === "calendar" ? "calendar-active" : "calendar"} />
                </Tab>

            </Tabs>

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
