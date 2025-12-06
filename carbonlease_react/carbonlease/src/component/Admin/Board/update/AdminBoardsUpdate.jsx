import {
  CancelButton,
  FormButtonGroup,
  FormCard,
  FormCardBody,
  FormCardHeader,
  FormContainer,
  PageHeader,
  SubmitButton
} from "../../../Common/DataTable/DataTable.styled";

import FormField from "../../../Common/Form/FormField";
import { useAdminBoardUpdate } from "./hooks/useAdminBoardUpdate";

const AdminBoardUpdate = () => {

  const {
    formData,
    errors,
    regionOptions,
    handleChange,
    handleSubmit,
    handleCancel
  } = useAdminBoardUpdate();

  return (
    <FormContainer>
      <PageHeader>
        <h1>일반 게시글 수정</h1>
      </PageHeader>

      <FormCard>
        <FormCardHeader>
          <h5>게시글 정보</h5>
        </FormCardHeader>

        <FormCardBody>
          <form onSubmit={handleSubmit}>

            {/* 제목 */}
            <FormField
              label="제목"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              required
              placeholder="게시글 제목을 입력하세요"
            />

            {/* 지역 */}
            <FormField
              label="지역"
              type="select"
              name="regionNo"
              value={formData.regionNo}
              onChange={handleChange}
              error={errors.regionNo}
              required
              options={regionOptions}
            />

            {/* 내용 */}
            <FormField
              label="내용"
              type="textarea"
              name="content"
              value={formData.content}
              onChange={handleChange}
              error={errors.content}
              required
              rows={8}
              placeholder="게시글 내용을 입력하세요"
            />

            <FormButtonGroup>
              <CancelButton type="button" onClick={handleCancel}>
                취소
              </CancelButton>

              <SubmitButton type="submit">
                수정
              </SubmitButton>
            </FormButtonGroup>

          </form>
        </FormCardBody>
      </FormCard>
    </FormContainer>
  );
};

export default AdminBoardUpdate;
