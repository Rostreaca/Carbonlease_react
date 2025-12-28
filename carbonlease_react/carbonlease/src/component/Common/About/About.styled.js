import styled from 'styled-components';

export const AboutList = styled.ul`
    list-style: disc;
    color: #eaf6ff;
    font-size: 1.15rem;
    margin: 0 0 1.5em 1.2em;
    padding: 0;
    text-align: left;
    max-width: 420px;
`;

export const AboutWrapper = styled.section`
    position: relative;
    height: 100vh;
    background: linear-gradient(120deg, #6bb6ff 0%, #7ed6c1 100%);
    overflow: hidden;
    margin: 0;
    padding: 0;
    margin-bottom:-40px;
`;

export const CenterContent = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const YearBadge = styled.div`
    background: rgba(255,255,255,0.25);
    color: #eaf6ff;
    font-weight: 700;
    font-size: 1.25rem;
    border-radius: 18px;
    padding: 0.25em 1.2em;
    margin-bottom: 18px;
    display: inline-block;
`;

export const MainTitle = styled.h1`
    font-size: 3.2rem;
    font-weight: 900;
    color: #eaf6ff;
    text-shadow: 0 2px 12px rgba(0,0,0,0.10);
    margin-bottom: 0.2em;
    text-align: center;
    letter-spacing: -2px;
`;

export const SubTitle = styled.h2`
    font-size: 2.2rem;
    font-weight: 800;
    color: #183a54;
    margin-bottom: 1.1em;
    text-align: center;
    letter-spacing: -1px;
`;

export const Desc = styled.p`
    font-size: 1.25rem;
    color: #eaf6ff;
    margin-bottom: 2.2em;
    text-align: center;
    font-weight: 400;
`;

export const EarthImg = styled.img`
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 420px;
    z-index: 1;
    @media (max-width: 900px) {
        width: 270px;
    }
`;

export const CharacterImg = styled.img`
    position: absolute;
    bottom: 60px;
    width: 180px;
    z-index: 2;
    &.boy { left: 18%; }
    &.girl { right: 18%; }
    @media (max-width: 900px) {
        width: 90px;
        bottom: 30px;
        &.boy { left: 2%; }
        &.girl { right: 2%; }
    }
`;

export const DecoImg = styled.img`
  position: absolute;
  z-index: 3;
  pointer-events: none;
  opacity: 0.93;
`;
