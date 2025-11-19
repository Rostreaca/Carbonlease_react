import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import BoardItem from './components/BoardItem';
import OutlineWriterButton from '../../Common/UI/Button/OutlineWriterButton';
import SearchFilterDropdowns from './components/SearchFilterDropdowns';
import SearchBox from './components/SearchBox';
import Pagination from '../../Common/Pagination/Pagination';

const ActivityBoards = () => {

    const navigate = useNavigate();
    const [ boards, setBoards ] = useState([]);
    const [ page, setPage] = useState(0);

    const [ filter, setFilter ] = useState('title'); // 검색 필터 상태
    const [ keyword, setKeyword ] = useState(''); // 검색어 상태

    const fetchBoards = async () => {
        try {
            const res = await axios.get(
                `http://localhost/activityBoards?page=${page}&filter=${filter}&keyword=${keyword}`
            );
            console.log("API RESULT:", res.data);
            setBoards(res.data);
        } catch (err) {
            console.error("게시글 조회 실패:", err);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, [page, filter, keyword]);

    const goWritePage = () => navigate("/activityBoards/insertForm");
    const handleSelectFilter = (value) => setFilter(value);
    const handleSearch = (value) => {
        setPage(0);
        setKeyword(value);
    }
    return (
        <>
            <PageTitle 
                title="인증 게시판" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '인증 게시판', current: true }
                ]} 
            />
            <PageContent>
                
                <div style={{ width:"1200px", margin:"0 auto", padding:"40px 0" }}>
                    {boards.length > 0 ? (
                        boards.map((item, idx) => (
                            <BoardItem 
                                key={idx} 
                                item={item}
                                onClick={() => navigate(`/activityBoards/${item.activityNo}`)}
                            />
                        ))
                    ) : (
                        <div style={{ textAlign:"center", color:"#777", padding:"40px 0" }}>
                            게시글이 없습니다.
                        </div>
                    )}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                    <OutlineWriterButton onClick={goWritePage}>
                        글쓰기
                    </OutlineWriterButton>
                    <div style={{ display:"flex", gap:"10px" }}>
                        <SearchFilterDropdowns onSelectFilter={handleSelectFilter} />
                        <SearchBox filter={filter} onSearch={handleSearch} />
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", marginTop:"20px" }}>
                    <Pagination
                        currentPage={page + 1}
                        totalPages={5} 
                        pageNumbers={[1, 2, 3, 4, 5]}
                        onPrevPage={() => page > 0 && setPage(page - 1)}
                        onPageClick={(num) => setPage(num - 1)}
                        onNextPage={() => setPage(page + 1)}
                    />
                </div>
                

            </PageContent>
        </>
    );
}

export default ActivityBoards;
