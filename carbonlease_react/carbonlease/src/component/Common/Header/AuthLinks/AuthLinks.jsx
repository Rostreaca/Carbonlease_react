import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';

const AuthLinks = ({ onClick }) => {

    const { auth, logout } = useContext(AuthContext);


    return (

        <>
            {
                !auth.isAuthenticated ?
            <>
            <NavLink
            to="/login"
            onClick={onClick}
            style={{padding: 0, flex: 'none', width: 'auto'}}
            >
                로그인
            </NavLink>
            <span style={{margin: '0 8px'}}>|</span>
            <NavLink 
            to="/signUp" 
            onClick={onClick}
            style={{padding: 0, flex: 'none', width: 'auto'}}
            >회원가입</NavLink>
            </>
            :
            <>            
            {/* ★ 관리자면 마이페이지 → 관리자 페이지로 변경 */}
            {auth.role === "[ROLE_ADMIN]" ? (
                <NavLink
                    to="/admin/home"
                    onClick={onClick}
                    style={{ padding: 0, flex: 'none', width: 'auto' }}
                >
                    관리자 페이지
                </NavLink>
            ) : (
                <NavLink
                    to="/myPage"
                    onClick={onClick}
                    style={{ padding: 0, flex: 'none', width: 'auto' }}
                >
                    마이페이지
                </NavLink>
            )}
            <span style={{margin: '0 8px'}}>|</span>
            <NavLink 
            to="/"
            onClick={logout}
            style={{padding: 0, flex: 'none', width: 'auto'}}
            >로그아웃</NavLink>
            </>
            }
        </>
    );

}

export default AuthLinks;