import styled from 'styled-components';

export const DashboardWrapper = styled.div`
    background:
        #f8f9fa;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: url('/images/Blank_Map_Pacific_World.svg') top right / contain no-repeat;
        opacity: 0.2;
        pointer-events: none;
    }
    min-height: 100vh;
    padding: 32px 0;
    filter: drop-shadow(0 0 0 transparent);
    border-radius: 30px 30px 0 0;
    overflow: hidden;
`;

export const DashboardTitle = styled.h3`
    margin: 1rem 0 2rem 1rem;
    display: block;
`;

export const DashboardRow = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 24px;
    flex-wrap: wrap;
`;

export const DashboardWideSection = styled.section`
    min-width: 600px;
`;

export const DashboardSection = styled.section`
    min-width: 500px;
`;

export const DashboardSubTitle = styled.h4`
    margin-bottom: 12px;
`;

export const ChartContainer = styled.div`
    width: 100%;
    max-width: 700px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    padding: 16px;
    margin-bottom: 24px;
`;

export const SmallChartContainer = styled.div`
    width: 100%;
    max-width: 320px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    padding: 16px;
    margin-bottom: 24px;
`;

export const ChartTitle = styled.div`
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 8px;
`;
