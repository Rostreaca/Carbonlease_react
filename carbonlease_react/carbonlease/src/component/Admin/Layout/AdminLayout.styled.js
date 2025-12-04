// 오버레이(모바일 사이드바 활성화 시)
export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.3);
    z-index: 1099;
    display: block;
`;

import styled from "styled-components";

export const LayoutSidenav = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #f8f9fa;

    @media (max-width: 900px) {
        flex-direction: column;
    }
`;

export const SidenavContent = styled.div`
        .sidebar-close {
            display: none;
        }
        @media (max-width: 900px) {
            .sidebar-close {
                    @media (max-width: 900px) {
                        margin-top: 48px;
                    }
                display: block;
                position: absolute;
                top: 12px;
                right: 12px;
                width: 44px;
                height: 44px;
                background: #212529;
                border: none;
                border-radius: 50%;
                color: #fff;
                font-size: 2.2rem;
                font-weight: bold;
                z-index: 1200;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            }
            .sidebar-close-icon {
                font-size: 2.2rem;
                line-height: 1;
                color: #fff;
            }
        }
    width: 225px;
    background-color: #212529;
    flex-shrink: 0;
    transition: transform 0.3s ease-in-out;

    @media (max-width: 900px) {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 70vw;
        max-width: 320px;
        z-index: 1100;
        transform: translateX(-100%);
        display: block;
        box-shadow: 2px 0 8px rgba(0,0,0,0.15);
        &.active {
            transform: translateX(0);
        }
    }

    @media (max-width: 600px) {
        width: 85vw;
        max-width: 95vw;
    }
`;

export const SidenavMenu = styled.nav`
    padding: 1rem;

    .sb-sidenav-menu-heading {
        padding: 1.75rem 1rem 0.75rem;
        font-size: 0.75rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: rgba(255, 255, 255, 0.25);
    }

    .nav-link {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        color: rgba(255, 255, 255, 0.5);
        text-decoration: none;
        transition: color 0.15s ease-in-out;

        &:hover {
            color: #fff;
        }

        &.active {
            color: #fff;
        }

        .sb-nav-link-icon {
            margin-right: 0.5rem;
            font-size: 0.9rem;
        }
    }
`;

export const SidenavFooter = styled.div`
    padding: 0.75rem 1rem;
    background-color: #343a40;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.875rem;
`;

export const MainContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
`;

export const Topnav = styled.nav`
    height: 56px;
    background-color: #212529;
    display: flex;
    align-items: center;
    padding: 0 1.5rem;
    position: sticky;
    top: 0;
    z-index: 1030;

    .navbar-brand {
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.25rem;
        text-decoration: none;
        margin-right: 1rem;

        &:hover {
            color: #fff;
        }
    }

    .sidebar-toggle {
        background: none;
        border: none;
        color: #fff;
        font-size: 1.5rem;
        margin-right: 1rem;
        cursor: pointer;
        padding: 0.25rem 0.75rem;
        display: none;
    }

    @media (max-width: 900px) {
        height: 48px;
        padding: 0 0.5rem;
        .navbar-brand {
            font-size: 1rem;
        }
        .navbar-nav {
            gap: 0.5rem;
        }
        .sidebar-toggle {
            display: block;
        }
    }
`;

export const PageContent = styled.main`
    flex: 1;
    padding: 1rem 1.5rem 1rem 1.5rem;
    background-color: #04a04d1f;

`;

export const Footer = styled.footer`
    padding: 1rem;
    background-color: #f8f9fa;
    border-top: 1px solid #dee2e6;
    font-size: 0.875rem;

    .footer-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .text-muted {
        color: #6c757d;
    }

    a {
        color: #0d6efd;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    @media (max-width: 900px) {
        padding: 0.5rem;
        font-size: 0.75rem;
        .footer-content {
            flex-direction: column;
            gap: 0.5rem;
        }
    }
`;

export default LayoutSidenav;
