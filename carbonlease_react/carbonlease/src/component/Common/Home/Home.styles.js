import styled from 'styled-components';

// ===== Hero Section =====
export const HeroSection = styled.section`
    padding: 180px 0 80px 0;
    margin-top: 80px;
    background: linear-gradient(135deg, var(--surface-color) 0%, color-mix(in srgb, var(--accent-color), transparent 95%) 100%);
    position: relative;
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 80%, color-mix(in srgb, var(--accent-color), transparent 90%) 0%, transparent 50%);
        pointer-events: none;
    }

    .hero-content {
        padding: 20px 0;
    }

    /* Tablet */
    @media (max-width: 992px) {
        padding: 140px 0 60px 0;
        margin-top: 70px;
    }

    /* Mobile */
    @media (max-width: 768px) {
        padding: 120px 0 50px 0;
        margin-top: 60px;
    }

    /* Small Mobile */
    @media (max-width: 576px) {
        padding: 100px 0 40px 0;
        margin-top: 60px;
    }
`;

export const HeroTitle = styled.h1`
    font-size: 2.5rem; /* 56px roughly */
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 32px;
    color: var(--heading-color);

    @media (max-width: 768px) {
        font-size: 2.5rem;
        font-weight: 600;
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

export const BtnPrimary = styled.a`
    display: inline-flex;
    align-items: center;
    padding: 12px 28px;
    background-color: var(--accent-color);
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 2px solid var(--accent-color);

    &:hover {
        background-color: transparent;
        color: var(--accent-color);
        transform: translateY(-3px);
    }

    &.btn-primary {
        display: inline-flex;
    }

    @media (max-width: 768px) {
        padding: 10px 24px;
        font-size: 14px;
    }
`;

export const BtnSecondary = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 28px;
    background-color: transparent;
    color: var(--heading-color);
    text-decoration: none;
    border-radius: 5px;
    font-weight: 600;
    transition: all 0.3s ease;
    border: 2px solid var(--default-color);

    i {
        font-size: 24px;
        color: var(--accent-color);
    }

    &:hover {
        border-color: var(--accent-color);
        color: var(--accent-color);
        transform: translateY(-3px);
    }

    @media (max-width: 768px) {
        padding: 10px 24px;
        font-size: 14px;
    }
`;

export const HeroStats = styled.div`
    display: flex;
    gap: 48px;

    @media (max-width: 768px) {
        gap: 32px;
    }

    @media (max-width: 576px) {
        flex-direction: column;
        gap: 24px;
    }
`;

export const StatItem = styled.div`
    text-align: left;

    .stat-number {
        display: block;
        font-size: 2rem;
        font-weight: 300;
        color: var(--accent-color);
        margin-bottom: 4px;
    }

    .stat-label {
        font-size: 0.875rem;
        color: color-mix(in srgb, var(--default-color), transparent 40%);
        font-weight: 400;
    }
`;

export const HeroImageWrapper = styled.div`
    position: relative;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;

    .hero-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .floating-elements {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
    }

    .floating-card {
        position: absolute;
        background: var(--surface-color);
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 8px 32px color-mix(in srgb, var(--default-color), transparent 85%);
        display: flex;
        align-items: center;
        gap: 12px;
        animation: floating 3s ease-in-out infinite;
    }

    .floating-card i {
        font-size: 1.125rem;
        color: var(--accent-color);
    }

    .floating-card span {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--heading-color);
        white-space: nowrap;
    }

    @keyframes floating {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;

export const HeroImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
`;

export const ImageFallback = styled.div`
    width: 100%;
    max-width: 100%;
    height: 100%;
    min-height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border: 2px dashed #e6e6e6;
    border-radius: 8px;
    color: #9aa0a6;
    font-size: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.04);

    @media (min-width: 992px) {
        min-height: 300px;
    }

    @media (max-width: 768px) {
        min-height: 180px;
    }
`;

// ===== Featured Services Section =====
export const FeaturedServicesSection = styled.section`
    --surface-color: color-mix(in srgb, var(--default-color), transparent 96%);
    padding-top: 0;

    @media (max-width: 1199px) {
        padding: 60px 0;
    }

    @media (max-width: 768px) {
        padding: 40px 0;
    }
`;

export const ServiceItem = styled.div`
    background-color: var(--surface-color);
    padding: 50px 30px;
    transition: all ease-in-out 0.4s;
    height: 100%;

    &:hover {
        transform: translateY(-10px);
    }

    .icon {
        margin-bottom: 10px;
    }

    .icon i {
        color: var(--accent-color);
        font-size: 36px;
        transition: 0.3s;
    }

    h4 {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 600;
        color: var(--heading-color);

        a {
            color: var(--heading-color);
            text-decoration: none;
            transition: color 0.3s ease;

            &:hover {
                color: var(--accent-color);
            }
        }
    }

    p {
        font-size: 14px;
        color: var(--default-color);
        line-height: 1.6;
        margin: 0;
    }
`;

