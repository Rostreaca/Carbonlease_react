import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { LayoutWrap, MainContent, PageWrapper } from "./Layout.styled";

const Layout = () => {
    const { pathname } = useLocation();

    const showSidebar =
        pathname === "/boards" ||
        /^\/boards\/\d+$/.test(pathname) ||

        pathname === "/activityBoards" ||
        /^\/activityBoards\/\d+$/.test(pathname);

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
