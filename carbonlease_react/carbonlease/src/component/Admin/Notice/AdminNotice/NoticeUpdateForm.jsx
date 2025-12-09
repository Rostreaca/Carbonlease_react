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
import { AuthContext } from '../../../Context/AuthContext'

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NoticeUpdateForm = () => {

    const [errors, setErrors] = useState({});
    const navi = useNavigate();
    
    const { id } = useParams();
    const { auth } = useContext(AuthContext);

    // 폼 데이터 상태 관리
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        files: [],
        fix: '',
    });

    // 파일 이름 상태 관리
    const [fileNames, setFileNames] = useState(null);


    // 1. 로그인 안되있으면 빠꾸
    useEffect(() => {
        if (!auth.isAuthenticated) {
        alert("로그인 해주세요");
        navi("/admin/login");
        }
        console.log(auth.accessToken)
    }, [auth.isAuthenticated]);

    // form
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

    // 2. 기존 데이터 갖고오기
    useEffect(()=>{
        // console.log('ID??????', id) // OK
        // const getNotice = (noticeNo) => {
            if(auth.accessToken){
                // console.log('너안감?');
                // console.log(auth.accessToken); 이제 감
                axios
                    .get(`http://www.localhost/admin/notices/detail/${id}`, {
                        headers: {
                            Authorization: `Bearer ${auth.accessToken}`
                        },
                    })
                    .then((result) => {
                        const responseNotice = result.data.notice;
                        const responseAtt = result.data.attachment;
                        console.log(result);
                        setFileNames(responseAtt.map(att => att.originName));
                        setFormData({
                            title: responseNotice.noticeTitle,
                            content: responseNotice.noticeContent,
                            files: []
                        });

                    })
            }
        // }
    }, [id])

    // file form
    const handleFileChange = (e) => {
        const { files } = e.target;

        if (files && files.length > 0) {
            const fileList = Array.from(files);

            setFormData(prev => ({
                ...prev,
                files: fileList
            }));

            setFileNames(fileList.map(f => f.name));

            if (errors["files"]) {
                setErrors(prev => ({
                    ...prev,
                    files: ''
                }));
            }

            console.log(files)
            console.log(formData)
        }
    };

    // 제출 handler
    const handleSubmit = (e) => {
        e.preventDefault();

        // formData 생성하기
        const notice = new FormData();
        notice.append("noticeTitle", formData.title);
        notice.append("noticeContent", formData.content);
        notice.append("fix", formData.fix ? "Y" : "N"); 

        if (formData.files && formData.files.length > 0) {
            formData.files.forEach(file => {
                notice.append("files", file);
        });}




        axios.put(`http://localhost/admin/notices/update/${id}`, notice, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            console.log(res);
            alert("수정 완료!");
            navi("/admin/notices");
        })
        .catch((err) => {
            console.error(err);
            alert("수정 실패");
            console.log(auth.accessToken);
        });
    };

    // 취소버튼 handler
    const handleCancel = () => {
        navi('/admin/notices');
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
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="공지사항 제목을 입력하세요"
                        />

                        <FormField
                            label="고정 여부"
                            type="toggle-switch"
                            name="fix"
                            value={formData.fix}
                            onChange={handleChange}   // e.target.value → boolean
                        />

                        <FormField
                            label="내용"
                            type="textarea"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            placeholder="공지사항 내용을 입력하세요"
                            rows={8}
                        />


                        <FormField
                            label="첨부파일"
                            type="file"
                            name="files"
                            onChange={handleFileChange}
                            fileName={fileNames}

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
    )
}

export default NoticeUpdateForm;