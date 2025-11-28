import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { LayoutWrap, MainContent, PageWrapper } from "./Layout.styled";

const Layout = () => {
    const location = useLocation();

    const showSidebar =
        location.pathname.startsWith("/boards") ||
        location.pathname.startsWith("/activityBoards");

    return (
        <LayoutWrap>
            <Header />

            <PageWrapper $showSidebar={showSidebar}>
              <MainContent $showSidebar={showSidebar}>
                <Outlet />
              </MainContent>

              {showSidebar && <Sidebar />}
            </PageWrapper>

            <Footer />
        </LayoutWrap>
    );
};

export default Layout;
