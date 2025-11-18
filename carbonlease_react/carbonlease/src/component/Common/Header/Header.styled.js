import styled from "styled-components";


/* ----------------------------------------
    Global Header
---------------------------------------- */
export const HeaderWrap = styled.header`
    --background-color: rgba(255, 255, 255, 0);
    color: var(--default-color);
    background-color: var(--background-color);
    ${'' /* padding: 0px 0 15px 0; */}
    border-bottom: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
    transition: all 0.5s;
    z-index: 997;
    display: flex;
    flex-direction: column;

    .logo {
        text-decoration: none;

        .sitename {
            font-size: 22px;
            margin: 0;
            font-weight: 600;
            color: var(--heading-color);
        }
    }

    &.scrolled {
        box-shadow: 0px 0 18px rgba(0, 0, 0, 0.1);
        background-color: var(--surface-color);
        .topbar {
            height: 0;
            visibility: hidden;
            overflow: hidden;
        }
    }

    .container {padding: 10px 0;
    }
`;

/* Topbar */
export const Topbar = styled.div`
    background-color: var(--background-color);
    height: 40px;
    padding: 0;
    font-size: 14px;
    transition: all 0.2s;
    width: 100%;
    overflow: hidden;
    
    .contact-info {
        width:100%;
        i {
            font-style: normal;
            color: var(--contrast-color);
            margin-right: 10px;
            a,
            span {
                padding-left: 5px;
                color: var(--contrast-color);
            }

            a {
                line-height: 0;
                transition: 0.3s;

                &:hover {
                    color: var(--contrast-color);
                    text-decoration: underline;
                }
            }
        }
    }

    @media (max-width: 575px) {
        .contact-info i a,
        .contact-info i span {
            font-size: 13px;
        }
    }

    .social-links a {
        color: color-mix(in srgb, var(--contrast-color), transparent 40%);
        line-height: 0;
        transition: 0.3s;
        margin-left: 20px;

        &:hover {
            color: var(--contrast-color);
        }
    }
`;

/* Notice Slider */
export const NoticeSlider = styled.div`
    position: relative;
    height: 20px;
    overflow: hidden;
    flex: 1;
    max-width: 800px;

    .notice-item {
        position: absolute;
        width: 100%;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease-in-out;
        pointer-events: none;

        &.active {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }

        a {
            color: var(--contrast-color);
            text-decoration: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;

            &:hover {
                text-decoration: underline;
            }
        }
    }
`;

/* Branding */
export const Branding = styled.div`
    min-height: 60px;
    padding: 10px 0;

    .logo {
        line-height: 1;

        img {
            max-height: 36px;
            margin-right: 8px;
        }

        h1 {
            font-size: 30px;
            margin: 0;
            font-weight: 500;
            color: var(--heading-color);
        }
    }
`;

/* Button Get Started */
export const BtnGetStarted = styled.a`
    color: var(--contrast-color);
    background: var(--accent-color);
    font-size: 14px;
    padding: 8px 26px;
    margin: 0;
    border-radius: 4px;
    transition: 0.3s;

    &:hover,
    &:focus:hover {
        color: var(--contrast-color);
        background: color-mix(in srgb, var(--accent-color), transparent 15%);
    }

    @media (max-width: 1200px) {
        margin: 0 15px 0 0;
        padding: 6px 20px;
        order: 2;
    }
`;

