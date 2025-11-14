import { Topbar } from "../Header.styled";
import { NavLink } from 'react-router-dom';

const AuthLinks = ({ onClick }) => {
    return (
        <>
            <NavLink
            to="/login" 
            onClick={onClick}
            style={{padding: 0, flex: 'none', width: 'auto'}}
            >
                로그인
            </NavLink>
            <span style={{margin: '0 8px', color: 'var(--nav-dropdown-color)'}}>|</span>
            <NavLink 
            to="/member/enrollForm" 
            onClick={onClick}
            style={{padding: 0, flex: 'none', width: 'auto'}}
            >회원가입</NavLink>

        </>
    );

}

export default AuthLinks;