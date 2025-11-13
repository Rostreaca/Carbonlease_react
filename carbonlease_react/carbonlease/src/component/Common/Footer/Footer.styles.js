import styled from 'styled-components';

export const FooterWrapper = styled.footer`
    color: var(--default-color);
    background-color: var(--background-color);
    font-size: 14px;
    position: relative;

    .footer-top {
        padding-top: 50px;
        border-top: 1px solid color-mix(in srgb, var(--default-color), transparent 90%);
    }

    .footer-about .logo {
        line-height: 1;
        margin-bottom: 25px;
    }

    .footer-about .logo img {
        max-height: 40px;
        margin-right: 6px;
    }

    .footer-about .logo span {
        color: var(--heading-color);
        font-size: 30px;
        font-weight: 500;
        letter-spacing: 1px;
        font-family: var(--heading-font);
    }

    .footer-about p {
        font-size: 14px;
        font-family: var(--heading-font);
    }

    .social-links a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid color-mix(in srgb, var(--default-color), transparent 50%);
        font-size: 16px;
        color: color-mix(in srgb, var(--default-color), transparent 50%);
        margin-right: 10px;
        transition: 0.3s;
    }

    .social-links a:hover {
        color: var(--accent-color);
        border-color: var(--accent-color);
    }

    h4 {
        font-size: 16px;
        font-weight: bold;
        position: relative;
        padding-bottom: 12px;
    }

    .footer-links {
        margin-bottom: 30px;
    }

    .footer-links ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .footer-links ul i {
        padding-right: 2px;
        font-size: 12px;
        line-height: 0;
    }

    .footer-links ul li {
        padding: 10px 0;
        display: flex;
        align-items: center;
    }

    .footer-links ul li:first-child {
        padding-top: 0;
    }

    .footer-links ul a {
        color: color-mix(in srgb, var(--default-color), transparent 20%);
        display: inline-block;
        line-height: 1;
    }

    .footer-links ul a:hover {
        color: var(--accent-color);
    }

    .footer-contact p {
        margin-bottom: 5px;
    }

    .copyright {
        padding-top: 25px;
        padding-bottom: 25px;
        background-color: color-mix(in srgb, var(--default-color), transparent 95%);
    }

    .copyright p {
        margin-bottom: 0;
    }

    .credits {
        margin-top: 6px;
        font-size: 13px;
    }
`;

export default FooterWrapper;
