import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import { NoticeDetailContainer } from './NoticeDetail.styled';
import NoticeHeader from './components/NoticeHeader';
import NoticeImage from './components/NoticeImage';
import NoticeContent from './components/NoticeContent';
import NoticeMeta from './components/NoticeMeta';
import NoticeActions from './components/NoticeActions';

const NoticeDetail = () => {
    
    const navigate = useNavigate();

    const {id} = useParams();
    const [notice, setNotice] = useState(
        {
            title: "",
            content: "",
            viewCount: "",
            createDate: ""
        }
    )

    const noticeComponents = [
        NoticeHeader,
        //NoticeImage,
        NoticeContent,
        NoticeMeta,
    ];

    const handleBack = () => {
        navigate('/notices');
    };

    useEffect(()=>{
        axios
            .get(`http://www.localhost/notices/detail/${id}`)
            .then((result) => {
                const response = result.data;
                console.log(response);
                setNotice({
                    title: response.noticeTitle,
                    content: response.noticeContent,
                    viewCount: response.viewCount,
                    createDate: response.createDate
                })
            })

    }, [id])
    
    
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