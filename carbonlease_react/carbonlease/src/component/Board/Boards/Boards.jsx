import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from '../../Common/Pagination/Pagination';
import BoardItems from './components/BoardItems';
import { useNavigate } from 'react-router-dom';
import OutlineWriterButton from '../../Common/UI/Button/OutlineWriterButton';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { BoardInsertForm } from '../../../api/board/boardAPI';

 const Boards = () => {

    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");
    const [currentPage, setCurrentPage] = useState(1);
    const [board, setBoard] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });

    const [ selectedLabel, setSelectLabel ] = useState('제목');

    const handleSelect = (key, event) => {
        setSelectLabel(event.target.innerText);
        onSelectFilter(key);
    }

    useEffect (()=>{

        getBoards(currentPage);
        console.log("로그인 정보 : {}", accessToken);
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


    const goWritePage = () => navigate("/boards/InsertForm");

    const handleRowClick = () => {
        console.log("hi");
        navigate(`/boards/${row.boardNo}`)
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
                        <BoardItems key={item.boardNo} item={item} onRowClick={handleRowClick} />
                ))} <br />

        {/* 버튼 + 검색 */}
         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <OutlineWriterButton onClick={goWritePage}>
                글쓰기
            </OutlineWriterButton>

            <DropdownButton
                as={ButtonGroup}
                id="dropdown-search-filter"
                variant="success"
                title={<span style={{ display:"inline-block", width:"47px", textAlign:"center" }}>{selectedLabel}</span>}
                onSelect={handleSelect}
            >
                <Dropdown.Item eventKey="title">제목</Dropdown.Item>
                <Dropdown.Item eventKey="content">내용</Dropdown.Item>
                <Dropdown.Item eventKey="nickname">닉네임</Dropdown.Item>
              </DropdownButton>
        </div>
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

