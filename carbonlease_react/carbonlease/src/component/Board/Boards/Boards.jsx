import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from '../../Common/Pagination/Pagination';
import BoardItems from './components/BoardItems';
import { useNavigate } from 'react-router-dom';
import OutlineWriterButton from '../../Common/UI/Button/OutlineWriterButton';
import { ButtonGroup, Dropdown, Form, InputGroup, Button } from 'react-bootstrap';
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


    const [searchType, setSearchType] = useState('TITLE'); // 기본 검색 타입 (TITLE, WRITER 등)
    const [searchQuery, setSearchQuery] = useState(''); // 검색어


    useEffect (()=>{
        console.log(`useEffect 실행: Page=${currentPage}, Query=${searchQuery}, Type=${searchType}`);
        getBoards(currentPage, searchQuery, searchType);
        console.log("로그인 정보 : {}", accessToken);
    }, [currentPage, searchQuery, searchType]);

    const getBoards = (page, query = '', type = 'TITLE') => {
        axios
            .get(`http://localhost/boards?pageNo=${page}&searchType=${type}&searchQuery=${query}`)
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

    const handleRowClick = (row) => {
        console.log("hi");
        navigate(`/boards/${row.boardNo}`)
    }

     const handleSearch = (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
        console.log("handleSearch 실행: setCurrentPage(1) 호출");
        console.log("handleSearch 실행: API 직접 호출");
        getBoards(1, searchQuery, searchType);
        setCurrentPage(1); // 검색 시 첫 페이지로 이동
        // useEffect가 searchQuery 변경을 감지하고 getBoards를 다시 호출합니다.
    };

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
                        <BoardItems key={item.boardNo} item={item} onRowClick={() => handleRowClick(item)} />
                ))} <br />

        {/* 버튼 + 검색 */}
         <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <OutlineWriterButton onClick={goWritePage}>
                글쓰기
            </OutlineWriterButton>

              <Form onSubmit={handleSearch} style={{ display: 'flex', gap: '5px' }}>
                <Form.Select 
                    value={searchType} 
                    onChange={(e) => setSearchType(e.target.value)}
                    style={{ width: '120px' }}
                >
                    <option value="TITLE">제목</option>
                    <option value="CONTENT">내용</option>
                    <option value="NICKNAME">닉네임</option>
                </Form.Select>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button variant="outline-secondary" type="submit">
                        검색
                    </Button>
                </InputGroup>
            </Form>
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

