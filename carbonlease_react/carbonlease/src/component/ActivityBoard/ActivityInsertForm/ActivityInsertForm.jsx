import { useState, useEffect } from "react";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle"
import PageContent from "../../Common/PageContent/PageContent"
import AddressSearchInput from "./components/AddressSearchInput";
import ImagePreviewBox from "./components/ImagePreviewBox";
import { ActivityForm, ButtonSection, FormArea, SelectLabel, SelectRow } from "./ActivityInsertForm.styles";
import RegionSelect from "./components/RegionSelect";
import CategorySelect from "./components/CategorySelect";
import TextInputSection from "./components/TextInputSection";
import { activityInsertForm } from "../../../api/activity/activityAPI";
import { useNavigate } from "react-router-dom";


const ActivityInsertForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [regionNo, setRegionNo] = useState("");
  const [category, setCategory] = useState(""); 

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        title="인증 게시글 작성"
        breadcrumbs={[
          { label: 'Home', path: '/'},
          { label: '인증게시판', path: '/ActivityBoards'},
          { label: '인증 게시글 작성', current: true }
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
  )
}

export default ActivityInsertForm;