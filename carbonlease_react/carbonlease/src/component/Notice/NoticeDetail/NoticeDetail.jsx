import { useParams } from 'react-router-dom';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import { useEffect, useState } from 'react';
import axios from 'axios';

const NoticeDetail = () => {
    
    const {id} = useParams();
    const [notice, setNotice] = useState(
        {
            title: "",
            content: "",
            viewCount: "",
            createDate: ""
        }
    )

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

                <div id='title'><strong>{notice.title}</strong></div>
                <div id='meta'>
                    <p>조회수: {notice.viewCount}</p>
                    <p>등록일자: {notice.createDate}</p>
                </div>
                <div id='content'>
                    {notice.content}
                </div>
            </PageContent>
        </>
    )   
}

export default NoticeDetail;