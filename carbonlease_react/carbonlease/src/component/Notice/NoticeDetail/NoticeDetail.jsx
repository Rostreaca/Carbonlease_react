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
                titles={[
                    { label: '공지사항', path: '/notices' },
                    { label: '공지사항 상세', current: true }
                ]} 
            />
            <PageContent>

                <div id='title'>{notice.title}</div>
                <div id='meta'>
                    {notice.viewCount}
                    {notice.createDate}
                </div>
                <div id='content'></div>
            </PageContent>
        </>
    )   
}

export default NoticeDetail;