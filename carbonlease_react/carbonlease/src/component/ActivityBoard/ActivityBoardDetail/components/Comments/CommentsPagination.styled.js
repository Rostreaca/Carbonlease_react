import styled from 'styled-components';

export const PaginationContainer = styled.div`
    width: 60%; 
    margin: 30px auto 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
`;

export const PageButton = styled.button`
    min-width: 32px;
    height: 32px;

    /* 기본 / active */
    border: 1px solid #00A34A;
    background-color: 
        ${props => props.$active ? '#00A34A' : '#ffffff'};
    color: 
        ${props => props.$active ? '#ffffff' : '#00A34A'};

    border-radius: 6px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? '0.5' : '1'};
    transition: all 0.2s ease;
    font-weight: ${props => props.$active ? '600' : '400'};
    display: flex;
    align-items: center;
    justify-content: center;

    /* hover */
    &:hover:not(:disabled) {
        background-color: 
            ${props => props.$active ? '#00833bff' : '#e3fdf2'};
        border-color: 
            ${props => props.$active ? '#00833bff' : '#00833bff'};
    }

    /* 아이콘 같은 경우 */
    i {
        font-size: 14px;
    }
`;


