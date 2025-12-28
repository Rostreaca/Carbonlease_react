
import styled from 'styled-components';

export const BannerWrapper = styled.div`
    position: relative;
    width: 100%;
    ${'' /* max-width: 600px; */}
    margin: 32px auto;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(0,0,0,0.12);
    background: #fff;
`;

export const BannerImage = styled.div`
    width: 100%;
    height: 260px;
    background-size: cover;
    background-position: center bottom;
    background-repeat: no-repeat;
    filter: brightness(0.7);
    display: block;
`;


export const DecoImageLeft = styled.img`
    position: absolute;
    top: 20px;
    left: 60px;
    width: 200px;
    z-index: 2;
    pointer-events: none;
    display:none;
`;

export const DecoImageRight = styled.img`
    position: absolute;
    top: 10px;
    right: 60px;
    width: 200px;
    z-index: 2;
    pointer-events: none;
    display:none;
`;

export const BannerOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    ${'' /* background: #101311ff; */}
    ${'' /* text-shadow: 0 2px 8px rgba(0,0,0,0.4); */}
    padding: 32px;
    box-sizing: border-box;
`;

export const CompanyName = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;
    color: #fff;
    position: absolute;
    left: 20px;
    top: 20px;
`;


export const CompanyLogo = styled.img`
    width: 32px;
    height: 32px;
    margin-right: 8px;
    vertical-align: middle;
    border-radius: 50%;
    object-fit: cover;
`;

export const EventTitle = styled.div`
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 16px;
`;

export const Participants = styled.div`
    font-size: 28px;
    margin-bottom: 24px;
    display: flex;
    align-items: flex-end;
    gap: 8px;
    margin-bottom: 24px;
`;

export const ParticipantsLabel = styled.span`
    font-size: 20px;
`;

export const ParticipantsNumber = styled.span`
    font-size: 28px;
    font-weight: 700;
`;

export const ParticipateButton = styled.button`
    padding: 12px 32px;
    font-size: 18px;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    background: #4287e2b3;
    color: #f8f9fa;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    transition: background 0.2s;
    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
  }
`;
