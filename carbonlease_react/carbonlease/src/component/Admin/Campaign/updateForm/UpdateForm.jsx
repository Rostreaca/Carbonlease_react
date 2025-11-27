import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

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
import { getCategories, update } from '../../../../api/campaign/adminCampaignApi';

const UpdateForm = ({ onShowToast }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const campaign = location.state;
    const [formData, setFormData] = useState({
        campaignTitle: '',
        categoryNo: '',
        campaignContent: '',
        thumbnailFile: null,
        detailImageFile: null,
        startDate: '',
        endDate: ''
    });

    const [fileNames, setFileNames] = useState({
        thumbnail: '',
        detailImage: ''
    });


    const [errors, setErrors] = useState({});
    const [categoryOptions, setCategoryOptions] = useState([]);

    useEffect(() => {

        // 카테고리 목록 불러오기
        getCategories()
            .then((result) => {
                if (result && Array.isArray(result.data)) {
                    setCategoryOptions(
                        result.data.map(c => ({
                            value: String(c.categoryNo),
                            label: c.categoryName
                        }))
                    );
                }
            });

        if (campaign) {
            let patched = { ...campaign };

            // categoryNo를 string으로 변환 (객체/값 모두 대응)
            patched.categoryNo = String(
                campaign.category && campaign.category.categoryNo !== undefined
                    ? campaign.category.categoryNo
                    : campaign.categoryNo ?? ''
            );

            // 첨부파일(썸네일/상세) 분리 및 null-safe 처리
            if (Array.isArray(campaign.attachments)) {
                console.log('attachments:', campaign.attachments);
                const thumb = campaign.attachments.find(a => a && a.fileLevel === 0);
                const detail = campaign.attachments.find(a => a && a.fileLevel === 1);
                console.log('썸네일:', thumb);
                console.log('상세:', detail);
                patched.thumbnailUrl = thumb ? thumb.filePath : '';
                patched.detailImageUrl = detail ? detail.filePath : '';
            }

            setFormData(prev => ({
                ...prev,
                ...patched
            }));

            setFileNames({
                thumbnail: patched.thumbnailUrl ? patched.thumbnailUrl.split('/').pop() : '',
                detailImage: patched.detailImageUrl ? patched.detailImageUrl.split('/').pop() : ''
            });
        }
    }, [campaign]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
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


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        // 파일이 없으면 빈 Blob을 대신 전달 (백엔드 required=true 대응)
        const safeThumbnail = formData.thumbnailFile ? formData.thumbnailFile : new Blob([], { type: 'image/*' });
        const safeDetail = formData.detailImageFile ? formData.detailImageFile : new Blob([], { type: 'image/*' });
        console.log('update 호출:', id, formData, [safeThumbnail, safeDetail]);
        
        update(id, [safeThumbnail, safeDetail], formData)
            .then((result) => {
                console.log('update 응답:', result);
                if (result && result.status === 200) {
                    if (onShowToast) onShowToast('수정이 완료되었습니다!', 'success');
                    navigate('/admin/campaigns');
                } else {
                    if (onShowToast) onShowToast('수정에 실패했습니다.', 'error');
                }
            })
            .catch((err) => {
                console.error('update 에러:', err);
                if (onShowToast) onShowToast('수정에 실패했습니다.', 'error');
            });
    };

    const handleCancel = () => {
        navigate('/admin/campaigns');
    };

    return (
        <FormContainer>
            <PageHeader>
                <h1>캠페인 수정</h1>
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
                </FormCardBody>
            </FormCard>
        </FormContainer>
    );
};

export default UpdateForm;
