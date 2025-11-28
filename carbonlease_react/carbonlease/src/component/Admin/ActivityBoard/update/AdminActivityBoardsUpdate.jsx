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
import FormField from '../../../Common/Form/FormField';
import { useAdminActivityBoardUpdate } from './hooks/useAdminActivityBoardUpdate';

const AdminActivityBoardUpdate = () => {
  const {
    formData,
    errors,
    thumbnailPreview,
    thumbnailFileName,
    categoryOptions,
    handleChange,
    handleSubmit,
    handleCancel,
    handleFileChange,
  } = useAdminActivityBoardUpdate();

  return (
    <FormContainer>
      <PageHeader>
        <h1>인증 게시글 수정</h1>
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
              name="activityTitle"
              value={formData.activityTitle}
              onChange={handleChange}
              error={errors.activityTitle}
              required
              placeholder="게시글 제목을 입력하세요"
            />

            {/* 카테고리 */}
            <FormField
              label="카테고리"
              type="select"
              name="category"
              value={formData.category}
              onChange={handleChange}
              error={errors.category}
              required
              options={categoryOptions}
            />

            {/* 내용 */}
            <FormField
              label="내용"
              type="textarea"
              name="activityContent"
              value={formData.activityContent}
              onChange={handleChange}
              error={errors.activityContent}
              required
              rows={8}
              placeholder="게시글 내용을 입력하세요"
            />

            {/* 썸네일 이미지 (선택) */}
            <FormField
              label="썸네일 이미지"
              type="file"
              name="thumbnailFile"
              onChange={handleFileChange}
              error={errors.thumbnailFile}
              accept="image/*"
              fileName={thumbnailFileName}
            />


            {/* 썸네일 미리보기 */}
            {thumbnailPreview && (
              <div style={{ marginTop: '0.75rem' }}>
                <span
                  style={{
                    display: 'block',
                    marginBottom: '0.25rem',
                    fontSize: '0.875rem',
                    color: '#6c757d'
                  }}
                >
                  현재 썸네일 미리보기
                </span>
                <img
                  src={thumbnailPreview}
                  alt="썸네일 미리보기"
                  style={{
                    maxWidth: '240px',
                    maxHeight: '160px',
                    borderRadius: '0.25rem',
                    border: '1px solid #dee2e6',
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}

            <FormButtonGroup>
              <CancelButton type="button" onClick={handleCancel}>
                <i className="fas fa-times" />
                취소
              </CancelButton>
              <SubmitButton type="submit">
                <i className="fas fa-check" />
                수정
              </SubmitButton>
            </FormButtonGroup>
          </form>
        </FormCardBody>
      </FormCard>
    </FormContainer>
  );
};

export default AdminActivityBoardUpdate;
