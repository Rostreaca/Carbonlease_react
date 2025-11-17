import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import BoardItem from './components/BoardItem';
import OutlineWriterButton from '../../Common/UI/Button/OutlineWriterButton';
import SearchFilterDropdowns from './components/SearchFilterDropdowns';
import SearchBox from './components/SearchBox';
import Pagination from '../../Common/Pagination/Pagination';

const ActivityBoards = () => {

    const navigate = useNavigate();

    const goWritePage = () => {
        console.log("글쓰기 이동!");
        navigate("/activityBoards/insertForm");
    };

    const [ filter, setFilter ] = useState('title'); // 검색 필터 상태
    const [ keyword, setKeyword ] = useState(''); // 검색어 상태
    /* 데이터 연동시 활성화
    const [ boardList, setboardList ] = useState([]);

    useEffect(() => {
        fetch('/api/activity-boards')
        .then(res => res.json())
        .then(data => setboardList(data));   
    }, []);
    */
    const handleSelectFilter = (value) => {
        setFilter(value);
    };

    const handleSearch = (value) => {
        setKeyword(value);
    };

    const dummyList = [ // 더미 데이터
        {
            id: 12,
            title: "텀블러 사용 인증합니다",
            content: "오늘 카페에서 일회용 컵 대신 텀블러 사용했어요!",
            regDate: "2025.11.12",
            viewCnt: 32,
            commentCnt: 4,
            nickname: "초록발자국",
            thumbnail: "/upload/sample01.jpg"
        },
        {
            id: 11,
            title: "장바구니 사용 인증!",
            content: "마트 갈 때 비닐 대신 장바구니 사용했어요 :)",
            regDate: "2025.11.11",
            viewCnt: 41,
            commentCnt: 5,
            nickname: "에코사랑",
            thumbnail: "/upload/sample02.jpg"
        },
        {
            id: 10,
            title: "분리수거 확실히 했습니다!",
            content: "플라스틱 라벨 제거하고 깨끗하게 씻어서 배출 완료!",
            regDate: "2025.11.10",
            viewCnt: 21,
            commentCnt: 3,
            nickname: "지구지킴이",
            thumbnail: null
        },
        {
            id: 9,
            title: "텀블러 사용 인증합니다",
            content: "오늘 카페에서 일회용 컵 대신 텀블러 사용했어요!",
            regDate: "2025.11.12",
            viewCnt: 32,
            commentCnt: 4,
            nickname: "초록발자국",
            thumbnail: "/upload/sample01.jpg"
        },
        {
            id: 8,
            title: "장바구니 사용 인증!",
            content: "마트 갈 때 비닐 대신 장바구니 사용했어요 :)",
            regDate: "2025.11.11",
            viewCnt: 41,
            commentCnt: 5,
            nickname: "에코사랑",
            thumbnail: "/upload/sample02.jpg"
        },
        {
            id: 7,
            title: "분리수거 확실히 했습니다!",
            content: "플라스틱 라벨 제거하고 깨끗하게 씻어서 배출 완료!",
            regDate: "2025.11.10",
            viewCnt: 21,
            commentCnt: 3,
            nickname: "지구지킴이",
            thumbnail: null
        }
        ];

        const filteredList = dummyList.filter(item =>
            item[filter].toLowerCase().includes(keyword.toLowerCase())
        );

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
                <div style={{width: "1200px auto", margin: "0 auto", padding: "40px 0"}}>
                   { filteredList.length > 0 ? (
                        filteredList.map((d, idx) => (
                            <BoardItem key={ idx } item={ d } />
                        ))
                    ) : (
                        <div style={{ textAlign:"center", color:"#777", padding:"40px 0" }}>
                            검색 결과가 없습니다.
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
                
                <br /><br />

                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <Pagination
                        currentPage={1}
                        totalPages={5}
                        pageNumbers={[1, 2, 3, 4, 5]}
                        onFirstPage={() => console.log('첫 페이지 이동')}
                        onPrevPage={() => console.log('이전 페이지 이동')}
                        onPageClick={(page) => console.log(`${page} 페이지 클릭`)}
                        onNextPage={() => console.log('다음 페이지 이동')}
                        onLastPage={() => console.log('마지막 페이지 이동')}
                    />
                </div>
                

            </PageContent>
        </>
    );
}

export default ActivityBoards;
