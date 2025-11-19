import styled from 'styled-components';

export const CampaignListContainer = styled.div`
    padding: 40px 0;
`;

export const CampaignGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

export const CampaignCard = styled.div`
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }
`;

export const CampaignImage = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    background: #f5f5f5;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const LikeButton = styled.button`
    position: absolute;
    top: 12px;
    right: 12px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.95);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    z-index: 10;

    &:hover {
        transform: scale(1.1);
        background: white;
    }

    i {
        font-size: 20px;
        color: ${props => props.$liked ? '#ff4757' : '#ddd'};
        transition: color 0.2s ease;
    }
`;

export const CampaignContent = styled.div`
    padding: 20px;
`;

export const CampaignCategory = styled.span`
    display: inline-block;
    padding: 4px 12px;
    background: #e8f5e9;
    color: var(--accent-color);
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 12px;
`;

export const CampaignTitle = styled.h3`
    font-size: 18px;
    font-weight: 700;
    color: var(--heading-color);
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const CampaignDescription = styled.p`
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

export const CampaignInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 16px;
    border-top: 1px solid #f0f0f0;
    font-size: 13px;
    color: #999;
`;

export const ParticipantCount = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    i {
        color: var(--accent-color);
    }
`;

export const CampaignDate = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    i {
        color: #999;
    }
`;

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px 20px;
    font-size: 16px;
    color: #999;
`;

export const EmptyContainer = styled.div`
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
    }
`;
