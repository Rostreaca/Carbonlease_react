import { createGlobalStyle } from 'styled-components';

export const GlobalCommonStyles = createGlobalStyle`
    /* Remove default list markers */
    ul {
        list-style: none;
        padding-left: 0;
    }

    li {
        list-style: none;
    }

    a{
        color: #333333;
    }

    /* Container responsive adjustments */
    @media (max-width: 1199px) {
        .container,
        .container-lg,
        .container-md,
        .container-sm {
            max-width: 1200px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
        }
    }
`;

export const GlobalLayoutStyles = createGlobalStyle`
    /* Main Content Layout */
    main {
        min-height: calc(100vh - 200px);
    }

    /* Section Spacing */
    section {
        padding: 60px 0;
        overflow: hidden;
    }

    @media (max-width: 768px) {
        section {
            padding: 40px 0;
        }
    }

    /* Page Layout */
    .page-content {
        padding: 40px 0;
    }

    @media (max-width: 768px) {
        .page-content {
            padding: 20px 0;
        }
    }
`;