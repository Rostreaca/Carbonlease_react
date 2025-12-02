import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, save } from '../../../../api/campaign/adminCampaignApi';

// 어드민 캠페인 등록 폼 관리 커스텀 훅
const useInsertForm = (onShowToast) => {

	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
        
    // category 옵션 불러오기
	const [categoryOptions, setCategoryOptions] = useState([]);

    // form 데이터 상태 관리
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
		// 카테고리 옵션 불러오기
		getCategories()
			.then((result) => {
				//console.log('카테고리 API 응답:', result.data);
				const options = result.data.map(c => ({ value: c.categoryNo, label: c.categoryName }));
				setCategoryOptions(options);
			})
			.catch(() => {
				setCategoryOptions([]);
			});
	}, []);

    //  폼 필드 변경 처리
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

    // 파일 입력 처리
	const handleFileChange = (e) => {
		const { name, files } = e.target;
		if (files && files[0]) {
			setFormData(prev => ({
				...prev,
				[name]: files[0]
			}));
			const fileType = name === 'thumbnailFile' ? 'thumbnail' : 'detailImage';
			setFileNames(prev => ({
				...prev,
				[fileType]: files[0].name
			}));
			if (errors[name]) {
				setErrors(prev => ({
					...prev,
					[name]: ''
				}));
			}
		}
	};

    // 폼 유효성 검사
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

    // 폼 제출 처리
	const handleSubmit = (e) => {
		
		e.preventDefault();
		if (!validate()) {
			return;
		}
		// 인증 체크 
		const campaign = {
			campaignTitle: formData.campaignTitle,
			categoryNo: formData.categoryNo,
			campaignContent: formData.campaignContent,
			startDate: formData.startDate,
			endDate: formData.endDate
		};

		// 실제 파일이 있을 때만 등록 api에 넘기고, 폼 유효성 검사에서 파일이 없으면 등록 못하게 막기
		const files = [formData.thumbnailFile, formData.detailImageFile].filter(Boolean);

        // 캠페인 등록 API 호출
		save(campaign, files)
			.then((result) => {
				if (result && result.status === 201) {
					onShowToast && onShowToast('게시글 등록이 완료되었습니다!', 'success');
					setTimeout(() => {
						navigate('/admin/campaigns');
					}, 800); // 0.8초 후 이동
				} 
			})
			.catch((error) => {
                if (error?.response?.status === 401) {
					onShowToast && onShowToast('로그인이 필요합니다.', 'error');
					// 필요시 로그인 페이지로 이동
				} else if (error?.response?.status === 403) {
					onShowToast && onShowToast('권한이 없습니다.', 'error');
				} else {
					onShowToast && onShowToast(
					error?.response?.data?.["error-message"] || '등록에 실패했습니다.',
					'error'
					);
				}
            });
	};

    //  취소 처리
	const handleCancel = () => {
		navigate('/admin/campaigns');
	};

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

export default useInsertForm;
