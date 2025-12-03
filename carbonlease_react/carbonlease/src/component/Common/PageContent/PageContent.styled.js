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

    .signUpContainer {
        margin : auto;
        max-width : 600px;
    }

    .myPageContainer {
        display: flex;
        justify-content : center;
    }
    .regInValidMsg {
        font-size: 14px;
        color: red;
    }

    .regValidMsg {
        font-size: 14px;
        color: rgb(7, 165, 7);
    }

    .myPageChildernContainer {
        margin-left : 50px;
        min-width : 360px;
        max-width : 700px;
    }

    .userFormInput {
        width : 80%;
        margin-right : 10px;
    }

    .userFormButtonGroup {
        display : flex;
        justify-content : center;

    }

    .userFormButton {
        margin-right : 20px;
    }

    .loginContainer {
        margin : auto;
        width : 360px;
    }

    #kakaoLoginBtn:hover {
        cursor : pointer;
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
