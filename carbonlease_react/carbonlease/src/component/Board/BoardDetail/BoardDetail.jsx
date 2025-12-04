import { useParams } from 'react-router-dom';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Modal } from 'react-bootstrap';
import BoardReply from './BoardReply.jsx';
import RegionSelect from '../../../component/ActivityBoard/ActivityInsertForm/components/RegionSelect.jsx';
import ReplyPagination from '../../Common/UI/ReplyPagination.jsx';
import { BackButton, FormArea, StyledButton } from './BoardDetailStyles.js';
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { useRef } from "react";
import { increaseViewCountAPI } from "../../../api/board/boardAPI.js";

const BoardDetail = () => {
    const accessToken = localStorage.getItem("accessToken");
    const navigate = useNavigate();
    const {id} = useParams();
    const [board, setBoard] = useState([]);
    const [post, setPost] = useState([]);
    const [reply, setReply] = useState([]);
    const [regionNo, setRegionNo] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const {auth} = useContext(AuthContext);


    const handleUpdate = () => {
      console.log("수정 로그인 체크:", auth);
      if (!auth) {
        alert("로그인이 필요한 서비스입니다!");
        navigate("/login");
        return;
      }
      console.log("수정 로그인 체크:", id);
       navigate(`/boards/UpdateForm/${id}`);
  }; 

    const goList = () => {
        navigate("/boards");
  };

  const handlereply = () => {
      alert("댓글 수정!!");
  }; 

    // 좋아요
  const handleLikeToggle = () => {
    setPost(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };


    // 조회수 증가
   useEffect(() => {
    const viewCount = async () => {
      if (!id || !board) return;

      const key = `viewed_${id}`;
      if (!localStorage.getItem(key)) {
        try {
          await increaseViewCountAPI(id); // boardAPI.js에 정의된 함수 사용
          localStorage.setItem(key, "true");

          // 화면 즉시 반영
          setBoard(prev => prev ? { ...prev, viewCount: prev.viewCount + 1 } : prev);
        } catch (error) {
          console.error("조회수 증가 실패:", error);
        }
      }
    };

    viewCount();
  }, [id, board]);
 

  const fetchReplies = async () => {
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
                    replyCount: response.replyCount.endPage,
                    boardNo: response.boardDetail.boardNo,
                    memberId: response.boardDetail.memberId,
                });
                console.log("댓글데이터 : ", response.replyList.length);
                setReply([
                    ...response.replyList]);
            })
  }

     useEffect(()=>{
        fetchReplies();
    }, [id])
    
    const replyBt = () => {
      // alert("댓글 등록!!");
      console.log("login ", auth);

      if (!auth) {
        alert("로그인이 필요한 서비스입니다!");
        navigate("/login");
        return;
      }

      insertReplay();
    }

    const replyTextarea = useRef(null);
    const insertReplay = async  () =>{
      console.log( "댓글 내용 : ",  replyTextarea.current.value);
      
      if (replyTextarea.current.value == "") {
        alert("댓글 내용을 입력하세요");
        return;
      }

      const ReplyInsertVO = {
         memberNo : auth.memberNo,
         nickname : auth.nickname,
         boardNo : board.boardNo,
         replyContent : replyTextarea.current.value,
      };

      await axios
            .post(`http://localhost/boards/detail/replyInsert`, ReplyInsertVO, {
              headers: {
                Authorization : `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              }
            })
            .then((result) => {
                const response = result.data;
                console.log("상세보기 데이터:", response);
                alert("등록되었습니다.");
                console.log("게시글 번호 :", {id});
                fetchReplies();
            })
    }

    // 게시글 삭제
    const handleDelete = async () => {
      console.log("삭제 로그인 체크:", auth);
      if (!auth) {
        alert("로그인이 필요한 서비스입니다!");
        navigate("/login");
        return;
      }
       console.log("댓글길이 : {}", reply.length);

       if(reply.length > 0) {
          const isOk = confirm("댓글이 존재합니다. 삭제 하시겠습니까?");
          if(isOk){
            // alert("삭제호출");
                  const deleteVo = {
              boardNo:board.boardNo,
              memberId:board.memberId,  //게시글 작성자ID
            };

            await axios
                  .post(`http://localhost/boards/delete`, deleteVo, {
                    headers: {
                      Authorization : `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                    }
                  })
                  .then((result) => {
                      const response = result.data;
                      console.log("상세보기 데이터:", response.deleteOK);
                      if(response.deleteOK > 0) {
                        alert("삭제되었습니다.");
                         navigate(`/boards`);
                      } else {
                        alert("게시글 삭제 오류");
                      }
                      //fetchReplies();
                  })
          } else {
            alert("삭제취소");
          }
       } else {
              const deleteVo = {
              boardNo:board.boardNo,
              memberId:board.memberId,  //게시글 작성자ID
            };

            await axios
                  .post(`http://localhost/boards/delete`, deleteVo, {
                    headers: {
                      Authorization : `Bearer ${accessToken}`,
                      "Content-Type": "application/json",
                    }
                  })
                  .then((result) => {
                      const response = result.data;
                      console.log("상세보기 데이터:", response.deleteOK);
                      if(response.deleteOK > 0) {
                        alert("삭제되었습니다.");
                         navigate(`/boards`);
                      } else {
                        alert("삭제 중 오류 발생");
                      }
                      //fetchReplies();
                  })
       }
       
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
                <FormArea style={{ padding: '50px' }}>
                {/* <Form.Label /><strong>No : {} </strong> */}

            {/* 좋아요 */}
            <StyledButton $liked={post.isLiked} onClick={handleLikeToggle}>
                <i className={post.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
                {post.isLiked ? '좋아요' : '좋아요'}
            </StyledButton>  <br /><br />      


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
            <ReplyPagination currentPage={1} totalPages={board.replyCount} />  

            {/* <ReplyButton onClick={handlereply}> 수정 </ReplyButton> | <ReplyButton> 삭제 </ReplyButton>   */}
            
              {/* {댓글 등록} */}
            <Form.Label><strong>댓글</strong></Form.Label>
              <Form.Control
                ref={replyTextarea}
                as="textarea"
                placeholder="댓글을 입력해주세요."
                maxLength={1000}
                style={{ height: '100px', width: "600px" }}
              />
                <BackButton variant="outline-success" onClick={replyBt}>
                    댓글 등록
                    <Modal onClick={(showAlert) => setShowAlert(true)}
                        show={showAlert}
                        onClose={() => setShowAlert(true)}
                        title="알림"
                        message="댓글이 등록되었습니다."
                        variant="info"
                    />
                </BackButton>  




            {/* 버튼 */}
                <BackButton onClick={goList}>목록으로</BackButton>
                {(board.memberId === auth.memberId) && (
                  <BackButton onClick={handleUpdate}>수정</BackButton>
                )}
                {(board.memberId === auth.memberId) && (
                <BackButton onClick={handleDelete}>삭제</BackButton>
                )}

                <div> 
                      조회수 : {board.viewCount} </div> <br />
              </FormArea>
            </PageContent>
        </>
    );
};


export default BoardDetail;