// ===== About Section =====
export const AboutSection = styled.section`
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

export const AboutContent = styled.div`
    display: flex;
    flex-direction: column;
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
                width: 24px;
                height: 24px;
                background-color: var(--accent-color);
                color: white;
                border-radius: 50%;
                margin-right: 12px;
                flex-shrink: 0;
                font-size: 12px;
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
        max-width: 100%;
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

// ===== Stats Section =====
export const StatsSection = styled.section`
    padding-bottom:100px;
    background-color: var(--background-color);

    @media (max-width: 1199px) {
        padding: 60px 0;
    }

    @media (max-width: 768px) {
        padding: 40px 0;
    }
`;

export const StatsItem = styled.div`
    padding: 30px;
    width: 100%;

    span {
        font-size: 48px;
        display: block;
        color: var(--accent-color);
        font-weight: 700;
    }

    p {
        color: color-mix(in srgb, var(--default-color), transparent 40%);
        padding: 0;
        margin: 0;
        font-family: var(--heading-font);
        font-size: 15px;
        font-weight: 600;
        }
    }
`;

// ===== Services Section =====
export const ServicesSection = styled.section`
    background-color: var(--background-color);
    padding: 60px 0;

    @media (max-width: 1199px) {
        padding: 60px 0;
    }

    @media (max-width: 768px) {
        padding: 40px 0;
    }

    .light-background {
        background: #f8f9fa;
    }
`;

export const ServiceItemGrid = styled.div`
    background-color: var(--surface-color);
    text-align: center;
    border: 1px solid color-mix(in srgb, var(--default-color), transparent 85%);
    padding: 80px 20px;
    transition: border ease-in-out 0.3s;
    height: 100%;

    &:hover {
        border-color: var(--accent-color);
    }

    &:hover h3 {
        color: var(--accent-color);
    }

    .icon {
        margin: 0 auto;
        width: 64px;
        height: 64px;
        background: var(--accent-color);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        transition: 0.3s;
    }

    .icon i {
        color: var(--contrast-color);
        font-size: 28px;
        transition: ease-in-out 0.3s;
    }

    h3 {
        font-weight: 700;
        margin: 10px 0 15px 0;
        font-size: 22px;
        transition: 0.3s;
`;

// ===== Call To Action Section =====
export const CallToActionSection = styled.section`
    padding: 80px 0;
    position: relative;
    clip-path: inset(0);
    background-color: var(--background-color);

    @media (max-width: 1199px) {
        padding: 60px 0;
    }

    @media (max-width: 768px) {
        padding: 40px 0;
    }

    h3 {
        font-size: 28px;
        font-weight: 700;
        color: var(--default-color);
        margin-bottom: 20px;
    }

    p {
        color: var(--default-color);
        font-size: 18px;
        margin-bottom: 30px;
    }

    .cta-btn {
        font-family: var(--heading-font);
        font-weight: 500;
        font-size: 16px;
        letter-spacing: 1px;
        display: inline-block;
        padding: 12px 40px;
        border-radius: 50px;
        transition: 0.5s;
        margin: 10px;
        border: 2px solid var(--contrast-color);
        color: var(--contrast-color);

        &:hover {
            background: color-mix(in srgb, var(--accent-color) 90%, white 15%);
        }
    }

    &.accent-background {
        background:  var(--accent-color);
    }
`;

// ===== Styles for Bootstrap Integration =====
export const GlobalStyles = styled.div`
    .section {
        position: relative;
        overflow: hidden;
    }

    /* Hero actions container (buttons) */
    .hero-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2.5rem;

        @media (max-width: 768px) {
            justify-content: center;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }
    }

    /* Small adjustments so Bootstrap buttons inside hero-actions align nicely */
    .hero-actions .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }


    .section-title {
        text-align: center;
        margin-bottom: 60px;
    }

    .row {
        --bs-gutter-x: 1.5rem;
        --bs-gutter-y: 0;
    }

    

    .d-flex {
        display: flex;
    }

    .flex-column {
        flex-direction: column;
    }

    .justify-content-center {
        justify-content: center;
    }

    .align-items-center {
        align-items: center;
    }

    .align-self-start {
        align-self: flex-start;
    }

    .text-center {
        text-align: center;
    }

    .gap-4 {
        gap: 1.5rem;
    }

    .position-relative {
        position: relative;
    }

    .w-100 {
        width: 100%;
    }

    .h-100 {
        height: 100%;
    }

    .stretched-link {
        position: relative;
        z-index: 1;

        &::after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            content: '';
        }
    }

    .fst-italic {
        font-style: italic;
    }

    .gy-4 {
        --bs-gutter-y: 1.5rem;
    }

    .order-1 {
        order: 1;
    }

    .order-2 {
        order: 2;
    }

    .order-lg-1 {
        @media (min-width: 992px) {
            order: 1;
        }
    }

    .order-lg-2 {
        @media (min-width: 992px) {
            order: 2;
        }
    }

    
`;
