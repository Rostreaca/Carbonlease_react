import { useState } from "react";
import { NavMenu } from "../Header/Header.styled";

const Nav = ({ isMobileNavOpen, onMobileNavToggle, onNavLinkClick }) => {
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleDropdownToggle = (e) => {
        e.preventDefault();
        setOpenDropdown((s) => !s);
    };

    return (
        <NavMenu id="navmenu" className={`navmenu ${isMobileNavOpen ? 'mobile-nav-active' : ''}`}>
            <ul>
                <li><a href="#hero" onClick={onNavLinkClick}>Home</a></li>

                <li className="dropdown">
                    <a href="#" onClick={handleDropdownToggle}>
                        <span>커뮤니티</span>
                        <i className={`bi bi-chevron-down toggle-dropdown ${openDropdown ? 'active' : ''}`}></i>
                    </a>
                    <ul className={openDropdown ? 'dropdown-active' : ''}>
                        <li><a href="#" onClick={onNavLinkClick}>일반 게시판</a></li>
                        <li><a href="#" onClick={onNavLinkClick}>인증 게시판</a></li>
                    </ul>
                </li>

                <li><a href="#about" onClick={onNavLinkClick}>캠페인</a></li>
                <li><a href="#features" onClick={onNavLinkClick}>공지사항</a></li>
                <li><a href="#contact" onClick={onNavLinkClick}>Contact</a></li>
                <li className="d-xl-none" style={{display: 'flex', alignItems: 'center', padding: '10px 20px'}}>
                    <a href="#login" onClick={onNavLinkClick} style={{padding: 0, flex: 'none', width: 'auto'}}>로그인</a>
                    <span style={{margin: '0 8px', color: 'var(--nav-dropdown-color)'}}>|</span>
                    <a href="#signup" onClick={onNavLinkClick} style={{padding: 0, flex: 'none', width: 'auto'}}>회원가입</a>
                </li>
            </ul>

            <i
                className={`mobile-nav-toggle d-xl-none ${isMobileNavOpen ? 'bi bi-x' : 'bi bi-list'}`}
                onClick={onMobileNavToggle}
            ></i>
        </NavMenu>
    );
};

export default Nav;
