import styled from 'styled-components';

export const FormContainer = styled.div`
    padding: 1.5rem;
`;

export const FormCard = styled.div`
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    margin-bottom: 1.5rem;
`;

export const FormCardHeader = styled.div`
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #dee2e6;
    background-color: #f8f9fa;
    border-radius: 0.5rem 0.5rem 0 0;

    h5 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: #212529;
    }
`;


export const FormCardBody = styled.div`
    padding: 1.5rem;
`;

export const FormButtonGroup = styled.div`
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #dee2e6;
`;

export const SubmitButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 500;
    color: #fff;
    background-color: #198754;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    &:hover {
        background-color: #157347;
    }

    &:active {
        background-color: #146c43;
    }

    i {
        font-size: 0.875rem;
    }
`;

export const CancelButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 500;
    color: #495057;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.15s ease-in-out;

    &:hover {
        background-color: #f8f9fa;
        border-color: #adb5bd;
    }

    &:active {
        background-color: #e9ecef;
    }

    i {
        font-size: 0.875rem;
    }
`;
