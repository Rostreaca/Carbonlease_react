import styled from "styled-components";

export const LayoutSidenav = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #f8f9fa;
`;

export const SidenavContent = styled.div`
    width: 225px;
    background-color: #212529;
    flex-shrink: 0;
    transition: transform 0.3s ease-in-out;
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
        color: rgba(255, 255, 255, 0.5);
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0.25rem 0.75rem;
        margin-left: -0.75rem;

        &:hover {
            color: #fff;
        }
    }

    .navbar-nav {
        display: flex;
        align-items: center;
        margin-left: auto;
        list-style: none;
        padding: 0;
        margin-bottom: 0;
    }

    .nav-item {
        margin-left: 1rem;

        a {
            color: rgba(255, 255, 255, 0.5);
            text-decoration: none;

            &:hover {
                color: #fff;
            }
        }
    }
`;

export const PageContent = styled.main`
    flex: 1;
    padding: 1.5rem;
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
`;

export default LayoutSidenav;
