import {
    CancelButton,
    FormButtonGroup,
    FormCard,
    FormCardBody,
    FormCardHeader,
    FormContainer,
    PageHeader,
    SubmitButton
} from '../../../../Common/DataTable/DataTable.styled';
import FormField from '../../../../Common/Form/FormField';
import useUpdateForm from '../useUpdateForm';


const FormCardBodyComponent = ({onShowToast, $campaign, auth}) => {
    const {
        formData,
        fileNames,
        errors,
        categoryOptions,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleCancel
    } = useUpdateForm(onShowToast, auth);
    

    return (
        <form onSubmit={handleSubmit}>
            <FormField
                label="제목"
                type="text"
                name="campaignTitle"
                value={formData.campaignTitle}
                onChange={handleChange}
                error={errors.campaignTitle}
                required
                placeholder="캠페인 제목을 입력하세요"
            />

            <FormField
                label="카테고리"
                type="select"
                name="categoryNo"
                value={formData.categoryNo}
                onChange={handleChange}
                error={errors.categoryNo}
                required
                options={categoryOptions}
            />

            <FormField
                label="내용"
                type="textarea"
                name="campaignContent"
                value={formData.campaignContent}
                onChange={handleChange}
                error={errors.campaignContent}
                required
                placeholder="캠페인 내용을 입력하세요"
                rows={8}
            />

            <FormField
                label="썸네일 이미지"
                type="file"
                name="thumbnailFile"
                onChange={handleFileChange}
                error={errors.thumbnailFile}
                accept="image/*"
                fileName={fileNames.thumbnail}
                imageUrl={formData.thumbnailUrl}
            />

            <FormField
                label="상세 이미지"
                type="file"
                name="detailImageFile"
                onChange={handleFileChange}
                error={errors.detailImageFile}
                accept="image/*"
                fileName={fileNames.detailImage}
                imageUrl={formData.detailImageUrl}
            />

            <FormField
                label="시작일"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                error={errors.startDate}
                required
            />

            <FormField
                label="종료일"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                error={errors.endDate}
                required
            />

            <FormButtonGroup>
                <CancelButton type="button" onClick={handleCancel}>
                    <i className="fas fa-times"></i>
                    취소
                </CancelButton>
                <SubmitButton type="submit">
                    <i className="fas fa-check"></i>
                    수정
                </SubmitButton>
            </FormButtonGroup>
        </form>
    );
};

export default FormCardBodyComponent;
