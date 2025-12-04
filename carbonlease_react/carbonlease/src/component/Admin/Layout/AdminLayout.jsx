import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import {
    Footer,
    LayoutSidenav,
    MainContent,
    Overlay,
    PageContent,
    SidenavContent,
    SidenavFooter,
    SidenavMenu,
    Topnav
} from './AdminLayout.styled';

const AdminLayout = () => {
    const [sidebarActive, setSidebarActive] = useState(false);
    const showUsersMenu = true; // 필요 시 false로 변경

    const navi = useNavigate();
    const { auth, logout } = useContext(AuthContext);

    useEffect(() => {
        if(auth.role !== '[ROLE_ADMIN]'){
          navi('/admin/login');
        }
    }, [])

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    return (
        <LayoutSidenav>
            {/* 모바일 오버레이 */}
            {sidebarActive && (
                <Overlay onClick={toggleSidebar} />
            )}
            {/* Sidebar */}
            <SidenavContent className={sidebarActive ? 'active' : ''}>
                {/* 모바일 닫기(X) 버튼 */}
                <button
                    className="sidebar-close"
                    onClick={toggleSidebar}
                    aria-label="사이드바 닫기"
                >
                    <span className="sidebar-close-icon">×</span>
                </button>
                <SidenavMenu>
                    <div className="sb-sidenav-menu-heading">Core</div>
                    <NavLink className="nav-link" to="/admin/home">
                        <div className="sb-nav-link-icon">
                            <i className="fas fa-tachometer-alt"></i>
                        </div>
                        Dashboard
                    </NavLink>

                    <div className="sb-sidenav-menu-heading">Interface</div>

                    {showUsersMenu && (
                        <NavLink className="nav-link" to="/admin/users">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            Users
                        </NavLink>
                    )}

                    <NavLink className="nav-link" to="/admin/notices">
                        <div className="sb-nav-link-icon">
                            <i className="fas fa-bullhorn"></i>
                        </div>
                        Notices
                    </NavLink>
                    <NavLink className="nav-link" to="/admin/campaigns">
                        <div className="sb-nav-link-icon">
                            <i className="fas fa-bullhorn"></i>
                        </div>
                        Campaigns
                    </NavLink>
                    <NavLink className="nav-link" to="/admin/boards">
                        <div className="sb-nav-link-icon">
                            <i className="fas fa-list"></i>
                        </div>
                        Boards
                    </NavLink>
                    <NavLink className="nav-link" to="/admin/activityBoards">
                        <div className="sb-nav-link-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        Activity Boards
                    </NavLink>
                </SidenavMenu>
                <SidenavFooter>
                    Logged in as: Admin
                </SidenavFooter>

            </SidenavContent>


            {/* Main Content */}
            <MainContent>
                {/* Top Navigation */}
                <Topnav>
                    {/* 햄버거 버튼: 모바일에서만 보임 */}
                    <button
                        className="sidebar-toggle"
                        onClick={toggleSidebar}
                        aria-label="사이드바 열기"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <NavLink className="navbar-brand" to="/admin/home">Carbonlease Admin</NavLink>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/admin/profile">
                                <i className="fas fa-user"></i>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink onClick={logout} to="/admin/login">
                                <i className="fas fa-sign-out-alt"></i>
                            </NavLink>
                        </li>
                    </ul>
                </Topnav>

                {/* Page Content */}
                <PageContent>
                    <Outlet />
                </PageContent>

                {/* Footer */}
                <Footer>
                    <div className="footer-content">
                        <div className="text-muted">Copyright &copy; Carbonlease 2025</div>
                    </div>
                </Footer>
            </MainContent>
        </LayoutSidenav>
    );
};

export default AdminLayout;
