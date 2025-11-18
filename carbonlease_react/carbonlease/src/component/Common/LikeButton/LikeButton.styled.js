import styled from 'styled-components';

const LikeButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: ${props => props.$liked ? '#e74c3c' : '#adb5bd'};
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    transition: color 0.2s;
    padding: 0.25rem;
    position: absolute;
    top:10px;
    right:10px;
    &:hover {
        color: #e74c3c;
    }
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
    &.detail-like-btn {
        position: static;
        top: unset;
        right: unset;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 32px;
        background: white;
        color: ${props => props.$liked ? '#e74c3c' : '#333'};
        border: 2px solid #ddd;
        border-radius: 30px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
`;

export default LikeButton;