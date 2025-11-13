import { useEffect, useState } from 'react';
import Nav from "../Nav/Nav";
import { HeaderWrap } from "./Header.styled";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 100;
            setIsScrolled(scrolled);

            try {
                if (scrolled) document.body.classList.add('scrolled');
                else document.body.classList.remove('scrolled');
            } catch (e) {
                // ignore (e.g., server-side rendering)
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMobileNavToggle = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    const closeMobileNav = () => {
        setIsMobileNavOpen(false);
    };

    return (
        <HeaderWrap id="header" className={`header d-flex align-items-center fixed-top ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container position-relative d-flex align-items-center justify-content-between">
                
                {/* Logo */}
                <a href="/" className="logo d-flex align-items-center me-auto me-xl-0">
                    <h1 className="sitename">Carbonlease</h1>
                </a>
                
                {/* Navigation */}
                <Nav isMobileNavOpen={isMobileNavOpen} onMobileNavToggle={handleMobileNavToggle} onNavLinkClick={closeMobileNav} />
                
                {/* Auth Links - desktop only */}
                <div className="d-none d-xl-flex align-items-center" style={{gap: '8px'}}>
                    <a href="#login" style={{color: 'var(--nav-color)', textDecoration: 'none', fontSize: '14px'}}>로그인</a>
                    <span style={{color: 'var(--nav-color)'}}>|</span>
                    <a href="#signup" style={{color: 'var(--nav-color)', textDecoration: 'none', fontSize: '14px'}}>회원가입</a>
                </div>
            </div>
        </HeaderWrap>
    );
};

export default Header;