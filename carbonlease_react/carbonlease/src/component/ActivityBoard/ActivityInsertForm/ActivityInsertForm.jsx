import PageTitle from "../../Common/Layout/PageTitle/PageTitle"
import PageContent from "../../Common/PageContent/PageContent"
import AddressSearchInput from "./components/AddressSearchInput";
import ImagePreviewBox from "./components/ImagePreviewBox";
import { ActivityForm, ButtonSection, FormArea, SelectLabel, SelectRow } from "./ActivityInsertForm.styles";
import RegionSelect from "./components/RegionSelect";
import CategorySelect from "./components/CategorySelect";
import TextInputSection from "./components/TextInputSection";
import { useNavigate } from "react-router-dom";
import useInsertFormState from "./hooks/useInsertFormState";
import useInsertSubmit from "./hooks/useInsertSubmit";
import useToast from "../ActivityBoardDetail/hooks/useToast";
import Toast from "../../Common/Toast/Toast";


const ActivityInsertForm = () => {
  
  const navigate = useNavigate();

  const {
    toastMessage,
    showToast,
    toastVariant,
    showToastMessage,
    closeToast
  } = useToast();

  const {
    title, setTitle,
    content, setContent,
    address, lat, lng, handleAddressChange,
    regionNo, setRegionNo,
    category, setCategory,
    file, handleChangeFile
  } = useInsertFormState();

  const { handleSubmit } = useInsertSubmit({
    title,
    content,
    address,
    lat,
    lng,
    regionNo,
    category,
    file,
    navigate,
    showToastMessage
  });

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
              onChange={handleAddressChange}
            />

            <hr />

            <SelectRow>
              <SelectLabel>지역 선택
              <RegionSelect value={regionNo} onChange={setRegionNo}/>
              </SelectLabel>
              
              <SelectLabel>활동 선택
              <CategorySelect value={category} onChange={setCategory}/>
              </SelectLabel>
            </SelectRow>
            
            <hr />
            <label><strong>사진 미리보기</strong></label>
            <ImagePreviewBox file={file}/>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => handleChangeFile(e.target.files[0])} 
            />

            <hr />
            <ButtonSection>
            <button type="submit">등록</button>
            <button type="button" onClick={() => window.history.back()}>취소</button>
            </ButtonSection>
            </ActivityForm>
          </FormArea>
        </PageContent>

        <Toast 
          message={toastMessage}
          isVisible={showToast}
          variant={toastVariant}
          onClose={closeToast}
        />
    </>
  )
}

export default ActivityInsertForm;