import { useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import { NoticeDetailContainer } from './NoticeDetail.styled';
import NoticeHeader from './components/NoticeHeader';
import NoticeContent from './components/NoticeContent';
import NoticeMeta from './components/NoticeMeta';
import NoticeActions from './components/NoticeActions';
import NoticeFiles from './components/NoticeFiles';
import { AuthContext } from '../../Context/AuthContext';
import { getNoticeDetail } from '../../../api/notice/noticeApi';
import { getNoticeDetailAdmin } from '../../../api/notice/adminNoticeAPI';

const NoticeDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { auth } = useContext(AuthContext);

    // 게시물 ID 가져오기
    const {id} = useParams();

    // 가져올 게시물 Data목록
    const [notice, setNotice] = useState(
        {
            title: "",
            content: "",
            viewCount: "",
            createDate: "",
            files:[
                {
                    "originName": "",
                    "changeName": "",
                    "filePath": ""
                }
            ]
        }
    )

    // 게시글 컴포넌트 배열
    const noticeComponents = [
        NoticeHeader,
        NoticeMeta,
        NoticeFiles,
        NoticeContent
    ];

    // 상세조회
    const fetchNoticeDetail = async (id) => {
        let data = null;
        if (location.pathname.startsWith('/admin')){
            data = await getNoticeDetailAdmin(id);
        } else {
            data = await getNoticeDetail(id);
        }
        const notice = data.notice;
        const attachments = data.attachment ?? [];
        setNotice({
            title: notice.noticeTitle,
            content: notice.noticeContent,
            viewCount: notice.viewCount,
            createDate: notice.createDate,
            files: attachments
        })
    }
    
    // 게시글 상세조회 요청
    useEffect(()=>{
        fetchNoticeDetail(id);
    }, [id])

    // 목록으로 돌아가기
    const handleBack = () => {
        if (location.pathname.startsWith('/admin')) {
            navigate('/admin/notices');
        } else {
            navigate('/notices');
        }
    };

    return(
        <>
            <PageTitle 
                title="공지사항" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '공지사항', path: '/notices'},
                    { label: '공지사항 상세', current: true }
                ]} 
            />
            <PageContent>
                <NoticeDetailContainer>
                {noticeComponents.map((Component, idx) => (
                        <Component key={idx} notice={notice} />
                    ))}
                    <NoticeActions
                        handleBack={handleBack}
                    />
                </NoticeDetailContainer>
            </PageContent>
        </>
    )   
}

export default NoticeDetail;