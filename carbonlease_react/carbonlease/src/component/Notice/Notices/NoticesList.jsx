import DataTable from '../../Common/DataTable/DataTable';
import Pagination from '../../Common/Pagination/Pagination';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../api/api.js';

function NoticesList({ limit }) {

    const navigate = useNavigate();

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
            .get(`${API_BASE_URL}/notices?pageNo=${page}`)
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

    const handleRowClick = (row) => {
        //console.log("hi");
        navigate(`/notices/${row.noticeNo}`)
    }

    return (
        <>
        <DataTable
            title="공지사항 목록"
            columns={columns}
            data={limit ? notice.slice(0, limit) : notice}
            icon="fas fa-leaf" 
            onRowClick={handleRowClick}
        />
        {!limit && (
            <Pagination
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage}
                pageInfo={pageInfo}
            />
        )}
        </>
    )
}

export default NoticesList;
