import { useParams } from 'react-router-dom';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BoardItems from '../Boards/components/BoardItems';
import { ButtonArea, ButtonGroup, LikeCard, ProfileAndLike, ReplyButton, ReplyWriteArea } from '../../ActivityBoard/ActivityBoardDetail/ActivityBoardDetail.styles';
import OutlineSuccessButton from "../../Common/UI/Button/OutlineWriterButton.jsx";
import OutlineDangerButton from '../../Common/UI/Button/OutlineDangerButton';
import { FormCard } from '../../../component/ActivityBoard/ActivityInsertForm/ActivityInsertForm.styles.js';
import { Button, Form, Modal } from 'react-bootstrap';
import BoardReply from './BoardReply.jsx';
import RegionSelect from '../../../component/ActivityBoard/ActivityInsertForm/components/RegionSelect.jsx';
import ReplyPagination from '../../Common/UI/ReplyPagination.jsx';

const BoardDetail = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [board, setBoard] = useState([]);
    const [post, setPost] = useState([]);
    const [reply, setReply] = useState([]);
    const [regionNo, setRegionNo] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleUpdate = () => {
        navigate(`/boards/updateForm/${post.id}`);
  };

    const goList = () => {
        navigate("/boards");
  };

    // 좋아요
  const handleLikeToggle = () => {
    setPost(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };


     useEffect(()=>{
        axios
            .get(`http://localhost/boards/detail/${id}`)
            .then((result) => {
                const response = result.data;
                console.log("상세보기 데이터:", response);
                setBoard({
                    title: response.boardDetail.boardTitle,
                    content: response.boardDetail.boardContent,
                    viewCount: response.boardDetail.viewCount,
                    regionNo: response.boardDetail.regionNo,
                    regionName: response.boardDetail.regionName,
                });
                console.log("댓글데이터 : ", response.replyList.length);
                setReply([
                    ...response.replyList]);
            })

    }, [id])
    
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
                <FormCard style={{ padding: '50px' }}>
                <Form.Label /><strong>No : {id}</strong>
                    <div> 
                      조회수 : {board.viewCount} </div> <br />


            <Form.Group className="mb-4">
              <Form.Label><strong>제목</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder={board.title}
                readOnly
              /> <br />

              <Form.Label><strong>내용</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder={board.content}
                maxLength={1000}
                readOnly
              />

            </Form.Group>
                <strong>지역</strong>
              <RegionSelect value={board.regionNo} onChange={setRegionNo} />
              

              {/* {댓글 리스트} */}
            <BoardReply data={reply}/>
            <ReplyPagination currentPage={1} totalPages={5} />  
             <ProfileAndLike>
              
              {/* {댓글 등록} */}
            <Form.Label><strong>댓글</strong></Form.Label>
              <Form.Control
                as="textarea"
                placeholder="댓글을 입력해주세요."
                maxLength={1000}
                style={{ height: '100px', width: "600px" }}
              />
                <ReplyButton variant="outline-success">
                    댓글 등록
                    <Modal onClick={(showAlert) => setShowAlert(true)}
                        show={showAlert}
                        onClose={() => setShowAlert(true)}
                        title="알림"
                        message="댓글이 등록되었습니다."
                        variant="info"
                    />
                </ReplyButton>  


            {/* 좋아요 */}
            <LikeCard $liked={post.isLiked} onClick={handleLikeToggle}>
                <i className={post.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
                {post.isLiked ? '좋아요 취소' : '좋아요'}
            </LikeCard>
            </ProfileAndLike>

            {/* 버튼 */}
            <ButtonArea>
                <OutlineSuccessButton onClick={goList}>목록으로</OutlineSuccessButton>
                <ButtonGroup>
                <OutlineSuccessButton onClick={handleUpdate}>수정</OutlineSuccessButton>
                <OutlineDangerButton>삭제</OutlineDangerButton>
                </ButtonGroup>
            </ButtonArea>

            </FormCard>
            </PageContent>
        </>

    )
}

export default BoardDetail;