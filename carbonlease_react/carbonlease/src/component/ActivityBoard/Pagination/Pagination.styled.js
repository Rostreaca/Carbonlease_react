import styled from 'styled-components';

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 40px;
`;

export const PageButton = styled.button`
    min-width: 40px;
    height: 40px;
    border: 1px solid #00A34A;
    background-color:
        ${props => props.$active ? '#00A34A' : '#fff'};
    color:
        ${props => props.$active ? 'white' : '#00A34A'};
    
    border-radius: 6px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? '0.5' : '1'};
    transition: all 0.2s ease;
    font-weight: ${props => props.$active ? '600' : '400'};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${props => props.$active ? 
        '0 2px 6px rgba(0,0,0,0.15)' : 
        '0 2px 6px rgba(0,0,0,0.08)'};

    &:hover:not(:disabled) {
        background-color:
            ${props => props.$active ? '#00833bff' : '#e3fdf2'};
        border-color:
            ${props => props.$active ? '#00833bff' : '#9eeac7'};
    }

    i {
        font-size: 14px;
    }
`;
