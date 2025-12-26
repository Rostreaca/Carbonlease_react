
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getCategories, update } from '../../../../api/campaign/adminCampaignApi';

// 어드민 캠페인 수정 폼 관리 커스텀 훅
const UpdateForm = (onShowToast, auth) => {
    // ===== 라우터 및 상태 선언 =====
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const campaign = location.state;

    // 폼 입력값, 에러, 파일명, 카테고리 옵션
    const [formData, setFormData] = useState({
        campaignTitle: '',
        categoryNo: '',
        campaignContent: '',
        thumbnailFile: null,
        detailImageFile: null,
        startDate: '',
        endDate: ''
    });
    const [errors, setErrors] = useState({});
    const [fileNames, setFileNames] = useState({ thumbnail: '', detailImage: '' });
    const [categoryOptions, setCategoryOptions] = useState([]);

    // ===== 카테고리 옵션 불러오기 =====
    useEffect(() => {
        getCategories()
            .then((result) => {
                const options = result.data.data.map(c => ({ value: c.categoryNo, label: c.categoryName }));
                setCategoryOptions(options);
            })
            .catch(() => setCategoryOptions([]));
    }, []);

    // ===== 기존 캠페인 데이터로 폼 초기화 =====
    useEffect(() => {
        if (!campaign) return;
        let patched = { ...campaign };
        patched.categoryNo = String(
            campaign.category && campaign.category.categoryNo !== undefined
                ? campaign.category.categoryNo
                : campaign.categoryNo ?? ''
        );
        if (Array.isArray(campaign.attachments)) {
            const thumb = campaign.attachments.find(a => a && a.fileLevel === 0);
            const detail = campaign.attachments.find(a => a && a.fileLevel === 1);
            patched.thumbnailUrl = thumb ? thumb.filePath : '';
            patched.detailImageUrl = detail ? detail.filePath : '';
        }
        setFormData(prev => ({ ...prev, ...patched }));
        setFileNames({
            thumbnail: patched.thumbnailUrl ? patched.thumbnailUrl.split('/').pop() : '',
            detailImage: patched.detailImageUrl ? patched.detailImageUrl.split('/').pop() : ''
        });
    }, [campaign]);

    // ===== 폼 필드 변경 핸들러 =====
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    // ===== 파일 입력 핸들러 =====
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (!files || !files[0]) return;
        setFormData(prev => ({ ...prev, [name]: files[0] }));
        const fileType = name === 'thumbnailFile' ? 'thumbnail' : 'detailImage';
        setFileNames(prev => ({ ...prev, [fileType]: files[0].name }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    // ===== 폼 유효성 검사 =====
    const validate = () => {
        const newErrors = {};
        if (!formData.campaignTitle.trim()) newErrors.campaignTitle = '제목을 입력해주세요.';
        if (!formData.categoryNo) newErrors.categoryNo = '카테고리를 선택해주세요.';
        if (!formData.campaignContent.trim()) newErrors.campaignContent = '내용을 입력해주세요.';
        if (!formData.startDate) newErrors.startDate = '시작일을 선택해주세요.';
        if (!formData.endDate) newErrors.endDate = '종료일을 선택해주세요.';
        if (formData.startDate && formData.endDate && formData.startDate > formData.endDate)
            newErrors.endDate = '종료일은 시작일 이후여야 합니다.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ===== 폼 제출 핸들러 =====
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        if (auth && !auth.isAuthenticated) {
            onShowToast('로그인이 필요합니다.', 'error');
            return;
        }
        const safeThumbnail = formData.thumbnailFile ? formData.thumbnailFile : new Blob([], { type: 'image/*' });
        const safeDetail = formData.detailImageFile ? formData.detailImageFile : new Blob([], { type: 'image/*' });
        try {
            const result = await update(id, [safeThumbnail, safeDetail], formData);
            if (result && result.status === 200) {
                onShowToast('게시글 수정이 완료되었습니다!', 'success');
                setTimeout(() => navigate('/admin/campaigns'), 800);
            }
        } catch (error) {
            if (error?.response?.status === 401) {
                onShowToast('로그인이 필요합니다.', 'error');
            } else if (error?.response?.status === 403) {
                onShowToast('권한이 없습니다.', 'error');
            } else {
                onShowToast(error?.response?.data?.['error-message'] || '수정에 실패했습니다.', 'error');
            }
        }
    };

    // ===== 취소 핸들러 =====
    const handleCancel = () => {
        navigate('/admin/campaigns');
    };

    // ===== 반환 객체 =====
    return {
        formData,
        setFormData,
        fileNames,
        setFileNames,
        errors,
        setErrors,
        categoryOptions,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleCancel
    };
};

export default UpdateForm;