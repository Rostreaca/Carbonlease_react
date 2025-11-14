import styled from "styled-components";

export const LayoutAuthentication = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #ffffff;
`;

export const LayoutAuthenticationContent = styled.div`
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
`;

export const LayoutAuthenticationFooter = styled.div`
    flex-shrink: 0;
`;

export const MainContent = styled.main`
    flex: 1;
    display: flex;
    align-items: center;
    background-color: #04a04d1f;
`;

export const LoginCard = styled.div`
    box-shadow: 0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15);
    border: 0;
    border-radius: 0.35rem;
    margin-top: 3rem;

    .card-header {
        padding: 1rem 1.35rem;
        background-color: rgba(0, 0, 0, 0.03);
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        border-radius: calc(0.35rem - 1px) calc(0.35rem - 1px) 0 0;

        h3 {
            text-align: center;
            font-weight: 300;
            margin: 1rem 0;
        }
    }

    .card-body {
        background-color: #fff;
        padding: 1.35rem;
    }

    .card-footer {
        padding: 1rem 1.35rem;
        background-color: rgba(0, 0, 0, 0.03);
        border-top: 1px solid rgba(0, 0, 0, 0.125);
        text-align: center;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
    }
`;

export const FormFloating = styled.div`
    position: relative;
    margin-bottom: 1rem;

    input {
        height: calc(3.5rem + 2px);
        padding: 1rem 0.75rem;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        width: 100%;
        font-size: 1rem;
        line-height: 1.5;
        
        &:focus {
            border-color: #86b7fe;
            outline: 0;
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }

        &::placeholder {
            color: transparent;
        }

        &:focus ~ label,
        &:not(:placeholder-shown) ~ label {
            opacity: 0.65;
            transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);
        }
    }

    label {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        padding: 1rem 0.75rem;
        pointer-events: none;
        border: 1px solid transparent;
        transform-origin: 0 0;
        transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
        color: #6c757d;
    }
`;

export const FormCheck = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    input[type="checkbox"] {
        width: 1em;
        height: 1em;
        margin-right: 0.5rem;
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 0.25em;
        cursor: pointer;

        &:checked {
            background-color: #0d6efd;
            border-color: #0d6efd;
        }
    }

    label {
        cursor: pointer;
        margin-bottom: 0;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1.5rem;
    margin-bottom: 0;

    .small-link {
        font-size: 0.875rem;
        color: #0d6efd;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }

    .btn-primary {
        color: #fff;
        background-color: #04a04d;
        border-color: #04a04d;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        border-radius: 0.25rem;
        text-decoration: none;
        display: inline-block;
        cursor: pointer;
        border: 1px solid #04a04d;
        box-shadow: none;

        &:hover {
            background-color: #04a04d;
            border-color: #04a04d;
            box-shadow: none;
        }

        &:focus {
            outline: none;
            box-shadow: none;
        }
    }
`;

export const Footer = styled.footer`
    padding: 1.5rem 0;
    background-color: #f8f9fa;
    margin-top: auto;

    .container-fluid {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }

    .footer-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.875rem;
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

export default LayoutAuthentication;
