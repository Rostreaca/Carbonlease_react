import { Button, FormLabel } from "react-bootstrap";
import { DemoContainer } from "../../Common/ComponentGuide/ComponentGuide.styled";
import { FieldGroup, FieldInput, FieldLabel } from "../../Common/Form/FormField.styled";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle";
import PageContent from "../../Common/PageContent/PageContent";
import Alert from "../../Common/Alert/Alert";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import CheckNickNameDuplicate from "../CheckDuplicate/CheckNickNameDuplicate";
import CheckEmailDuplicate from "../CheckDuplicate/CheckEmailDuplicate";
import { useNavigate } from "react-router-dom";

const MemberUpdateForm = () => {

    const navi = useNavigate();

    const [showUpdateAlert, setShowUpdateAlert] = useState(false);
    const [updateAlertVariant, setUpdateAlertVariant] = useState('info');
    const [updateAlertMsg, setUpdateAlertMsg] = useState("");
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");

    const [nickNameMsg, setNickNameMsg] = useState("");
    const [emailMsg, setEmailMsg] = useState("");

    const [checkNickName, setCheckNickName] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);

    const { auth } = useContext(AuthContext);

    const nickNameregexp = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,12}$/;

    const findAddress = () => {

        new daum.Postcode({
            oncomplete: function (data) {

                setAddressLine1(data.address);
            }
        }).open();
    }

    useEffect(() => {
            setNickName(auth.nickName);
            setEmail(auth.email);
            setAddressLine1(auth.addressLine1);
            setAddressLine2(auth.addressLine2);
    }, [auth]);

    useEffect(() => {

        {
            (nickName != "" && !nickNameregexp.test(nickName))
                ?
                (
                    setNickNameMsg("닉네임은 2-12자 사이로만 입력할 수 있습니다.")
                )
                :
                setNickNameMsg("")
        }

        setCheckNickName(false);
    }, [nickName])

    useEffect(() => {
        setCheckEmail(false);
        setEmailMsg("");
    }, [email])

    const handleUpdateMember = (e) => {

        console.log(auth.memberId);

        e.preventDefault();
        {
            checkNickName && checkEmail ?
                axios.put("http://localhost/members", {
                    memberId: auth.memberId, nickName, email, addressLine1, addressLine2
                }, {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`
                    }
                }).then(result => {
                    setUpdateAlertVariant('info');
                    setUpdateAlertMsg("정보수정에 성공하였습니다.");
                    setShowUpdateAlert(true);
                }).catch(error => {
                    setUpdateAlertVariant('warning');
                    setUpdateAlertMsg(error.response.data["error-message"]);
                    setShowUpdateAlert(true);
                }) : (
                    setUpdateAlertMsg("중복확인을 먼저 진행해 주십시오."),
                    setUpdateAlertVariant('warning'),
                    setShowUpdateAlert(true)
                )
        }

    }

    return (
        <>
            <PageTitle
                title="정보수정"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '마이페이지', path: '/myPage' },
                    { label: '정보 변경', current: true }
                ]}
            />
            <PageContent>
                <form onSubmit={handleUpdateMember}>
                    <DemoContainer id="signUpContainer" style={{ maxWidth: '600px' }}>
                        <FieldGroup>
                            <FieldLabel>아이디</FieldLabel>
                            <FieldInput
                                type="text"
                                value={auth.memberId}
                                readOnly
                            />
                        </FieldGroup>
                        <FieldGroup>
                            <FieldLabel>닉네임</FieldLabel>
                            <FieldInput
                                type="text"
                                placeholder="닉네임을 입력하세요"
                                value={nickName}
                                onChange={(e) => setNickName(e.target.value)}
                                required
                            />
                            <CheckNickNameDuplicate nickName={nickName} checkNickName={checkNickName} setCheckNickName={setCheckNickName} setNickNameMsg={setNickNameMsg} />
                            <FormLabel className={checkNickName ? 'regValidMsg' : 'regInvalidMsg'}>{nickNameMsg}</FormLabel>
                        </FieldGroup>
                        <FieldGroup>
                            <FieldLabel>이메일</FieldLabel>
                            <FieldInput
                                type="text"
                                placeholder="이메일을 입력하세요"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <CheckEmailDuplicate email={email} checkEmail={checkEmail} setCheckEmail={setCheckEmail} setEmailMsg={setEmailMsg} />
                            <FormLabel className={checkEmail ? 'regValidMsg' : 'regInvalidMsg'}>{emailMsg}</FormLabel>
                        </FieldGroup>
                        <FieldGroup>
                            <Button variant='primary' type='button' onClick={findAddress}>주소지 검색</Button>
                            <FieldLabel>기본주소</FieldLabel>
                            <FieldInput
                                type="text"
                                placeholder="기본주소"
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                                readOnly
                            />
                        </FieldGroup>
                        <FieldGroup>
                            <FieldLabel>상세주소</FieldLabel>
                            <FieldInput
                                type="text"
                                placeholder="상세 주소를 입력하세요"
                                value={addressLine2}
                                onChange={(e) => setAddressLine2(e.target.value)}
                            />
                        </FieldGroup>
                        <FieldGroup>
                            <Button variant='success' type='submit'>정보 수정</Button>
                            <Button variant='outline-success' type='button' onClick={() => navi(-1)}>취소</Button>
                        </FieldGroup>
                    </DemoContainer>
                </form>
                <Alert
                    show={showUpdateAlert}
                    onClose={() => { setShowUpdateAlert(false), updateAlertVariant === 'info' ? navi('/') : <></> }}
                    title={updateAlertVariant === 'info' ? '정보 변경 성공' : '정보 변경 실패'}
                    message={updateAlertMsg}
                    variant={updateAlertVariant}
                />

            </PageContent>
        </>
    )

}

export default MemberUpdateForm;