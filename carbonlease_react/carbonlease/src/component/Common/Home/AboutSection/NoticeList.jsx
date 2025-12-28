import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../../api/api.js';
import { NoticeListButton, NoticeListDate, NoticeListLi, NoticeListTitle, NoticeListUl, NoticeListWrapper } from './AboutSection.styled';

const NoticeList = () => {
    const [notices, setNotices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}/notices?pageNo=1`)
        .then(res => res.json())
        .then(data => setNotices(data.notices ? data.notices.slice(0, 5) : []));
    }, []);

    return (
    <NoticeListWrapper>
        <NoticeListButton
        aria-label="공지사항 전체보기"
        onClick={() => navigate('/notices')}
        >
        <span style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%',fontWeight:400,fontSize:28}}>+</span>
        </NoticeListButton>
        <NoticeListUl>
        {notices.map((n, idx) => (
            <NoticeListLi
            key={n.noticeNo}
            $isLast={idx === notices.length - 1}
            onClick={() => navigate(`/notices/${n.noticeNo}`)}
            >
            <NoticeListDate>{n.createDate}</NoticeListDate>
            <NoticeListTitle $highlight={n.noticeTitle.match(/\d{4}/)}>{n.noticeTitle}</NoticeListTitle>
            </NoticeListLi>
        ))}
        </NoticeListUl>
    </NoticeListWrapper>
    );
};

export default NoticeList;
