import styled from "styled-components";

export const PageContentWrap = styled.section`
    padding: 60px 0;
    background-color: #ffffff;
    min-height: 400px;

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 15px;
    }

    @media (max-width: 1199px) {
        padding: 50px 0;
    }

    @media (max-width: 768px) {
        padding: 40px 0;
        min-height: 300px;
    }

    @media (max-width: 576px) {
        padding: 30px 0;
    }
`;

export default PageContentWrap;
