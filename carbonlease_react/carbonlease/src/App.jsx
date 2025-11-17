import { Route, Routes } from 'react-router-dom';
import './App.css';
import ActivityBoardDetail from "./component/ActivityBoard/ActivityBoardDetail/AcitivityBoardDetail";
import ActivityBoardInsertForm from "./component/ActivityBoard/ActivityBoardInsertForm/ActivityBoardInsertForm";
import ActivityBoards from "./component/ActivityBoard/ActivityBoards/ActivityBoards";
import ActivityBoardUpdateForm from "./component/ActivityBoard/ActivityBoardUpdateForm/ActivityBoardUpdateForm";
import BoardDetail from "./component/Board/BoardDetail/BoardDetail";
import Boards from "./component/Board/Boards/Boards";
import CampaignDetail from './component/Campaign/CampaignDetail/CampaignDetail';
import Campaigns from './component/Campaign/Campaigns/Campaigns';
import ComponentGuide from './component/Common/ComponentGuide/ComponentGuide';
import Home from "./component/Common/Home/Home";
import Layout from "./component/Common/Layout/Layout";
import EnrollForm from './component/Member/EnrollForm/EnrollForm';
import Login from './component/Member/Login/Login';
import NoticeDetail from './component/Notice/NoticeDetail/NoticeDetail';
import Notices from './component/Notice/Notices/Notices';
import { GlobalCommonStyles } from './styles/global.styled';

// Admin Components
import AdminActivityBoards from './component/Admin/ActivityBoard/AdminActivityBoards';
import AdminHome from './component/Admin/AdminHome';
import AdminBoards from './component/Admin/Board/AdminBoards';
import AdminCampaigns from './component/Admin/Campaign/AdminCampaigns';
import InsertForm from './component/Admin/Campaign/InsertForm';
import UpdateForm from './component/Admin/Campaign/UpdateForm';
import AdminLayout from './component/Admin/Layout/AdminLayout';
import AdminLogin from './component/Admin/Login/AdminLogin';
import AdminNotices from './component/Admin/Notice/AdminNotices';
import AdminUsers from './component/Admin/User/AdminUsers';
import SamplePage from "./component/Sample/SamplePage";
import { AuthProvider } from './component/Context/AuthContext';



function App() {
	return (
		<>
		<AuthProvider>
		<GlobalCommonStyles />
		<Routes>
			{/* User Routes - with Layout */}
			<Route element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path="/boards" element={<Boards />} />
				<Route path="/boards/:id" element={<BoardDetail />} />
				<Route path="/activityBoards" element={<ActivityBoards />} />
				<Route path="/activityBoards/:id" element={<ActivityBoardDetail />} />
				<Route path="/activityBoard/insertForm" element={<ActivityBoardInsertForm />} />
				<Route path="/activityBoard/updateForm/:id" element={<ActivityBoardUpdateForm />} />
				<Route path="/notices" element={<Notices />} />
				<Route path="/notices/:id" element={<NoticeDetail />} />
				<Route path="/campaigns" element={<Campaigns />} />
				<Route path="/campaigns/detail/:id" element={<CampaignDetail />} />
				<Route path="/login" element={<Login/>} />
				<Route path="/member/enrollForm" element={<EnrollForm/>} />
				<Route path="/guide" element={<ComponentGuide />} />
				
				{/* Sample Page Route */}
				<Route path="/sample" element={<SamplePage />} />
			</Route>

			{/* Admin Routes - without user Layout */}
			<Route path="/admin/login" element={<AdminLogin />} />
			<Route path="admin/*" element={<AdminLayout />}>
				<Route path="home" element={<AdminHome />} />
				<Route path="users" element={<AdminUsers />} />
				<Route path="notices" element={<AdminNotices />} />
				<Route path="campaigns" element={<AdminCampaigns />} />
				<Route path="campaigns/insert" element={<InsertForm />} />
				<Route path="campaigns/update/:id" element={<UpdateForm />} />
				<Route path="boards" element={<AdminBoards />} />
				<Route path="activityBoards" element={<AdminActivityBoards />} />
			</Route>
		</Routes>
		</AuthProvider>
		</>
	)
}

export default App
