import { useState, useEffect } from 'react';
import { insertCampaign, fetchCategoryOptions } from '../../../../api/campaign/adminCampaignApi';
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
} from '../../../Common/DataTable/DataTable.styled';
import FormField from '../../../Common/Form/FormField';

const InsertForm = () => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [categoryOptions, setCategoryOptions] = useState([]);

    // 폼 데이터 상태 관리
    const [formData, setFormData] = useState({
        campaignTitle: '',
        categoryNo: '',
        campaignContent: '',
        thumbnailFile: null,
        detailImageFile: null,
        startDate: '',
        endDate: ''
    });

    // 파일 이름 상태 관리
    const [fileNames, setFileNames] = useState({
        thumbnail: '',
        detailImage: ''
    });
    

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        fetchCategoryOptions(accessToken)
            .then(res => {
                const options = res.data.map(cat => ({ value: cat.categoryNo, label: cat.categoryName }));
                setCategoryOptions(options);
            })
            .catch(() => {
                setCategoryOptions([]);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
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
            
            // Update file name display
            const fileType = name === 'thumbnailFile' ? 'thumbnail' : 'detailImage';
            setFileNames(prev => ({
                ...prev,
                [fileType]: files[0].name
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

        if (!formData.campaignTitle.trim()) {
            newErrors.campaignTitle = '제목을 입력해주세요.';
        }

        if (!formData.categoryNo) {
            newErrors.categoryNo = '카테고리를 선택해주세요.';
        }

        if (!formData.campaignContent.trim()) {
            newErrors.campaignContent = '내용을 입력해주세요.';
        }

        if (!formData.thumbnailFile) {
            newErrors.thumbnailFile = '썸네일 이미지를 선택해주세요.';
        }

        if (!formData.detailImageFile) {
            newErrors.detailImageFile = '상세 이미지를 선택해주세요.';
        }

        if (!formData.startDate) {
            newErrors.startDate = '시작일을 선택해주세요.';
        }

        if (!formData.endDate) {
            newErrors.endDate = '종료일을 선택해주세요.';
        }

        if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
            newErrors.endDate = '종료일은 시작일 이후여야 합니다.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        // FormData 생성
        const campaign = {
            campaignTitle: formData.campaignTitle,
            categoryNo: formData.categoryNo,
            campaignContent: formData.campaignContent,
            startDate: formData.startDate,
            endDate: formData.endDate
        };
        const files = [formData.thumbnailFile, formData.detailImageFile].filter(Boolean);
        const accessToken = localStorage.getItem('accessToken');

        try {
            await insertCampaign(campaign, files, accessToken);
            // 성공 시 목록 페이지로 이동
            navigate('/admin/campaigns');
        } catch (error) {
            alert('등록에 실패했습니다.', error);
        }
    };

    const handleCancel = () => {
        navigate('/admin/campaigns');
    };

    return (
        <FormContainer>
            <PageHeader>
                <h1>캠페인 등록</h1>
            </PageHeader>

            <FormCard>
                <FormCardHeader>
                    <h5>캠페인 정보</h5>
                </FormCardHeader>
                <FormCardBody>
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
                            required
                            accept="image/*"
                            fileName={fileNames.thumbnail}
                        />

                        <FormField
                            label="상세 이미지"
                            type="file"
                            name="detailImageFile"
                            onChange={handleFileChange}
                            error={errors.detailImageFile}
                            required
                            accept="image/*"
                            fileName={fileNames.detailImage}
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
                                등록
                            </SubmitButton>
                        </FormButtonGroup>
                    </form>
                </FormCardBody>
            </FormCard>
        </FormContainer>
    );
};

export default InsertForm;
