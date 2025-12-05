import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from "../../Common/ComponentGuide/ComponentGuide.styled";
import ConfirmDialog from "../../Common/ConfirmDialog/ConfirmDialog";
import DataTable from "../../Common/DataTable/DataTable";
import { FieldGroup, FieldInput, FieldLabel } from "../../Common/Form/FormField.styled";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle";
import PageContent from "../../Common/PageContent/PageContent";
import Toast from "../../Common/Toast/Toast";
import { AuthContext } from "../../Context/AuthContext";

const MyPage = () => {

    const navi = useNavigate();

    const { auth, logout } = useContext(AuthContext);
    const [memberPwd, setMemberPwd] = useState("");

    const [boardData, setBoardData] = useState([]);
    const [activityData, setActivityData] = useState([]);

    const [showConfirm, setShowConfirm] = useState(false);

    const [toast, setToast] = useState({
        message: '',
        isVisible: false,
        variant: 'success'
    });


    useEffect(() => {

        {
            auth.memberId !== null ?
                (
                    axios.get(`http://localhost/members/boards`,
                        {
                            headers: {
                                Authorization: `Bearer ${auth.accessToken}`
                            }
                        }
                    )
                        .then(result => {
                            // console.log(result);
                            setBoardData([...result.data]);
                        }).catch(err => {
                            console.error(err.response.data['error-message']);
                        }),
                    axios.get("http://localhost/members/activityBoards",
                        {
                            headers: {
                                Authorization: `Bearer ${auth.accessToken}`
                            }
                        }
                    ).then(result => {
                        setActivityData([...result.data]);
                    }).catch(err => {
                        console.error(err.response.data["error-message"]);
                    })
                )
                :

                <></>
        }

    }, [auth])


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
            field: 'boardTitle',
            render: (value) => <strong>{value}</strong>
        },
        {
            header: '작성일',
            field: 'enrollDate',
            render: (value) => <strong>{value}</strong>
        }
    ];

    const activityColumns = [
        {
            header: 'NO',
            field: 'activityNo'
        },
        {
            header: '게시글 제목',
            field: 'activityTitle',
            render: (value) => <strong>{value}</strong>
        },
        {
            header: '작성일',
            field: 'enrollDate',
            render: (value) => <strong>{value}</strong>
        }
    ];

    const kakaoSignOut = () => {

       axios.delete("http://localhost/members/kakao", {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            }
        }).then(result => {
            console.log(result);
            showToastMessage('성공적으로 회원탈퇴되었습니다.', 'success');
            setTimeout(() => {
                logout();
                navi('/');
            }, 800);
        }).catch(err => {
            showToastMessage(err.response.data["error-message"], 'error');
        })


    }

    const signOut = () => {

        axios.delete("http://localhost/members", {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
            data: {
                memberPwd,
            },
        }).then(result => {
            console.log(result);
            showToastMessage('성공적으로 회원탈퇴되었습니다.', 'success');
            setTimeout(() => {
                logout();
                navi('/');
            }, 800);
        }).catch(err => {
            showToastMessage(err.response.data["error-message"], 'error');
        })

    }

    const handleBoardClick = (e) => {
        // console.log(e.boardNo);
        navi(`/boards/${e.boardNo}`);
    }

    const handleAcitivtyClick = (e) => {
        // console.log(e);
        navi(`/activityBoards/${e.activityNo}`)
    }

    return (
            auth.memberId !== null ?
        <>
            <PageTitle
                title="마이페이지"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '마이페이지', current: true }
                ]}
            />
            <PageContent>
                <div className="myPageContainer">
                <DemoContainer className="myPageChildernContainer">
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
                            value={ auth.addressLine1 === 'null' ? '' : auth.addressLine1 }
                            readOnly
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <FieldLabel>상세주소</FieldLabel>
                        <FieldInput
                            type="text"
                            name="addressLine2"
                            placeholder="주소가 없습니다."
                            value={ auth.addressLine2 === 'null' ? '' : auth.addressLine2}
                            readOnly
                        />
                    </FieldGroup>

                    <FieldGroup className="userFormButtonGroup">
                        <Button className="userFormButton" variant='success' type='button' onClick={() => navi('/myPage/update')}>정보 수정</Button>
                        <Button className="userFormButton" variant='danger' type='button' onClick={() => setShowConfirm(true)}>회원 탈퇴</Button>
                    </FieldGroup>

                </DemoContainer>                
                
                <DemoContainer className="myPageChildernContainer" >
                    <DataTable
                        title="일반게시판 최근 작성글"
                        columns={boardColumns}
                        data={boardData.length !== 0 ? boardData:[{boardNo: '', boardTitle : '게시글이 존재하지 않습니다.', enrollDate:''}]}
                        icon="fas fa-leaf"
                        onRowClick={boardData.length !== 0 ?handleBoardClick : false }
                    />

                    <DataTable
                        title="인증게시판 최근 작성글"
                        columns={activityColumns}
                        data={activityData.length !== 0 ? activityData:[{activityNo:'', activityTitle : '게시글이 존재하지 않습니다.', enrollDate:''}]}
                        icon="fas fa-leaf"
                        onRowClick={activityData.length !== 0 ? handleAcitivtyClick : false}
                    />
                </DemoContainer>
                </div>

                <ConfirmDialog
                    show={showConfirm}
                    onClose={() => setShowConfirm(false)}
                    onConfirm={auth.isSocialLogin !== 'Y' ? signOut : kakaoSignOut}
                    title='탈퇴 확인'
                    message={ auth.isSocialLogin !== 'Y' ? '회원을 탈퇴하시려면 비밀번호를 입력해 주십시오' : '회원을 탈퇴하시겠습니까?' }
                    content={ auth.isSocialLogin !== 'Y' ?
                        <input type="password" onChange={(e) => setMemberPwd(e.target.value)}></input> : <></>
                    }
                    confirmText='탈퇴'
                    cancelText="취소"
                    variant='danger'
                />

                <Toast
                    message={toast.message}
                    isVisible={toast.isVisible}
                    onClose={() => setToast({ ...toast, isVisible: false })}
                    variant={toast.variant}
                />

            </PageContent>
        </>
        :
        <></>
    )
}

export default MyPage;