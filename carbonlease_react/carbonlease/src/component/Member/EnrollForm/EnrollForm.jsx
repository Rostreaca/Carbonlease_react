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



const EnrollForm = () => {


    const navi = useNavigate();



    const [checkAlertTitle, setCheckAlertTitle] = useState("id");
    const [showCheckAlert, setShowCheckAlert] = useState(false);
    const [checkAlertVariant, setCheckAlertVariant] = useState('info');
    const [checkAlertMsg, setCheckAlertMsg] = useState("");

    const [showSingUpAlert, setShowSingUpAlert] = useState(false);
    const [singUpAlertVariant, setSingUpAlertVariant] = useState('info');
    const [singUpAlertMsg, setSingUpAlertMsg] = useState("");
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

     const [idMsgStyle, setIdMsgStyle] = useState('regMsg');
     const [pwdMsgStyle, setPwdMsgStyle] = useState('regMsg');
     const [nickNameMsgStyle, setNickNameMsgStyle] = useState('regMsg');
     const [emailMsgStyle, setEmailMsgStyle] = useState('regSuccessMsg');

    const [checkId, setCheckId] = useState(false);
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
            setPwdMsgStyle('regMsg')
            )
            :
            memberPwd != ""
            ?
            (
            setPwdMsg("사용가능한 비밀번호 입니다."),
            setPwdMsgStyle('regSuccessMsg')
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
        setIdMsgStyle('regMsg');
    }, [memberId])

    useEffect(() => {

        {
            (nickName != "" && !nickNameregexp.test(nickName)) 
            ?
            (
            setNickNameMsg("닉네임은 2-12자 사이로만 입력할 수 있습니다."),
            setNickNameMsgStyle('regSuccessMsg')
            )
            :
            setNickNameMsg("")

        }

        setCheckNickName(false);
        setNickNameMsgStyle('regMsg');
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

    const handleCheckId = () => {

        setCheckAlertTitle('id');

        axios.post("http://localhost/members/checkId",
            {
                memberId: memberId
            }).then(result => {
                setCheckAlertVariant('info');
                setCheckAlertMsg("중복된 아이디가 없습니다.");
                setShowCheckAlert(true);
                setCheckId(true);
                setIdMsgStyle('regSuccessMsg');
                setIdMsg("사용 가능한 아이디입니다.");
            }).catch(error => {
                setCheckAlertVariant('warning');
                setCheckAlertMsg(error.response.data["error-message"]);
                setShowCheckAlert(true);
            })

    }

    const handleCheckNickName = () => {

        setCheckAlertTitle('nickName');

        axios.post("http://localhost/members/checkNickName",
            {
                nickName: nickName
            }).then(result => {
                setCheckAlertVariant('info');
                setCheckAlertMsg("중복된 닉네임이 없습니다.");
                setShowCheckAlert(true);
                setCheckNickName(true);
                setNickNameMsgStyle('regSuccessMsg');
                setNickNameMsg("사용 가능한 닉네임입니다.")
            }).catch(error => {
                setCheckAlertVariant('warning');
                setCheckAlertMsg(error.response.data["error-message"]);
                setShowCheckAlert(true);
            })

    }

    const handleCheckEmail = () => {

        setCheckAlertTitle('email');

        axios.post("http://localhost/members/checkEmail",
            {
                email: email
            }).then(result => {
                setCheckAlertVariant('info');
                setCheckAlertMsg("중복된 이메일이 없습니다.");
                setShowCheckAlert(true);
                setCheckEmail(true);
                setEmailMsgStyle('regSuccessMsg');
                setEmailMsg("사용 가능한 이메일입니다.");
            }).catch(error => {
                setCheckAlertVariant('warning');
                setCheckAlertMsg(error.response.data["error-message"]);
                setShowCheckAlert(true);
            })

    }

    const handleSignUp = (e) => {
        e.preventDefault();
        {
            checkId && checkNickName && checkEmail ?
                axios.post("http://localhost/members", {
                    memberId, memberPwd, nickName, email, addressLine1, addressLine2
                }).then(result => {
                    setSingUpAlertMsg("회원가입에 성공하였습니다.");
                    setSingUpAlertVariant('info');
                    setShowSingUpAlert(true);
                }).catch(error => {
                    setSingUpAlertMsg(error.response.data["error-message"]);
                    setSingUpAlertVariant('warning');
                    setShowSingUpAlert(true);
                }) :
                setSingUpAlertMsg("중복확인을 먼저 진행해 주십시오.");
            setSingUpAlertVariant('warning');
            setShowSingUpAlert(true);
            return;
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
                    <DemoContainer id="signUpContainer" style={{ maxWidth: '600px' }}>
                        <FieldGroup>
                            <FieldLabel>아이디</FieldLabel>
                            <FieldInput
                                type="text"
                                placeholder="아이디를 입력하세요"
                                onChange={(e) => setMemberId(e.target.value)}
                                required
                            />
                            <Button type='button' onClick={handleCheckId}>중복확인</Button>
                            <FormLabel className={idMsgStyle}>{idMsg}</FormLabel>
                        </FieldGroup>
                        <FieldGroup>
                            <FieldLabel>비밀번호</FieldLabel>
                            <FieldInput
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                onChange={(e) => setMemberPwd(e.target.value)}
                                required
                            />
                            <FormLabel className={pwdMsgStyle}>{pwdMsg}</FormLabel>
                        </FieldGroup>
                        <FieldGroup>
                            <FieldLabel>닉네임</FieldLabel>
                            <FieldInput
                                type="text"
                                placeholder="닉네임을 입력하세요"
                                onChange={(e) => setNickName(e.target.value)}
                                required
                            />
                            <Button type='button' onClick={handleCheckNickName}>중복확인</Button>
                            <FormLabel className={nickNameMsgStyle}>{nickNameMsg}</FormLabel>
                        </FieldGroup>
                        <FieldGroup>
                            <FieldLabel>이메일</FieldLabel>
                            <FieldInput
                                type="text"
                                placeholder="이메일을 입력하세요"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type='button' onClick={handleCheckEmail}>중복확인</Button>
                            <FormLabel className={emailMsgStyle}>{emailMsg}</FormLabel>
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
                                onChange={(e) => setAddressLine2(e.target.value)}
                            />
                        </FieldGroup>
                        <FieldGroup>
                            <Button variant='success' type='submit'>회원가입</Button>
                            <Button variant='outline-success' type='button' onClick={() => navi(-1)}>취소</Button>
                        </FieldGroup>
                    </DemoContainer>
                </form>
                <Alert
                    show={showSingUpAlert}
                    onClose={() => { setShowSingUpAlert(false), singUpAlertVariant === 'info' ? navi('/') : <></> }}
                    title={singUpAlertVariant === 'info' ? '회원가입 성공' : '회원가입 실패'}
                    message={singUpAlertMsg}
                    variant={singUpAlertVariant}
                />

                <Alert
                    show={showCheckAlert}
                    onClose={() => { setShowCheckAlert(false) }}
                    title={checkAlertTitle === 'id' ? '아이디 중복 확인' : checkAlertTitle === 'nickName' ? '닉네임 중복 확인' : '이메일 중복 확인'}
                    message={checkAlertMsg}
                    variant={checkAlertVariant}
                />
            </PageContent>
        </>
    )
}

export default EnrollForm;