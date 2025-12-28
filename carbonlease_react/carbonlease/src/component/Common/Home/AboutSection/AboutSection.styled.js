// NoticeList 스타일
export const NoticeListWrapper = styled.div`
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 28px 0 12px 0;
    position: relative;
    min-height: 320px;
`;

export const NoticeListButton = styled.button`
    position: absolute;
    right: 18px;
    top: -26px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: #222;
    color: #fff;
    border: none;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(0,0,0,0.10);
    z-index: 2;
    padding: 0;
`;

export const NoticeListUl = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0 18px;
`;

export const NoticeListLi = styled.li`
    display: flex;
    align-items: center;
    border-bottom: ${({ $isLast }) => $isLast ? 'none' : '1px solid #e0e0e0'};
    padding: 22px 0 16px 0;
    cursor: pointer;
    gap: 18px;
`;

export const NoticeListDate = styled.span`
    color: #888;
    font-size: 17px;
    min-width: 100px;
    text-align: left;
    margin-right: 0;
`;

export const NoticeListTitle = styled.span`
    font-weight: ${({ $highlight }) => $highlight ? 700 : 500};
    font-size: 20px;
    color: #222;
    word-break: keep-all;
`;
import styled from 'styled-components';

export const AboutSectionWrapper = styled.section`
    padding: 80px 0;
    background: white;
    border-top: 1px solid #f0f0f0;
    
    @media (max-width: 1199px) {
        padding: 60px 0;
    }

    @media (max-width: 768px) {
        padding: 40px 0;
    }
`;

export const SectionTitle = styled.div`
    text-align: center;
    margin-bottom: 80px;

    span {
        display: inline-block;
        font-size: 14px;
        font-weight: 600;
        color: var(--accent-color);
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 15px;
        position: relative;
        padding-bottom: 10px;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 3px;
            background: var(--accent-color);
            border-radius: 2px;
        }
    }

    h2 {
        font-size: 45px;
        font-weight: 700;
        color: var(--heading-color);
        margin-bottom: 20px;
        letter-spacing: -1px;

        @media (max-width: 768px) {
            font-size: 35px;
        }
    }

    p {
        font-size: 17px;
        color: var(--default-color);
        margin: 0;
        line-height: 1.6;
    }

    @media (max-width: 1199px) {
        margin-bottom: 60px;
    }

    @media (max-width: 768px) {
        margin-bottom: 40px;
    }
`;

export const AboutInner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    padding:90px 0;
    @media (max-width: 900px) {
        flex-direction: column;
        gap: 18px;
        align-items: stretch;
    }
`;

export const ImageFallback = styled.div`
    width: 400px;
    height: 100%;
    min-height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border-radius: 8px;
    color: #9aa0a6;
    font-size: 16px;

    @media (min-width: 992px) {
        min-height: 300px;
    }

    @media (max-width: 768px) {
        min-height: 180px;
    }
`;

export const AboutContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    h3 {
        font-size: 28px;
        font-weight: 700;
        color: var(--heading-color);
        margin-bottom: 20px;

        @media (max-width: 768px) {
            font-size: 22px;
        }
    }

    .fst-italic {
        font-style: italic;
        font-size: 16px;
        color: var(--default-color);
        margin-bottom: 20px;
    }

    ul {
        list-style: none;
        padding: 0;
        margin-bottom: 20px;

        li {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            font-size: 15px;
            color: var(--default-color);

            i {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                color: var(--accent-color);
                border-radius: 50%;
                margin-right: 12px;
                flex-shrink: 0;
                font-size: 22px;
            }

            span {
                flex: 1;
            }
        }
    }

    p {
        font-size: 15px;
        color: var(--default-color);
        line-height: 1.8;
    }

    img {
        height: auto;
        border-radius: 8px;
        border: 2px solid #f0f0f0;
        padding: 10px;
        background: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        display: block;
        transition: all 0.3s ease;

        &:hover {
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
            transform: translateY(-3px);
        }
    }
`;

export const AboutCol = styled.div`
    flex: 1;
    min-width: 320px;
    @media (max-width: 900px) {
        min-width: 0;
        width: 100%;
    }
`;

export const AboutColTitle = styled.h2`
    color: ${props => props.color || '#222'};
    font-weight: 700;
    font-size: 1.3rem;
    margin-bottom: 16px;
    @media (max-width: 900px) {
        font-size: 1.1rem;
        margin-bottom: 12px;
    }
`;


export const WatchVideoButton = styled.button`
    border: 2px solid #1976d2 !important;
`;
