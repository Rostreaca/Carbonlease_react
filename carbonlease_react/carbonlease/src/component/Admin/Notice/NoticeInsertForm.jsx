import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CancelButton,
    FormButtonGroup,
    FormCard,
    FormCardBody,
    FormCardHeader,
    FormContainer,
    PageHeader,
    SubmitButton
} from '../../Common/DataTable/DataTable.styled';
import FormField from '../../Common/Form/FormField';

const NoticeInsertForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        noticeTitle: '',
        noticeContent: '',
        file: null,
        enrollDate: '',
        fix:''
    });

    const [fileNames, setFileNames] = useState({
        file: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user enrolls typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));

            // Clear error
            if (errors[name]) {
                setErrors(prev => ({
                    ...prev,
                    [name]: ''
                }));
            }
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.noticeTitle.trim()) {
            newErrors.noticeTitle = '제목을 입력해주세요.';
        }

        if (!formData.noticeContent.trim()) {
            newErrors.noticeContent = '내용을 입력해주세요.';
        }

        if (!formData.file) {
            newErrors.file = '첨부파일을 선택해주세요.';
        }

        if (!formData.fix) {
            newErrors.fix = '고정여부 선택.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        // TODO: API 호출 로직
        console.log('Form submitted:', formData);
        
        // 임시: 목록 페이지로 이동
        // navigate('/admin/notices');
    };

    const handleCancel = () => {
        navigate('/admin/notices');
    };

    return (
        <FormContainer>
            <PageHeader>
                <h1>공지사항 등록</h1>
            </PageHeader>

            <FormCard>
                <FormCardHeader>
                    <h5>공지사항 정보</h5>
                </FormCardHeader>

                <FormCardBody>
                    <form onSubmit={handleSubmit}>
                        <FormField
                            label="제목"
                            type="text"
                            name="noticeTitle"
                            value={formData.noticeTitle}
                            onChange={handleChange}
                            error={errors.noticeTitle}
                            required
                            placeholder="공지사항 제목을 입력하세요"
                        />

                        <FormField
                            label="사용 여부"
                            type="toggle-switch"
                            name="isActive"
                            value={formData.isActive}
                            onChange={handleChange}
                        />




                        <FormField
                            label="내용"
                            type="textarea"
                            name="noticeContent"
                            value={formData.noticeContent}
                            onChange={handleChange}
                            error={errors.noticeContent}
                            required
                            placeholder="공지사항 내용을 입력하세요"
                            rows={8}
                        />

                        <FormField
                            label="첨부파일"
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                            error={errors.file}
                            required
                            accept="image/*"
                            fileName={fileNames.file}
                        />

                        <FormButtonGroup>
                            <CancelButton type="button" onClick={handleCancel}>
                                <i className="fas fa-times"></i>
                                취소
                            </CancelButton>
                            <SubmitButton type="submit">
                                <i className="fas fa-check"></i>
                                등록
                            </SubmitButton>
                        </FormButtonGroup>
                    </form>
                </FormCardBody>
            </FormCard>
        </FormContainer>
    );
};

export default NoticeInsertForm;
