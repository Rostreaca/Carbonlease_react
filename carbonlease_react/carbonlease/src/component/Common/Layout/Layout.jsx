import { Outlet } from "react-router-dom";
import LayoutWrap from "./Layout.styled";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
    return (
        <LayoutWrap>
            <Header />
                <main>
                    <Outlet />
                </main>
            <Footer />
        </LayoutWrap>
    );
};

export default Layout;
