import { useState } from 'react';
import { 
    LayoutAuthentication, 
    LayoutAuthenticationContent, 
    LayoutAuthenticationFooter,
    MainContent,
    LoginCard,
    FormFloating,
    FormCheck,
    ButtonGroup,
    Footer
} from './AdminLogin.styled';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 로그인 로직 처리
        console.log('Login:', { email, password, rememberPassword });
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
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="adminId">ID</label>
                                            </FormFloating>

                                            <FormFloating>
                                                <input
                                                    id="adminPwd"
                                                    type="password"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="adminPwd">Password</label>
                                            </FormFloating>

                                            <FormCheck>
                                                <input
                                                    id="inputRememberPassword"
                                                    type="checkbox"
                                                    checked={rememberPassword}
                                                    onChange={(e) => setRememberPassword(e.target.checked)}
                                                />
                                                <label htmlFor="inputRememberPassword">Remember Password</label>
                                            </FormCheck>

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
