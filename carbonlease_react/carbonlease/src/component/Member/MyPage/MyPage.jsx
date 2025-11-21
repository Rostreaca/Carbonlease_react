import { Button, FormLabel } from "react-bootstrap";
import { DemoContainer } from "../../Common/ComponentGuide/ComponentGuide.styled";
import { FieldGroup, FieldInput, FieldLabel } from "../../Common/Form/FormField.styled";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle";
import PageContent from "../../Common/PageContent/PageContent";
import { AuthContext } from "../../Context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../Common/DataTable/DataTable";
import { CategoryBadge } from "../../Campaign/CampaignDetail/CampaignDetail.styled";
import { DeleteButton, EditButton, StatusBadge } from "../../Common/DataTable/DataTable.styled";
import axios, { Axios } from "axios";
import ConfirmDialog from "../../Common/ConfirmDialog/ConfirmDialog";
import Toast from "../../Common/Toast/Toast";

const MyPage = () => {

    const navi = useNavigate();
    
    const { auth, logout } = useContext(AuthContext);
    const [memberPwd , setMemberPwd] = useState("");

    const [showConfirm, setShowConfirm] = useState(false);

    const [toast, setToast] = useState({
        message: '',
        isVisible: false,
        variant: 'success'
    });



    const showToastMessage = (message, variant) => {
        setToast({ message, isVisible: true, variant });
    };


    const boardColumns = [
        {
            header: 'NO',
            field: 'boardNo'
        },
        {
            header: '게시글 제목',
            field: 'campaignTitle',
            render: (value) => <strong>{value}</strong>
        },
        {
            header: '작성일',
            field: 'enrollDate',
            render: (value) => <strong>{value}</strong>
        }
    ];

    const boardData = [
        {
            boardNo: 1,
            campaignTitle: '가자 에버그레이스',
            enrollDate: '2025-11-20'
        },
        {
            boardNo: 2,
            campaignTitle: '탄소중립 실천',
            enrollDate: '2025-11-20'
        }
    ];

    const ActivityColumns = [
        {
            header: 'NO',
            field: 'boardNo'
        },
        {
            header: '게시글 제목',
            field: 'campaignTitle',
            render: (value) => <strong>{value}</strong>
        },
        {
            header: '작성일',
            field: 'enrollDate',
            render: (value) => <strong>{value}</strong>
        }
    ];

    const ActivityData = [
        {
            boardNo: 1,
            campaignTitle: '친환경 캠페인',
            enrollDate: '2025-11-20'
        },
        {
            boardNo: 2,
            campaignTitle: '탄소중립 실천',
            enrollDate: '2025-11-20'
        }
    ];

    const signOut = () => {
        console.log('aa');

        axios.delete("http://localhost/members", {
            headers : {
                    Authorization : `Bearer ${auth.accessToken}`,
                },
                data : {
                  memberPwd,  
                },
        }).then(result => {
            console.log(result);
            showToastMessage('성공적으로 회원탈퇴되었습니다.', 'success');
            setTimeout(() => {
                logout();
                navi('/');
            },1000);
        }).catch(err =>{
            showToastMessage(err.response.data["error-message"], 'error');
        })

    }

    return (
        <>
            <PageTitle
                title="마이페이지"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '마이페이지', current: true }
                ]}
            />
            <PageContent>
                <DemoContainer id="signUpContainer" style={{ maxWidth: '600px' }}>
                    <FieldGroup>
                        <FieldLabel>아이디</FieldLabel>
                        <FieldInput
                            type="text"
                            name="memberId"
                            value={auth.memberId}
                            readOnly
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <FieldLabel>닉네임</FieldLabel>
                        <FieldInput
                            type="text"
                            name="nickName"
                            value={auth.nickName}
                            readOnly
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <FieldLabel>이메일</FieldLabel>
                        <FieldInput
                            type="text"
                            name="email"
                            value={auth.email}
                            readOnly
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <FieldLabel>기본주소</FieldLabel>
                        <FieldInput
                            type="text"
                            name="addressLine1"
                            placeholder="주소가 없습니다."
                            value={auth.addressLine1}
                            readOnly
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <FieldLabel>상세주소</FieldLabel>
                        <FieldInput
                            type="text"
                            name="addressLine2"
                            placeholder="주소가 없습니다."
                            value={auth.addressLine2}
                            readOnly
                        />
                    </FieldGroup>


                    <DataTable
                        title="일반게시판 최근 작성글"
                        columns={boardColumns}
                        data={boardData}
                        icon="fas fa-leaf"
                    />

                    <DataTable
                        title="인증게시판 최근 작성글"
                        columns={ActivityColumns}
                        data={ActivityData}
                        icon="fas fa-leaf"
                    />

                    <FieldGroup>
                        <Button variant='success' type='button' onClick={() => navi('/myPage/updateForm')}>정보 수정</Button>
                        <Button variant='outline-success' type='button' onClick={() => navi(-1)}>이전으로</Button>
                        <Button variant='danger' type='button' onClick={() => setShowConfirm(true)}>회원 탈퇴</Button>
                    </FieldGroup>
                </DemoContainer>

                <ConfirmDialog
                show={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={signOut}
                title='탈퇴 확인'
                message= '회원을 탈퇴하시려면 비밀번호를 입력해 주십시오'
                content={
                    <input type="password" onChange={(e) => setMemberPwd(e.target.value)}></input>
                }
                confirmText= '탈퇴'
                cancelText="취소"
                variant= 'danger'
                />

            <Toast
                message={toast.message}
                isVisible={toast.isVisible}
                onClose={() => setToast({ ...toast, isVisible: false })}
                variant={toast.variant}
            />

            </PageContent>
        </>
    )
}

export default MyPage;