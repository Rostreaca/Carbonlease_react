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

    const [currentPage, setCurrentPage] = useState(1);
    const [activityBoards, setActivityBoards] = useState([]);

    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });

    const [filter, setFilter] = useState('title');
    const [keyword, setKeyword] = useState('');
    
    
    useEffect(() => {
        axios
        .get(`http://localhost:80/activityBoards?pageNo=${currentPage}&filter=${filter}&keyword=${keyword}`)
        .then((response) => {
            console.log("response.data: ", response.data);

            const list = response.data.activityListDTO;

            console.log("받은 list:", list);
            console.log(response);
            setPageInfo({
                startPage: response.data.pageInfo.startPage,
                endPage: response.data.pageInfo.endPage,
                totalPage: response.data.pageInfo.maxPage
            })

            if(Array.isArray(list)){
                setActivityBoards(list);
            } else {
                console.error("list가 배열이 아니래", list);
                setActivityBoards([]);
            }
        })
        .catch((err) => {
            console.error(err);
        });
    },[currentPage ,filter, keyword]);
    

    const goWritePage = () => navigate("/activityBoards/insertForm");
    const handleSelectFilter = (value) => setFilter(value);
    const handleSearch = (value) => {
        setCurrentPage(1);
        setKeyword(value);
    };

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

                {/* 게시글 리스트 */}
                <div style={{ width:"1200px", margin:"0 auto", padding:"40px 0" }}>
                    {Array.isArray(activityBoards) && activityBoards.length > 0 ? (
                        activityBoards.map((item, idx) => (
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

                {/* 버튼 + 검색 */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                    <OutlineWriterButton onClick={goWritePage}>
                        글쓰기
                    </OutlineWriterButton>
                    <div style={{ display:"flex", gap:"10px" }}>
                        <SearchFilterDropdowns onSelectFilter={handleSelectFilter} />
                        <SearchBox filter={filter} onSearch={handleSearch} />
                    </div>
                </div>

                {/* Pagination */}
                <div style={{ display: "flex", justifyContent: "center", marginTop:"20px" }}>
                    <Pagination
                        currentPage={currentPage}        // 1-based
                        setCurrentPage={setCurrentPage}
                        pageInfo={pageInfo}           // totalPage 포함되어 있음
                    />
                </div>

            </PageContent>
        </>
    );
};

export default ActivityBoards;
