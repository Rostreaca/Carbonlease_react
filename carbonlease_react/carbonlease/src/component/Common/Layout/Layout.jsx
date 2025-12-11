import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { LayoutWrap, MainContent, PageWrapper } from "./Layout.styled";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Layout = () => {

  const { auth } = useContext(AuthContext);
  const navi = useNavigate();

    useEffect(() => {

      {
        auth.role === null ? <></> : auth.role === '[ROLE_ADMIN]' ? navi('/admin/home') : <></> 
      }

    }, [auth.role])

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
