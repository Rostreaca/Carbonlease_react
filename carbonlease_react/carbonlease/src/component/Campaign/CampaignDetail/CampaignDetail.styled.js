import styled from 'styled-components';

export const CampaignDetailContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;
`;


export const CampaignDetailHeader = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    boarder-bottom: 1px solid #e0e0e0;  
`;


export const CategoryBadge = styled.span`
    display: inline-block;
    padding: 8px 20px;
    background: #e8f5e9;
    color: var(--accent-color);
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
`;

export const SignOutBadge = styled.span`
    display: inline-block;
    padding: 8px 20px;
    background: #ffbbbbff;
    color: #d62323ff;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
`;

export const Title = styled.h1`
    font-size: 20px;
    font-weight: 700;
    color: var(--heading-color);
    line-height: 1.4;
`;

export const MetaInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
    padding: 20px 0;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 30px;
    flex-wrap: wrap;
`;

export const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    color: #666;

    i {
        font-size: 18px;
        color: var(--accent-color);
    }

    strong {
        color: #333;
        font-weight: 600;
    }
`;

export const ImageWrapper = styled.div`
    width: 100%;
    margin-bottom: 40px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    img {
        width: 100%;
        height: auto;
        display: block;
    }
`;

export const Content = styled.div`
    font-size: 16px;
    line-height: 1.8;
    color: #333;
    margin-bottom: 40px;
    white-space: pre-wrap;
    word-break: break-word;

    p {
        margin-bottom: 16px;
    }
`;

export const ActionButtons = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
    padding: 40px 0;
    border-top: 1px solid #e0e0e0;
`;

export const LikeButton = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    background: ${props => props.$liked ? '#00a34a' : 'white'};
    color: ${props => props.$liked ? 'white' : '#333'};
    border: 2px solid ${props => props.$liked ? '#00a34a' : '#ddd'};
    border-radius: 30px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    i {
        font-size: 20px;
    }

    &:active {
        transform: translateY(0);
        border: 2px solid ${props => props.$liked ? '##00a34a' : '#ddd'};
    }
`;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    background: white;
    color: #333;
    border: 2px solid #ddd;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    i {
        font-size: 18px;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        background: #f8f9fa;
        border-color: #bbb;
    }

    &:active {
        transform: translateY(0);
    }
`;

export const ErrorContainer = styled.div`
    text-align: center;
    padding: 100px 20px;
    
    i {
        font-size: 64px;
        color: #ddd;
        margin-bottom: 20px;
    }

    p {
        font-size: 16px;
        color: #999;
        margin-bottom: 20px;
    }
`;
