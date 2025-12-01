import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle";
import PageContent from "../../Common/PageContent/PageContent";
import TextInputSection from "../ActivityInsertForm/components/TextInputSection";
import AddressSearchInput from "../ActivityInsertForm/components/AddressSearchInput";
import CategorySelect from "../ActivityInsertForm/components/CategorySelect";
import RegionSelect from "../ActivityInsertForm/components/RegionSelect";
import ImagePreviewBox from "../ActivityInsertForm/components/ImagePreviewBox";
import { ActivityForm, ButtonSection, CancelButton, FormArea, InputButton, SelectLabel, SelectRow } from "../../ActivityBoard/ActivityInsertForm/ActivityInsertForm.styles";
import useToast from "../ActivityBoardDetail/hooks/useToast";
import useUpdateFormState from "./hooks/useUpdateFormState";
import useUpdateSubmit from "./hooks/useUpateSubmit";
import Toast from "../../Common/Toast/Toast";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";

const ActivityUpdateForm = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  const {
    toastMessage,
    showToast,
    toastVariant,
    showToastMessage,
    closeToast
  } = useToast();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      const timer = setTimeout(() => navigate("/login"), 1500);
      return () => clearTimeout(timer);
    }
  }, [auth.isAuthenticated]);

  if (!auth.isAuthenticated) {
    return (
      <Toast
        message="로그인이 필요한 서비스입니다!"
        isVisible={true}
        variant="error"
        onClose={() => {}}
      />
    );
  }

  const {
    title, setTitle,
    content, setContent,
    address, setAddress,
    lat, setLat,
    lng, setLng,
    regionNo, setRegionNo,
    category, setCategory,
    file, setFile,
    originImage
  } = useUpdateFormState(id);

  const { handleSubmit } = useUpdateSubmit({
    title,
    content,
    address,
    lat,
    lng,
    regionNo,
    category,
    file,
    activityNo: id,
    navigate,
    showToastMessage
  });

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
              onChange={(addr, lt, lg) => {
                setAddress(addr);
                setLat(lt);
                setLng(lg);
              }}
            />

            <hr />

            <SelectRow>
              <SelectLabel>활동 선택
                <CategorySelect value={category} onChange={setCategory} />
              </SelectLabel>

              <SelectLabel>지역 선택
                <RegionSelect value={regionNo} onChange={setRegionNo} />
              </SelectLabel>
            </SelectRow>

            <hr />
            <label><strong>사진 미리보기</strong></label>
            
            <ImagePreviewBox file={file} origin={originImage} />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <hr />
            <ButtonSection>
              <InputButton type="submit">수정</InputButton>
              <CancelButton type="button" onClick={() => window.history.back()}>취소</CancelButton>
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
  );
};

export default ActivityUpdateForm;
