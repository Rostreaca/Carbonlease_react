import { useParams } from 'react-router-dom';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const BoardDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [board, setBoardDetail] = useState([]);
    
     useEffect(()=>{
        axios
            .get(`http://localhost/boards/detail/${id}`)
            .then((result) => {
                const response = result.data;
                console.log(response);
                setBoardDetail(result.data.replyList);
            })

    }, [id])
    
    const Listbtn = () => {
        navigate(`/boards?pageNo=1`)
    }

    return(
        <>
            <PageTitle 
                title="상세보기" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '일반 게시판', path: '/boards' },
                    { label: '상세보기', current: true }
                ]} 
            />
            <PageContent>
                컨텐츠가 들어가는 영역
                <button onClick={Listbtn}>목록보기</button>
            </PageContent>
        </>
    )
}

export default BoardDetail;