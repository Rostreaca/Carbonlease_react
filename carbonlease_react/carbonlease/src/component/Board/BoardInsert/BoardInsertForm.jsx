import { useState, useEffect } from "react";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle"
import PageContent from "../../Common/PageContent/PageContent"
import { BoardForm, ButtonSection, FormArea, SelectLabel, SelectRow } from "./BoardInsertForm.styles";
import RegionSelect from '../../../component/ActivityBoard/ActivityInsertForm/components/RegionSelect.jsx';
import CategorySelect from "../../../component/ActivityBoard/ActivityInsertForm/components/CategorySelect";
import TextInputSection from "../../../component/ActivityBoard/ActivityInsertForm/components/TextInputSection";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BoardInsertForm = () => {
  console.log( " 새글 등록  ");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [regionNo, setRegionNo] = useState("");
  const [category, setCategory] = useState(""); 

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if(!token){
      alert("로그인 후 이용해주세요!");
      navigate("/login");
    }
  }, [navigate]);

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

    

    const board = {
      boardTitle : title,
      boardContent : content,
      regionNo : regionNo,
      viewCount : 0
    };

    regBoardcall(board);

    console.log( " 새글 등록 input {} ",  board);

  };


  const regBoardcall = async (board) => {
    const accessToken = localStorage.getItem("accessToken");
    await axios
            .post(`http://localhost/boards/boardInsert`, board, {
              headers: {
                Authorization : `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              }
            })
            .then((result) => {
                const response = result.data;
                console.log("새글 데이터:", response);
                if (response.boardInsert == 1) {
                  alert("등록되었습니다.");
                  navigate(`/boards`)
                } else {
                  alert("새글 등록이 실패!");
                  
                }
                
            })
  };

  return (
    <>
      <PageTitle
        title="일반 게시글 작성"
        breadcrumbs={[
          { label: 'Home', path: '/'},
          { label: '일반게시판', path: '/boards'},
          { label: '일반 게시글 작성', current: true }
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
            <button type="submit">등록</button>
            <button type="button" onClick={() => window.history.back()}>취소</button>
            </ButtonSection>
            </BoardForm>
          </FormArea>
        </PageContent>
    </>
  )
}

export default BoardInsertForm;