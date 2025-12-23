import DataTable from '../../Common/DataTable/DataTable';
import Pagination from '../../Common/Pagination/Pagination';

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNotices } from '../../../api/notice/noticeApi';

function NoticesList() {

    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [notice, setNotice] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });

    // 현재 페이지 기준 목록 조회
    useEffect (()=>{
        fetchNotice(currentPage);
    }, [currentPage])

    const fetchNotice = async (page) => {
        try {
            const data = await getNotices(page);
            setNotice([...data.notices])
            setPageInfo({
                startPage: data.pageInfo.startPage,
                endPage: data.pageInfo.endPage,
                totalPage: data.pageInfo.totalPage,
            })
        } catch (err) {
            console.error(err);
        }
    }

    // 목록 columns 정의
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
       
    ];

    // 상세클릭 Handler
    const handleRowClick = (row) => {
        navigate(`/notices/${row.noticeNo}`)
    }

    return (
        <>
        <DataTable
            title="공지사항 목록"
            columns={columns}
            data={notice}
            icon="fas fa-leaf" 
            onRowClick={handleRowClick}
        />

        <Pagination
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            pageInfo={pageInfo}
        />
        </>
    )
}

export default NoticesList;
