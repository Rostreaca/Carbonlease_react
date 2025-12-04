import { useState, useEffect } from "react";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle.jsx"
import PageContent from "../../Common/PageContent/PageContent.jsx"
import { BoardForm, ButtonSection, FormArea, SelectLabel, SelectRow } from "./BoardUpdateForm.styles.js";
import RegionSelect from '../../ActivityBoard/ActivityInsertForm/components/RegionSelect.jsx';
import CategorySelect from "../../ActivityBoard/ActivityInsertForm/components/CategorySelect.jsx";
import TextInputSection from "../../ActivityBoard/ActivityInsertForm/components/TextInputSection.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from 'react-router-dom';

const BoardInsertForm = () => {
  console.log( " 수정페이지  ");
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [regionNo, setRegionNo] = useState("");
  const [category, setCategory] = useState("");
  const [board, setBoard] = useState([]);


  useEffect(() => {

    if(!token){
      alert("로그인 후 이용해주세요!");
      navigate("/login");
    }
    fetchReplies();

  }, [id]);

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
                    boardNo: response.boardDetail.boardNo,
                    memberId: response.boardDetail.memberId,
                });

                setTitle(response.boardDetail.boardTitle);
                setContent(response.boardDetail.boardContent);
                setRegionNo(response.boardDetail.regionNo);
            })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다!");
      navigate("/login");
      return;
    }

    if(!title) return alert("제목을 입력해주세요!");
    if(!content) return alert("내용을 입력해주세요!");
    if(!regionNo) return alert("지역 카테고리를 선택해주세요!");

    const boardVO = {
      boardTitle : title,
      boardContent : content,
      regionNo : regionNo,
      boardNo : board.boardNo,
      memberId : board.memberId,
      viewCount : 0
    };

    regBoardcall(boardVO);

    console.log( " 새글 등록 input {} ",  boardVO);

  };


  const regBoardcall = async (boardVO) => {
    const accessToken = localStorage.getItem("accessToken");
    await axios
            .post(`http://localhost/boards/boardUpdate`, boardVO, {
              headers: {
                Authorization : `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              }
            })
            .then((result) => {
                const response = result.data;
                console.log("새글 데이터:", response);
                if (response.updateOK == 1) {
                  alert("수정 되었습니다.");
                  navigate(`/boards`)
                } else {
                  alert("수정 실패!");
                  
                }
                
            })
  };

  return (
    <>
      <PageTitle
        title="일반 게시글 수정"
        breadcrumbs={[
          { label: 'Home', path: '/'},
          { label: '일반게시판', path: '/boards'},
          { label: '일반 게시글 수정', current: true }
        ]}
        />

        <PageContent>
          <FormArea>
            <BoardForm onSubmit={handleSubmit}>
            <TextInputSection 
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
            />

            <hr />

            <SelectRow>
              <SelectLabel>활동 선택
              <CategorySelect value={category} onChange={setCategory}/>
              </SelectLabel>

              <SelectLabel>지역 선택
              <RegionSelect value={regionNo} onChange={setRegionNo}/>
              </SelectLabel>
            </SelectRow>
            

            <hr />
            <ButtonSection>
            <button type="submit">수정</button>
            <button type="button" onClick={() => window.history.back()}>취소</button>
            </ButtonSection>
            </BoardForm>
          </FormArea>
        </PageContent>
    </>
  )
}

export default BoardInsertForm;