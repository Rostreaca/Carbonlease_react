import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from '../../Common/Pagination/Pagination';
import BoardItems from './components/BoardItems';

// useEffect를 사용하여 컴포넌트가 마운트될 때 데이터를 가져오고 상태를 업데이트합니다.
// useState를 사용하여 상태 변수를 선언합니다.

 const Boards = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [board, setBoard] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });

    useEffect (()=>{
        getBoards(currentPage);
    }, [currentPage])

    const getBoards = (page) => {
        axios
            .get(`http://localhost/boards?pageNo=${page}`)
            .then((result) => {
                console.log(result); // OK
                const responseBoard = result.data.boards;
                const responsePageInfo = result.data.pageInfo;
                setBoard([...responseBoard]);
                setPageInfo({
                    startPage: responsePageInfo.startPage,
                    endPage: responsePageInfo.endPage,
                    totalPage: responsePageInfo.maxPage
                })
            })
    }

    return (
        <>
            <PageTitle 
                title="일반 게시판" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '일반 게시판', current: true }
                ]} 
            />
            <PageContent>
              
                {
                    board.map((item) => (
                        <BoardItems key={item.boardNo} item={item} />
                ))}
            </PageContent>
           <Pagination
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            pageInfo={pageInfo}
            />
        </>
    )

}



export default Boards;

