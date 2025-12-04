import { Button, FormLabel } from "react-bootstrap";
import { DemoContainer } from "../../Common/ComponentGuide/ComponentGuide.styled";
import { FieldGroup, FieldInput, FieldLabel } from "../../Common/Form/FormField.styled";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle";
import PageContent from "../../Common/PageContent/PageContent";
import CheckEmailDuplicate from "../CheckDuplicate/CheckEmailDuplicate";
import CheckNickNameDuplicate from "../CheckDuplicate/CheckNickNameDuplicate";
import Alert from "../../Common/Alert/Alert";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";


const KakaoEnrollForm = () => {


    const navi = useNavigate();

    const { kakaoInfo,setKakaoInfo ,login } = useContext(AuthContext);

    const [showSignUpAlert, setShowsignUpAlert] = useState(false);
    const [signUpAlertVariant, setSignUpAlertVariant] = useState('info');
    const [signUpAlertMsg, setSignUpAlertMsg] = useState("");
    const [memberId, setMemberId] = useState("");
    const [memberPwd, setMemberPwd] = useState("");
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");

    const [nickNameMsg, setNickNameMsg] = useState("");
    const [emailMsg, setEmailMsg] = useState("");

    const [checkNickName, setCheckNickName] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);

    const nickNameregexp = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,12}$/;

    useEffect(() => {
        setMemberId(kakaoInfo.memberId);
        setMemberPwd(kakaoInfo.memberPwd);
    }, [])

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


    const findAddress = () => {

        new daum.Postcode({
            oncomplete: function (data) {

                setAddressLine1(data.address);
            }
        }).open();
    }


    const handleSignUp = (e) => {
        e.preventDefault();

        {
            checkNickName && checkEmail ?
                axios.post("http://localhost/members", {
                    memberId, memberPwd, nickName, email, addressLine1, addressLine2
                }).then(result => {
                    setSignUpAlertVariant('info');
                    setSignUpAlertMsg("회원가입에 성공하였습니다.");
                    setShowsignUpAlert(true);
                }).catch(error => {
                    setSignUpAlertVariant('warning');
                    setSignUpAlertMsg(error.response.data["error-message"]);
                    setShowsignUpAlert(true);
                }) : (
                setSignUpAlertMsg("중복확인을 먼저 진행해 주십시오."),
                setSignUpAlertVariant('warning'),
                setShowsignUpAlert(true)
                )
        }

    }

    const successSignUp = () => {

        axios.post("http://localhost/auth/login", {
            memberId, memberPwd
        }).then(result => {
            const { memberId, nickName, accessToken, refreshToken, email, addressLine1, addressLine2, role, expiredDate } = result.data;
            login(memberId, nickName, accessToken, refreshToken, email, addressLine1, addressLine2, role, expiredDate);
        }).catch(err => {
            console.error(err);
        })

        setKakaoInfo({
            memberId : null,
            memberPwd : null
        });

        navi('/');
    }

    return (
        <>
            <PageTitle
                title="카카오 회원가입"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '회원가입', current: true }
                ]}
            />
            <PageContent>
                <form onSubmit={handleSignUp}>
                    <DemoContainer className="signUpContainer">
                        <FieldGroup>
                            <FieldLabel>닉네임</FieldLabel>
                            <FieldInput
                                type="text"
                                placeholder="닉네임을 입력하세요"
                                onChange={(e) => setNickName(e.target.value)}
                                className='userFormInput'
                                required
                            />
                            <CheckNickNameDuplicate nickName = {nickName} checkNickName = {checkNickName} setCheckNickName = {setCheckNickName} setNickNameMsg = {setNickNameMsg}/>
                            <FormLabel className={checkNickName ? 'regValidMsg' : 'regInValidMsg'}>{nickNameMsg}</FormLabel>
                        </FieldGroup>
                        <FieldGroup>
                            <FieldLabel>이메일</FieldLabel>
                            <FieldInput
                                type="text"
                                placeholder="이메일을 입력하세요"
                                onChange={(e) => setEmail(e.target.value)}
                                className='userFormInput'
                                required
                            />
                            <CheckEmailDuplicate email = {email} checkEmail = {checkEmail} setCheckEmail = {setCheckEmail} setEmailMsg = {setEmailMsg}/>
                            <FormLabel className={checkEmail ? 'regValidMsg' : 'regInValidMsg'}>{emailMsg}</FormLabel>
                        </FieldGroup>
                        <FieldGroup>
                            <FieldLabel>기본주소 <Button className='rounded-pill' variant='primary' type='button' onClick={findAddress} size='sm'>주소지 검색</Button></FieldLabel>
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
                                onChange={(e) => setAddressLine2(e.target.value)}
                            />
                        </FieldGroup>
                        <FieldGroup className='userFormButtonGroup'>
                            <Button className='userFormButton' variant='success' type='submit'>회원가입 후 로그인 </Button>
                        </FieldGroup>
                    </DemoContainer>
                </form>
                <Alert
                    show={showSignUpAlert}
                    onClose={() => { setShowsignUpAlert(false), signUpAlertVariant === 'info' ? successSignUp() : <></> }}
                    title={signUpAlertVariant === 'info' ? '회원가입 성공' : '회원가입 실패'}
                    message={signUpAlertMsg}
                    variant={signUpAlertVariant}
                />


            </PageContent>
        </>
    )


}

export default KakaoEnrollForm;