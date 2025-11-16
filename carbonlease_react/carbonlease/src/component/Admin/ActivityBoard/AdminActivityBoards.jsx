import BoardTabs from './components/StatusTabs.jsx';
import CheckBox from './components/CheckBox.jsx';

const AdminActivityBoards = () => {

    const items = [
      "게시글 번호 / 게시글 제목 1"
    ];


    return (
        <div>
            <h1>인증 게시판 관리</h1>
            <p>관리자 인증 게시판 페이지입니다.</p>
            <BoardTabs />
            <CheckBox items={[items]} />
        </div>
    );
};

export default AdminActivityBoards;
