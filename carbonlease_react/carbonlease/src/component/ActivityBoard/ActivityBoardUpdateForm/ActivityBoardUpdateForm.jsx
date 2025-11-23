
import { useEffect, useState } from "react";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle";
import PageContent from "../../Common/PageContent/PageContent";
import { ActivityForm, ButtonSection, FormArea, SelectLabel, SelectRow } from "./ActivityBoardUpdateForm.styles";
import TextInputSection from "../ActivityInsertForm/components/TextInputSection";
import AddressSearchInput from "../ActivityInsertForm/components/AddressSearchInput";
import CategorySelect from "../ActivityInsertForm/components/CategorySelect";
import RegionSelect from "../ActivityInsertForm/components/RegionSelect";
import ImagePreviewBox from "../ActivityInsertForm/components/ImagePreviewBox";
import { useNavigate } from "react-router-dom";

const ActivityBoardUpdateForm = () => {

  const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
  
    const [address, setAddress] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
  
    const [regionNo, setRegionNo] = useState("");
    const [category, setCategory] = useState(""); 
  
    const [file, setFile] = useState(null);
  
    useEffect(() => {
      const token = localStorage.getItem("accessToken");
  
      if(!token){
        alert("로그인 후 이용해주세요!");
        navigate("/login");
      }
    }, [navigate]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!accessToken) {
        alert("로그인이 필요한 서비스입니다!");
        navigate("/login");
        return;
      }
  
      if(!title) return alert("제목을 입력해주세요!");
      if(!content) return alert("내용을 입력해주세요!");
      if(!address || !lat || !lng) return alert("주소를 입력해주세요!");
      if(!regionNo || !category) return alert("지역 or 탄소절감 카테고리를 선택해주세요!");
  
      const accessToken = localStorage.getItem("accessToken");
  
      const activity = {
        title,
        content,
        address,
        lat,
        lng,
        certificationNo: category,
        regionNo,
      };
  
      try{
        const res = await activityInsertForm(activity, file, accessToken);
        const activityNo = res.data.activityNo;
  
        navigate(`/activityBoards/${activityNo}`);
        alert("등록 성공!");
      } catch(err) {
        console.error(err);
        alert("등록 실패!");
      }
  
    };


 
  return (
    <>
      <PageTitle
        title="인증 게시글 수정"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "인증 게시판", path: "/activityBoards" },
          { label: "인증 게시글 수정", current: true }
        ]}
      />

      <PageContent>
        <FormArea>
            <ActivityForm onSubmit={handleSubmit}>
            <TextInputSection 
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
            />

            <label><strong>주소</strong></label>
            <AddressSearchInput 
              value={address}
              onChange={(addr, latValue, lngValue) => {
                setAddress(addr);
                setLat(latValue);
                setLng(lngValue);
              }}
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
            <label><strong>사진 미리보기</strong></label>
            <ImagePreviewBox file={file}/>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setFile(e.target.files[0])} 
            />

            <hr />
            <ButtonSection>
            <button type="submit">등록</button>
            <button type="button" onClick={() => window.history.back()}>취소</button>
            </ButtonSection>
            </ActivityForm>
          </FormArea>
      </PageContent>
    </>
  );
};

export default ActivityBoardUpdateForm;
