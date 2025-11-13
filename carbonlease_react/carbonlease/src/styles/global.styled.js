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

    /* Container responsive adjustments */
    @media (max-width: 1199px) {
        .container,
        .container-lg,
        .container-md,
        .container-sm {
            max-width: 100% !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
        }
    }
`;
