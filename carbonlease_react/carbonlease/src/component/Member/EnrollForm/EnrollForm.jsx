import { Button, FormLabel } from 'react-bootstrap';
import { DemoContainer } from '../../Common/ComponentGuide/ComponentGuide.styled';
import FormField from '../../Common/Form/FormField';
import { FieldGroup, FieldInput, FieldLabel } from '../../Common/Form/FormField.styled';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from '../../Common/Alert/Alert';
import { useNavigate } from 'react-router-dom';
import CheckIdDuplicate from '../CheckDuplicate/CheckIdDuplicate';
import CheckNickNameDuplicate from '../CheckDuplicate/CheckNickNameDuplicate';
import CheckEmailDuplicate from '../CheckDuplicate/CheckEmailDuplicate';



const EnrollForm = () => {


    const navi = useNavigate();

    const [showSignUpAlert, setShowsignUpAlert] = useState(false);
    const [signUpAlertVariant, setSignUpAlertVariant] = useState('info');
    const [signUpAlertMsg, setSignUpAlertMsg] = useState("");
    const [memberId, setMemberId] = useState("");
    const [memberPwd, setMemberPwd] = useState("");
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");

    const [idMsg, setIdMsg] = useState("");
    const [pwdMsg, setPwdMsg] = useState("");
    const [nickNameMsg, setNickNameMsg] = useState("");
    const [emailMsg, setEmailMsg] = useState("");


    const [checkId, setCheckId] = useState(false);
    const [checkPwd, setCheckPwd] = useState(false);
    const [checkNickName, setCheckNickName] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);

    const IdPasswordregexp = /^[a-zA-Z0-9]{4,20}$/;
    const nickNameregexp = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,12}$/;

    // 사용자가 값을 입력할 때마다 그에 맞는 상태창 표시
    useEffect(() => {

        {
            (memberPwd != "" && !IdPasswordregexp.test(memberPwd))
            ?
            (
            setPwdMsg("비밀번호는 4-20자 사이의 영문-숫자로만 입력할 수 있습니다."),
            setCheckPwd(false)
            )
            :
            memberPwd != ""
            ?
            (
            setPwdMsg("사용가능한 비밀번호 입니다."),
            setCheckPwd(true)
            )
            :
            setPwdMsg("");
        }

    }, [memberPwd])


    // 중복확인 후 사용자가 값을 변경했을 때 중복체크 제거를 위한 useEffect
    useEffect(() => {
        
        {
            (memberId != "" && !IdPasswordregexp.test(memberId)) 
            ? 
            setIdMsg("아이디는 4-20자 사이의 영문-숫자로만 입력할 수 있습니다.")
            :
            setIdMsg("")
        }

        setCheckId(false);
    }, [memberId])

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
            checkId && checkNickName && checkEmail ?
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

    return (
        <>
            <PageTitle
                title="회원가입"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '회원가입', current: true }
                ]}
            />
            <PageContent>
                <form onSubmit={handleSignUp}>
                    <DemoContainer className="signUpContainer">
                        <FieldGroup>
                            <FieldLabel>아이디</FieldLabel>
                            <FieldInput
                                type="text"
                                placeholder="아이디를 입력하세요"
                                onChange={(e) => setMemberId(e.target.value)}
                                className='userFormInput'
                                required
                            />
                            <CheckIdDuplicate memberId = {memberId} checkId ={checkId} setCheckId = {setCheckId} setIdMsg = {setIdMsg}/>
                            <FormLabel className={checkId ? 'regValidMsg' : 'regInvalidMsg'}>{idMsg}</FormLabel>
                        </FieldGroup>
                        <FieldGroup>
                            <FieldLabel>비밀번호</FieldLabel>
                            <FieldInput
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                onChange={(e) => setMemberPwd(e.target.value)}
                                className='userFormInput'
                                required
                            />
                            <FormLabel className={checkPwd ? 'regValidMsg' : 'regInvalidMsg'}>{pwdMsg}</FormLabel>
                        </FieldGroup>
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
                            <FormLabel className={checkNickName ? 'regValidMsg' : 'regInvalidMsg'}>{nickNameMsg}</FormLabel>
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
                            <FormLabel className={checkEmail ? 'regValidMsg' : 'regInvalidMsg'}>{emailMsg}</FormLabel>
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
                            <Button className='userFormButton' variant='success' type='submit'>회원가입</Button>
                            <Button className='userFormButton' variant='outline-success' type='button' onClick={() => navi(-1)}>취소</Button>
                        </FieldGroup>
                    </DemoContainer>
                </form>
                <Alert
                    show={showSignUpAlert}
                    onClose={() => { setShowsignUpAlert(false), signUpAlertVariant === 'info' ? navi('/') : <></> }}
                    title={signUpAlertVariant === 'info' ? '회원가입 성공' : '회원가입 실패'}
                    message={signUpAlertMsg}
                    variant={signUpAlertVariant}
                />


            </PageContent>
        </>
    )
}

export default EnrollForm;