/* ----------------------------------------
    Navigation Menu
---------------------------------------- */
export const NavMenu = styled.nav`
    padding: 0;

    /* Desktop */
    @media (min-width: 1200px) {
        ul {
            margin: 0;
            padding: 0;
            display: flex;
            list-style: none;
            align-items: center;
        }

        li {
            position: relative;
        }

        a,
        a:focus {
            color: var(--nav-color);
            padding: 18px 15px;
            font-size: 16px;
            font-family: var(--nav-font);
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: space-between;
            white-space: nowrap;
            transition: 0.3s;
        }

        a i,
        a:focus i {
            font-size: 12px;
            line-height: 0;
            margin-left: 5px;
            transition: 0.3s;
        }

        li:last-child a {
            padding-right: 0;
        }

        li:hover > a,
        .active,
        .active:focus {
            color: var(--nav-hover-color);
        }

        /* Dropdown */
        .dropdown ul {
            margin: 0;
            padding: 10px 0;
            background: var(--nav-dropdown-background-color);
            display: block;
            position: absolute;
            visibility: hidden;
            left: 14px;
            top: 130%;
            opacity: 0;
            transition: 0.3s;
            border-radius: 4px;
            z-index: 99;
            box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);

            li {
                min-width: 200px;
            }

            a {
                padding: 10px 20px;
                font-size: 15px;
                text-transform: none;
                color: var(--nav-dropdown-color);

                i {
                    font-size: 12px;
                }

                &:hover,
                &.active:hover,
                li:hover > a {
                    color: var(--nav-dropdown-hover-color);
                }
            }
        }

        .dropdown:hover > ul {
            opacity: 1;
            top: 100%;
            visibility: visible;
        }

        .dropdown .dropdown ul {
            top: 0;
            left: -90%;
            visibility: hidden;
        }

        .dropdown .dropdown:hover > ul {
            opacity: 1;
            top: 0;
            left: -100%;
            visibility: visible;
        }
    }

    /* Mobile */
    @media (max-width: 1199px) {
        padding: 0;
        z-index: 9997;

        .mobile-nav-toggle {
            color: var(--nav-color);
            font-size: 28px;
            line-height: 0;
            margin-right: 10px;
            cursor: pointer;
            transition: color 0.3s;
        }

        ul {
            display: none;
            list-style: none;
            position: absolute;
            inset: 60px 20px 20px 20px;
            padding: 10px 0;
            margin: 0;
            border-radius: 6px;
            background-color: var(--nav-mobile-background-color);
            overflow-y: auto;
            transition: 0.3s;
            z-index: 9998;
            box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
        }

        a,
        a:focus,
        .dropdown-btn {
            color: var(--nav-dropdown-color);
            padding: 10px 20px;
            font-family: var(--nav-font);
            font-size: 17px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: space-between;
            white-space: nowrap;
            transition: 0.3s;
            background: none;
            border: none;
            width: 100%;
            text-align: left;
            cursor: pointer;
        }

        a i,
        a:focus i,
        .dropdown-btn i {
            font-size: 12px;
            line-height: 0;
            margin-left: 5px;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: 0.3s;
            background-color: color-mix(in srgb, var(--accent-color), transparent 90%);
        }

        a i:hover,
        a:focus i:hover,
        .dropdown-btn i:hover {
            background-color: var(--accent-color);
            color: var(--contrast-color);
        }

        a:hover,
        .active,
        .active:focus,
        .dropdown-btn:hover {
            color: var(--nav-dropdown-hover-color);
        }

        .active i,
        .active:focus i {
            background-color: var(--accent-color);
            color: var(--contrast-color);
            transform: rotate(180deg);
        }

        .dropdown ul {
            position: static;
            display: none;
            z-index: 99;
            padding: 10px 0;
            margin: 10px 20px;
            background-color: var(--nav-dropdown-background-color);
            border: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
            box-shadow: none;
            transition: all 0.5s ease-in-out;
        }

        .dropdown ul ul {
            background-color: rgba(33, 37, 41, 0.1);
        }

        .dropdown > .dropdown-active {
            display: block;
            background-color: rgba(33, 37, 41, 0.03);
        }

        &.mobile-nav-active {
            position: fixed;
            overflow: hidden;
            inset: 0;
            background: rgba(33, 37, 41, 0.8);
            transition: 0.3s;

            > ul {
                display: block;
            }

            .mobile-nav-toggle {
                color: #fff;
                position: absolute;
                font-size: 32px;
                top: 15px;
                right: 15px;
                margin-right: 0;
                z-index: 9999;
            }
        }
    }
`;


