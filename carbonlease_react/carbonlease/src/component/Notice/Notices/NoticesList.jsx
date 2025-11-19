import DataTable from '../../Common/DataTable/DataTable';
import Pagination from '../../Common/Pagination/Pagination';

import { useState, useEffect } from 'react';
import axios from 'axios';

function NoticesList() {

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
            .get(`http://localhost/notices?pageNo=${page}`)
            .then((result) => {
                //console.log(result); // OK
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

    return (
        <>
        <DataTable
            title="공지사항 목록"
            columns={columns}
            data={notice}
            icon="fas fa-leaf" 
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
