import { PageContentWrap } from "./PageContent.styled";

const PageContent = ({ children }) => {
    return (
        <PageContentWrap>
            <div className="container">
                {children}
            </div>
        </PageContentWrap>
    );
};

export default PageContent;
