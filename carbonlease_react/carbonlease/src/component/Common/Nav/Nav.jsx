import { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthLinks from "../Header/AuthLinks/AuthLinks";
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
                <li>
                    <NavLink to="/" onClick={onNavLinkClick}>
                        Home
                    </NavLink>
                </li>

                <li className="dropdown">
                    <a href="#" onClick={handleDropdownToggle}>
                        <span>커뮤니티</span>
                        <i className={`bi bi-chevron-down toggle-dropdown ${openDropdown ? 'active' : ''}`}></i>
                    </a>
                    <ul className={openDropdown ? 'dropdown-active' : ''}>
                        <li>
                            <NavLink 
                            to="/boards" 
                            onClick={onNavLinkClick}
                            >
                                일반 게시판
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                            to="/activityBoards"
                            onClick={onNavLinkClick}
                            >
                                인증 게시판
                            </NavLink>
                        </li>
                    </ul>
                </li>

                <li>
                    <NavLink 
                    to="/campaigns" 
                    onClick={onNavLinkClick}
                    >
                    캠페인
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to="/notices" 
                    onClick={onNavLinkClick}
                    >
                        공지사항
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" onClick={onNavLinkClick}>
                        About
                    </NavLink>
                </li>

                <li className="d-xl-none" style={{display: 'flex', alignItems: 'center', padding: '10px 20px'}}>
                    <AuthLinks onClick={onNavLinkClick} />
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
