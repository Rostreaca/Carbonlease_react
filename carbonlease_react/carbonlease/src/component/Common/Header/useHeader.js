import { useEffect, useState } from "react";

export default function useHeader() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    // 스크롤 시 sticky 적용
    useEffect(() => {
        const onScroll = () => {
        setScrolled(window.scrollY > 100);
        };
        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // 모바일 메뉴 토글
    const toggleMobile = () => {
        setMobileOpen(prev => !prev);
        document.body.classList.toggle("mobile-nav-active");
    };

    // 드롭다운 토글
    const toggleDropdown = (index) => {
        setActiveDropdown(prev => (prev === index ? null : index));
    };

    // 모바일에서 메뉴 클릭하면 닫기
    const handleMenuClick = () => {
        if (mobileOpen) toggleMobile();
    };

    return {
        scrolled,
        mobileOpen,
        activeDropdown,
        toggleMobile,
        toggleDropdown,
        handleMenuClick
    };
}
