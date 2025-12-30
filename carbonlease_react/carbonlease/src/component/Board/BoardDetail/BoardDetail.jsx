import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../../api/api.js';
import { deleteReplyApi, getRepliesApi, increaseViewCountApi, insertReplyApi, updateReplyApi } from '../../../api/board/boardApi.js';
import RegionSelect from '../../../component/ActivityBoard/ActivityInsertForm/components/RegionSelect.jsx';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import ReplyPagination from '../../Common/UI/ReplyPagination.jsx';
import { AuthContext } from "../../Context/AuthContext";
import { BackButton, FormArea, StyledButton } from './BoardDetailStyles.js';
import BoardReply from './BoardReply.jsx';

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
    const [replyNo, setReplyNo] = useState([]);


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
      if (!id) return;

      const key = `viewed_${id}`;
      if (!localStorage.getItem(key)) {
        try {
          await increaseViewCountApi(id); // boardApi.js에 정의된 함수 사용
          localStorage.setItem(key, "true");

          // 화면 즉시 반영
          setBoard(prev => prev ? { ...prev, viewCount: prev.viewCount + 1 } : prev);
        } catch (error) {
          console.error("조회수 증가 실패:", error);
        }
      }
    };

    viewCount();
  }, [id]);
 

  const fetchReplies = async () => {
    try {
      const result = await getRepliesApi(id);
      const response = result.data;
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
      setReply([...response.replyList]);
    } catch (error) {
      console.error('댓글 목록 조회 실패:', error);
    }
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
      const replyContent = replyTextarea.current.value;
      if (!replyContent || replyContent.trim() === "") {
        alert("댓글 내용을 입력하세요");
        return;
      }

      // 서버(Spring)에서 인증된 사용자 정보를 사용하므로, boardNo와 replyContent만 전달
      const replyData = {
        boardNo: board.boardNo,
        replyContent: replyContent.trim(),
      };
      try {
        const result = await insertReplyApi(replyData);
        const response = result.data;
        if (response.replyInsert > 0) {
          alert("댓글이 등록되었습니다.");
          replyTextarea.current.value = "";
          fetchReplies();
        } else {
          alert("댓글 등록에 실패했습니다.");
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert("로그인이 필요합니다. 다시 로그인 해주세요.");
          navigate("/login");
        } else {
          alert("댓글 등록 중 오류가 발생했습니다.");
        }
        console.error("댓글 등록 실패:", error);
      }
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

      // 댓글이 있으면 삭제 확인
      if (reply.length > 0) {
        const isOk = window.confirm("댓글이 존재합니다. 삭제 하시겠습니까?");
        if (!isOk) {
          alert("삭제취소");
          return;
        }
      }

      // 삭제 요청은 한 번만!
      const deleteVo = {
        boardNo: board.boardNo,
        memberId: board.memberId, //게시글 작성자ID
      };

      try {
        const result = await axios.post(`${API_BASE_URL}/api/boards/delete`, deleteVo, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        const response = result.data;
        console.log("상세보기 데이터:", response.deleteOK);
        if (response.deleteOK > 0) {
          alert("삭제되었습니다.");
          navigate(`/boards`);
        } else {
          alert("게시글 삭제 오류");
        }
      } catch (error) {
        alert("삭제 중 오류 발생");
      }
    }

    // 댓글 수정
    const handleUpdateReply = async (replyNo, newContent) => {
      if (!auth) {
          alert("로그인이 필요한 서비스입니다!");
          navigate("/login");
          return;
      }

          if (newContent.trim() === "") {
              alert("댓글 내용을 입력하세요.");
              return;
          }
          try {
            const updateVo = {
              replyNo: replyNo,
              replyContent: newContent,
              memberId: auth.memberId,
            };
            await updateReplyApi(updateVo);
            alert("댓글이 수정되었습니다.");
            fetchReplies();
          } catch (error) {
            console.error("댓글 수정 실패:", error);
            alert("댓글 수정 중 오류가 발생했습니다.");
          }
      };

    const handleDeleteReply = async (replyNo) => {
        if (!auth) {
            alert("로그인이 필요한 서비스입니다!");
            navigate("/login");
            return;
        }

        if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
          console.log("삭제할 댓글 번호:", replyNo);
            try {
              await deleteReplyApi(replyNo);
              alert("댓글이 삭제되었습니다.");
              fetchReplies();
            } catch (error) {
              console.error("댓글 삭제 실패:", error);
              alert("댓글 삭제 중 오류가 발생했습니다.");
            }
        }
    };

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
            {/* onUpdate와 onDelete props로 함수 전달 */}
            <BoardReply 
                data={reply} 
                onUpdate={handleUpdateReply} 
                onDelete={handleDeleteReply} 
            /> 
            <ReplyPagination currentPage={1} totalPages={board.replyCount} />  
            
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