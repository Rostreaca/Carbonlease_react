import { useContext, useState } from 'react';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import { AuthContext } from '../../Context/AuthContext';
import { Button, FormLabel } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '../../Common/Alert/Alert';
import { FieldGroup, FieldInput } from '../../Common/Form/FormField.styled';
import { DemoContainer } from '../../Common/ComponentGuide/ComponentGuide.styled';


const Login = () => {

    const { VITE_KAKAO_CLIENT_ID, VITE_KAKAO_REDIRECT_URI } = import.meta.env; 

    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('info');
    const [memberId, setMemberId] = useState("");
    const [memberPwd, setMemberPwd] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const [idMsg, setIdMsg] = useState("");
    const [pwdMsg, setPwdMsg] = useState("");
    const { login } = useContext(AuthContext);
    const navi = useNavigate();

    const handleKakaoLoginBtn = () => {

        window.location.href = "https://kauth.kakao.com/oauth/authorize?"
                + `client_id=${VITE_KAKAO_CLIENT_ID}` 
                + `&redirect_uri=${VITE_KAKAO_REDIRECT_URI}`
                + "&response_type=code";;
    }


    const handleLogin = (e) => {
        e.preventDefault();
        const regexp = /^[a-zA-Z0-9]{4,20}$/;
        if (!regexp.test(memberId)) {
            setIdMsg("아이디는 4-20자사이의 영문 숫자로만 입력할 수 있습니다.");
            return;
        } else {
            setIdMsg("");
        }

        if (!regexp.test(memberPwd)) {
            setPwdMsg("비밀번호는 4-20자사이의 영문 숫자로만 입력할 수 있습니다.");
            return;
        } else {
            setPwdMsg("");
        }

        axios.post("http://localhost/auth/login", {
            memberId, memberPwd
        }).then(result => {
            //console.log(result);
            const { memberId, nickName, accessToken, refreshToken, email, addressLine1, addressLine2, role, expiredDate } = result.data;
            login(memberId, nickName, accessToken, refreshToken, email, addressLine1, addressLine2, role, expiredDate);
            setAlertMsg("로그인에 성공하였습니다.");
            setAlertVariant('info');
            setShowAlert(true);
            //navi('/');

        }).catch(error => {
            console.error(error);
            setAlertMsg(error.response.data["error-message"]);
            setAlertVariant('warning');
            setShowAlert(true);
        }
        )
    }

    return (
        <>
            <PageTitle
                title="로그인"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '로그인', current: true }
                ]}
            />
            <PageContent>
                <DemoContainer className='loginContainer'>
                <form onSubmit={handleLogin}>
                    <FieldGroup>
                        <FieldInput
                            label="아이디"
                            type="text"
                            name="id"
                            placeholder="아이디를 입력하세요"
                            onChange={(e) => setMemberId(e.target.value)}
                            required
                        />
                        <FormLabel className={'regInValidMsg'}>{idMsg}</FormLabel>
                    </FieldGroup>
                    <FieldGroup>
                        <FieldInput
                            label="비밀번호"
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력하세요"
                            onChange={(e) => setMemberPwd(e.target.value)}
                            required
                        />
                        <FormLabel className={'regInValidMsg'}>{pwdMsg}</FormLabel>
                    </FieldGroup>
                    <div className='d-grid gap-2'>
                    <Button variant='success' type='submit'>로그인</Button>
                    <img id='kakaoLoginBtn' onClick={handleKakaoLoginBtn} src='/src/assets/images/login/kakao_login_medium_wide.png' />
                    </div>
                </form>
                <Alert
                    show={showAlert}
                    onClose={() => { setShowAlert(false), alertVariant === 'info' ? navi('/') : <></> }}
                    title={alertVariant === 'info' ? '로그인 성공' : '로그인 실패'}
                    message={alertMsg}
                    variant={alertVariant}
                />
                </DemoContainer>
            </PageContent>
        </>
    )
}

export default Login;