import styled from 'styled-components';

export const FieldGroup = styled.div`
    margin-bottom: 1.5rem;
`;

export const FieldLabel = styled.label`
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #212529;
    font-size: 0.95rem;
`;

export const FieldInput = styled.input`
    width: 100%;
    padding: 0.625rem 0.875rem;
    font-size: 0.95rem;
    border: 1px solid ${props => props.$error ? '#dc3545' : '#dee2e6'};
    border-radius: 0.375rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
        border-color: ${props => props.$error ? '#dc3545' : '#86b7fe'};
        outline: 0;
        box-shadow: 0 0 0 0.25rem ${props => props.$error ? 'rgba(220, 53, 69, 0.25)' : 'rgba(13, 110, 253, 0.25)'};
    }

    &::placeholder {
        color: #6c757d;
    }
`;

export const FieldTextarea = styled.textarea`
    width: 100%;
    padding: 0.625rem 0.875rem;
    font-size: 0.95rem;
    border: 1px solid ${props => props.$error ? '#dc3545' : '#dee2e6'};
    border-radius: 0.375rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    resize: vertical;
    min-height: 120px;

    &:focus {
        border-color: ${props => props.$error ? '#dc3545' : '#86b7fe'};
        outline: 0;
        box-shadow: 0 0 0 0.25rem ${props => props.$error ? 'rgba(220, 53, 69, 0.25)' : 'rgba(13, 110, 253, 0.25)'};
    }

    &::placeholder {
        color: #6c757d;
    }
`;

export const FieldSelect = styled.select`
    width: 100%;
    padding: 0.625rem 2.5rem 0.625rem 0.875rem;
    font-size: 0.95rem;
    border: 1px solid ${props => props.$error ? '#dc3545' : '#dee2e6'};
    border-radius: 0.375rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    background-color: #fff;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23212529' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 12px 12px;

    &:focus {
        border-color: ${props => props.$error ? '#dc3545' : '#86b7fe'};
        outline: 0;
        box-shadow: 0 0 0 0.25rem ${props => props.$error ? 'rgba(220, 53, 69, 0.25)' : 'rgba(13, 110, 253, 0.25)'};
    }
`;

export const FieldError = styled.span`
    display: block;
    margin-top: 0.375rem;
    font-size: 0.875rem;
    color: #dc3545;
`;

export const FileInputWrapper = styled.div`
    position: relative;
`;

export const HiddenFileInput = styled.input`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
`;

export const FileInputLabel = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 0.875rem;
    font-size: 0.95rem;
    font-weight: 400;
    color: #495057;
    background-color: #fff;
    border: 1px solid ${props => props.$error ? '#dc3545' : '#dee2e6'};
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
    width: 100%;

    &:hover {
        background-color: #f8f9fa;
    }

    i {
        color: #6c757d;
    }
`;

export const DatePickerWrapper = styled.div`
    position: relative;

    input[type="date"] {
        cursor: pointer;
        
        &::-webkit-calendar-picker-indicator {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: auto;
            height: auto;
            color: transparent;
            background: transparent;
            cursor: pointer;
            opacity: 0;
        }

        &::-webkit-calendar-picker-indicator:hover {
            opacity: 0;
        }
    }
`;

export const SwitchWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

export const SwitchInput = styled.input`
    display: none;
`;

export const SwitchLabel = styled.label`
    position: relative;
    width: 48px;
    height: 26px;
    background-color: ${props => (props.$checked ? '#0d6efd' : '#dee2e6')};
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &::after {
        content: "";
        position: absolute;
        width: 22px;
        height: 22px;
        background-color: #fff;
        border-radius: 50%;
        top: 2px;
        left: ${props => (props.$checked ? '24px' : '2px')};
        transition: left 0.2s ease;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
`;

