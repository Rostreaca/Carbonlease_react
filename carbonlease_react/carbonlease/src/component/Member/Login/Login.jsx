import { useContext, useEffect, useState } from 'react';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import { AuthContext } from '../../Context/AuthContext';
import FormField from '../../Common/Form/FormField';
import SuccessButton from '../../Sample/Buttons/SuccessButton';
import { Button } from 'react-bootstrap';
import OutlineWarningButton from '../../Sample/Outlinebuttons/OutlineWarningButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '../../Common/Alert/Alert';
import { FieldLabel } from '../../Common/Form/FormField.styled';


const Login = () => {

    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('info');
    const [memberId, setMemberId] = useState("");
    const [memberPwd, setMemberPwd] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const [idMsg, setIdMsg] = useState("");
    const [pwdMsg, setPwdMsg] = useState("");
    const { login } = useContext(AuthContext);
    const navi = useNavigate();


    const handleLogin= (e) => {
        e.preventDefault();
        const regexp = /^[a-zA-Z0-9]{4,20}$/;
        if(!regexp.test(memberId)){
            setIdMsg("아이디는 4-20자사이의 영문 숫자로만 입력할 수 있습니다.");
            return;
        } else {
            setIdMsg("");
        }

        if(!regexp.test(memberPwd)){
            setPwdMsg("비밀번호는 4-20자사이의 영문 숫자로만 입력할 수 있습니다.");
            return;
        } else {
            setPwdMsg("");
        }

        axios.post("http://localhost/auth/login",{
            memberId, memberPwd
        }).then(result => {
            //console.log(result);
            const {memberId, nickName, accessToken, refreshToken, role} = result.data;
            login(memberId, nickName, accessToken, refreshToken, role); 
            setAlertMsg("로그인에 성공하였습니다."); 
            setAlertVariant('info');
            setShowAlert(true);        
            //navi('/');

        }).catch(error => {
            //console.error(error);
            setAlertMsg(error.response.data["error-message"]);
            setAlertVariant('warning');
            setShowAlert(true);        
        }
        )
    }

    return(
        <>
            <PageTitle 
                title="로그인" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '로그인', current: true }
                ]} 
            />
            <PageContent>
                <form onSubmit={handleLogin}>
                    <FormField
                        label="아이디"
                        type="text"
                        name="id"
                        placeholder="아이디를 입력하세요"
                        onChange={(e) => setMemberId(e.target.value)}
                        required
                    />
                    <FieldLabel>{idMsg}</FieldLabel>
                    <FormField
                        label="비밀번호"
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력하세요"
                        onChange={(e) => setMemberPwd(e.target.value)}
                        required
                    />
                    <FieldLabel>{pwdMsg}</FieldLabel>

                    <Button variant='success' type='submit'>로그인</Button>
                    <Button variant='dark' type='button' onClick={() => navi('/member/enrollForm')}>회원가입</Button>
                </form>
            <Alert
                show={showAlert}
                onClose={() => {setShowAlert(false), alertVariant === 'info' ? navi('/') : <></>}}
                title= { alertVariant === 'info' ? '로그인 성공' : '로그인 실패'}
                message= {alertMsg}
                variant={alertVariant}
            />
            </PageContent>
        </>
    )
}

export default Login;