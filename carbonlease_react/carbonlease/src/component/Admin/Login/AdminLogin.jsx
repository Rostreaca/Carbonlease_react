import axios from 'axios';
import { useContext, useState } from 'react';
import { FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Alert from '../../Common/Alert/Alert';
import { AuthContext } from '../../Context/AuthContext';
import {
    ButtonGroup,
    Footer,
    FormFloating,
    LayoutAuthentication,
    LayoutAuthenticationContent,
    LayoutAuthenticationFooter,
    LoginCard,
    MainContent
} from './AdminLogin.styled';

const AdminLogin = () => {

    const navi = useNavigate();

    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('info');
    const [memberId, setMemberId] = useState("");
    const [memberPwd, setMemberPwd] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    const [idMsg, setIdMsg] = useState("");
    const [pwdMsg, setPwdMsg] = useState("");
    const { login } = useContext(AuthContext);

    const handleSubmit = (e) => {

        e.preventDefault();
        // 로그인 로직 처리
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

        axios.post("http://localhost/auth/adminLogin", {
    memberId, memberPwd
}).then(result => {
            //console.log(result);
            const { memberId, nickName, accessToken, refreshToken, email, addressLine1, addressLine2, role, expiredDate , isSocialLogin } = result.data;
            login(memberId, nickName, accessToken, refreshToken, email, addressLine1, addressLine2, role,expiredDate ,isSocialLogin);
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
    };

    return (
        <LayoutAuthentication>
            <LayoutAuthenticationContent>
                <MainContent>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <LoginCard>

                                    <div className="card-header">
                                        <h3>Login</h3>
                                    </div>

                                    <div className="card-body">
                                        <form onSubmit={handleSubmit}>
                                            <FormFloating>
                                                <input
                                                    id="adminId"
                                                    type="test"
                                                    placeholder="ID"
                                                    value={memberId}
                                                    onChange={(e) => setMemberId(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="adminId">ID</label>
                                            </FormFloating>
                                            <FormLabel className={'regInValidMsg'}>{idMsg}</FormLabel>
                                            <FormFloating>
                                                <input
                                                    id="adminPwd"
                                                    type="password"
                                                    placeholder="Password"
                                                    value={memberPwd}
                                                    onChange={(e) => setMemberPwd(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="adminPwd">Password</label>
                                            </FormFloating>
                                            <FormLabel className={'regInValidMsg'}>{pwdMsg}</FormLabel>

                                            <ButtonGroup>
                                                {/* <a className="small-link" href="/admin/password">Forgot Password?</a> */}
                                                <button type="submit" className="btn-primary">Login</button>
                                            </ButtonGroup>
                                        </form>
                                    </div>
                                    {/* <div className="card-footer">
                                        <div className="small">
                                            <a href="/admin/register">Need an account? Sign up!</a>
                                        </div>
                                    </div> */}
                                </LoginCard>
                            </div>
                        </div>
                    </div>
                    <Alert
                        show={showAlert}
                        onClose={() => { setShowAlert(false), alertVariant === 'info' ? navi('/admin/home') : <></> }}
                        title={alertVariant === 'info' ? '로그인 성공' : '로그인 실패'}
                        message={alertMsg}
                        variant={alertVariant}
                    />
                </MainContent>
            </LayoutAuthenticationContent>

            <LayoutAuthenticationFooter>
                <Footer>
                    <div className="container-fluid">
                        <div className="footer-content">
                            <div className="text-muted">Copyright &copy; Carbonlease 2025</div>
                            {/* <div>
                                <a href="#">Privacy Policy</a>
                                <span> &middot; </span>
                                <a href="#">Terms &amp; Conditions</a>
                            </div> */}
                        </div>
                    </div>
                </Footer>
            </LayoutAuthenticationFooter>
        </LayoutAuthentication>
    );
};

export default AdminLogin;
