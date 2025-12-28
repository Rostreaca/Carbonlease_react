import styled from 'styled-components';

export const HeroSectionWrapper = styled.section`
    position: relative;
    overflow: hidden;
    margin-top: 80px;
    padding: 85px 0 45px 0;

    /* AOS 애니메이션 강제 비활성화 */
    & * {
        opacity: 1 !important;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 0;
        /* SVG 물방울 효과 */
        background: url('data:image/svg+xml;utf8,<svg width="100%25" height="100%25" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="900" cy="150" r="70" fill="%231976d2" fill-opacity="0.16"/><circle cx="700" cy="400" r="60" fill="%23f6e393" fill-opacity="0.15"/><circle cx="400" cy="450" r="50" fill="%2300a34a" fill-opacity="0.13"/><circle cx="1000" cy="500" r="40" fill="%231976d2" fill-opacity="0.10"/><filter id="blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="18"/></filter><circle cx="900" cy="150" r="70" fill="%231976d2" fill-opacity="0.16" filter="url(%23blur)"/><circle cx="700" cy="400" r="60" fill="%23f6e393" fill-opacity="0.15" filter="url(%23blur)"/><circle cx="400" cy="450" r="50" fill="%2300a34a" fill-opacity="0.13" filter="url(%23blur)"/><circle cx="1000" cy="500" r="40" fill="%231976d2" fill-opacity="0.10" filter="url(%23blur)"/></svg>');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }

    .hero-content {
        padding: 20px 0;
        position: relative;
        z-index: 1;
    }
    
    .container .row {
        justify-content: center;
    }

    @media (max-width: 1200px) {
        margin-top: 90px;
    }
`;

export const HeroTitle = styled.h1`
    font-size: 2.5rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 32px;
    color: var(--heading-color);

    @media (max-width: 768px) {
        font-size: 2rem;
        font-weight: 600;
        margin-top: 24px;
        margin-bottom: 24px;
    }
`;

export const HeroDescription = styled.p`
    font-size: 1.25rem;
    font-weight: 400;
    line-height: 1.7;
    color: color-mix(in srgb, var(--default-color), transparent 20%);
    margin-bottom: 48px;
    
    @media (max-width: 768px) {
        font-size: 1.125rem;
        margin-bottom: 40px;
    }
`;

export const HeroActions = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
    margin-bottom: 64px;

    @media (max-width: 576px) {
        flex-direction: column;
        gap: 20px;
        margin-bottom: 48px;
    }
`;
