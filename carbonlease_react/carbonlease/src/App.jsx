import { Route, Routes } from 'react-router-dom';
import { GlobalCommonStyles } from './styles/global.styled';
import './App.css';
import Layout from "./component/Common/Layout/Layout";
import Home from "./component/Common/Home/Home";
import Boards from "./component/Board/Boards/Boards";
import BoardDetail from "./component/Board/BoardDetail/BoardDetail";
import ActivityBoards from "./component/ActivityBoard/ActivityBoards/ActivityBoards";
import ActivityBoardDetail from "./component/ActivityBoard/ActivityBoardDetail/AcitivityBoardDetail";
import ActivityBoardInsertForm from "./component/ActivityBoard/ActivityBoardInsertForm/ActivityBoardInsertForm";
import ActivityBoardUpdateForm from "./component/ActivityBoard/ActivityBoardUpdateForm/ActivityBoardUpdateForm";
import Notices from './component/Notice/Notices/Notices';
import NoticeDetail from './component/Notice/NoticeDetail/NoticeDetail';
import Campaigns from './component/Campaign/Campaigns/Campaigns';
import CampaignDetail from './component/Campaign/CampaignDetail/CampaignDetail';
import Login from './component/Member/Login/Login';
import EnrollForm from './component/Member/EnrollForm/EnrollForm';

// Admin Components
import AdminLogin from './component/Admin/Login/AdminLogin';
import AdminLayout from './component/Admin/Layout/AdminLayout';
import AdminHome from './component/Admin/AdminHome';
import AdminNotices from './component/Admin/Notice/AdminNotices';
import AdminCampaigns from './component/Admin/Campaign/AdminCampaigns';
import AdminActivityBoards from './component/Admin/ActivityBoard/AdminActivityBoards';
import AdminBoards from './component/Admin/Board/AdminBoards';
import AdminUsers from './component/Admin/User/AdminUsers';
import SamplePage from "./component/Sample/SamplePage";



function App() {
	return (
		<>
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
				<Route path="/campaigns/:id" element={<CampaignDetail />} />
				<Route path="/login" element={<Login/>} />
				<Route path="/member/enrollForm" element={<EnrollForm/>} />
				
				{/* Sample Page Route */}
				<Route path="/sample" element={<SamplePage />} />
			</Route>

			{/* Admin Routes - without user Layout */}
			<Route path="/admin/login" element={<AdminLogin />} />
			<Route path="/admin/*" element={<AdminLayout />}>
				<Route path="home" element={<AdminHome />} />
				<Route path="users" element={<AdminUsers />} />
				<Route path="notices" element={<AdminNotices />} />
				<Route path="campaigns" element={<AdminCampaigns />} />
				<Route path="boards" element={<AdminBoards />} />
				<Route path="activityBoards" element={<AdminActivityBoards />} />
			</Route>
		</Routes>
		</>
	)
}

export default App
