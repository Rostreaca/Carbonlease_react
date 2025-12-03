import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

const NoticeDetail = () => {
    const navigate = useNavigate();

    // 게시물 ID 가져오기
    const {id} = useParams();

    // 가져올 게시물 Data목록
    const [notice, setNotice] = useState(
        {
            title: "제목임",
            content: "내용임",
            viewCount: "1",
            createDate: "2025-01-01",
            files:[
                {
                    "originName": "sample.pdf",
                    "changeName": "20251128_abc123.pdf",
                    "filePath": "/upload/notice/"
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
    
    // 게시글 상세조회 요청
    useEffect(()=>{
        axios
            .get(`http://www.localhost/notices/detail/${id}`)
            .then((result) => {
                const responseNotice = result.data.notice;
                const responseAttachment = result.data.attachment;
                console.log(responseAttachment);
                setNotice({
                    title: responseNotice.noticeTitle,
                    content: responseNotice.noticeContent,
                    viewCount: responseNotice.viewCount,
                    createDate: responseNotice.createDate,
                    files: responseAttachment
                })
            })

    }, [id])

    // 목록으로 돌아가기
    const handleBack = () => {
        navigate('/notices');
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