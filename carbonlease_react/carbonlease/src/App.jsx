import { Route, Routes } from 'react-router-dom';
import './App.css';
import ActivityBoardDetail from "./component/ActivityBoard/ActivityBoardDetail/ActivityBoardDetail";
import ActivityBoards from "./component/ActivityBoard/ActivityBoards/ActivityBoards";
import ActivityInsertForm from './component/ActivityBoard/ActivityInsertForm/ActivityInsertForm';
import ActivityUpdateForm from "./component/ActivityBoard/ActivityBoardUpdateForm/ActivityUpdateForm";
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
import { GlobalCommonStyles, GlobalLayoutStyles } from './styles/global.styled';
import NotFound from './component/Common/NotFound/NotFound';
import BoardInsertForm from './component/Board/BoardInsert/BoardInsertForm';
import BoardUpdateForm from './component/Board/BoardUpdate/BoardUpdateForm';

// Admin Components
import AdminActivityBoards from './component/Admin/ActivityBoard/boards/AdminActivityBoards';
import AdminActivityBoardUpdate from './component/Admin/ActivityBoard/update/AdminActivityBoardsUpdate';
import AdminHome from './component/Admin/AdminHome';
import AdminBoards from './component/Admin/Board/AdminBoards';
import AdminCampaigns from './component/Admin/Campaign/AdminCampaigns/AdminCampaigns';
import InsertForm from './component/Admin/Campaign/InsertForm/InsertForm';
import UpdateForm from './component/Admin/Campaign/updateForm/UpdateForm';
import AdminLayout from './component/Admin/Layout/AdminLayout';
import AdminLogin from './component/Admin/Login/AdminLogin';
import AdminNotices from './component/Admin/Notice/AdminNotices';
import NoticeInsertForm from './component/Admin/Notice/AdminNotice/NoticeInsertForm';
import NoticeUpdateForm from './component/Admin/Notice/AdminNotice/NoticeUpdateForm';
import AdminUsers from './component/Admin/User/AdminUsers';
import MyPage from './component/Member/MyPage/MyPage';
import MemberUpdateForm from './component/Member/UpdateForm/MemberUpdateForm';
import { AuthProvider } from './component/Context/AuthContext';
import KakaoCallback from './component/Member/Login/KakaoCallback';
import KakaoEnrollForm from './component/Member/EnrollForm/KaKaoEnrollForm';


function App() {

	
	return (
		<>
		   <AuthProvider>
			   <GlobalCommonStyles />
			   <GlobalLayoutStyles />
		<Routes>
			{/* User Routes - with Layout */}
			<Route element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path='/kakao/signUp' element={<KakaoEnrollForm />} />
				<Route path="/kakao/callback" element={<KakaoCallback />} />
				<Route path="/boards" element={<Boards />} />
				<Route path="/boards/:id" element={<BoardDetail />} />
				<Route path="/boards/InsertForm" element={<BoardInsertForm />} />
				<Route path="/boards/UpdateForm/:id" element={<BoardUpdateForm />} />


				<Route path="/activityBoards" element={<ActivityBoards />} />
				<Route path="/activityBoards/insert" element={<ActivityInsertForm />} />
				<Route path="/activityBoards/update/:id" element={<ActivityUpdateForm />} />	
				<Route path="/activityBoards/:id" element={<ActivityBoardDetail />} />

				<Route path="/notices" element={<Notices />} />
				<Route path="/notices/:id" element={<NoticeDetail />} />
				<Route path="/campaigns" element={<Campaigns />} />
				<Route path="/campaigns/detail/:id" element={<CampaignDetail />} />
				<Route path="/login" element={<Login/>} />
				<Route path="/signUp" element={<EnrollForm/>} />
				<Route path="/myPage" element = {<MyPage/>} />
				<Route path="/myPage/update" element={<MemberUpdateForm />} />
				<Route path="/guide" element={<ComponentGuide />} />
			</Route>
			
			<Route path="/admin/login" element={<AdminLogin />} />
			
			{/* Admin Routes - without user Layout */}
			<Route path="admin/*" element={<AdminLayout />}>
				<Route path="home" element={<AdminHome />} />
				<Route path="users" element={<AdminUsers />} />
				<Route path="notices" element={<AdminNotices />} />
				<Route path="notices/:id" element={<NoticeDetail />} />
				<Route path="notices/insert" element={<NoticeInsertForm />} />
				<Route path="notices/update/:id" element={<NoticeUpdateForm />} />
				<Route path="campaigns" element={<AdminCampaigns />} />
				<Route path="campaigns/insert" element={<InsertForm />} />
				<Route path="campaigns/update/:id" element={<UpdateForm />} />
				<Route path="boards" element={<AdminBoards />} />
				<Route path="activityBoards" element={<AdminActivityBoards />} />
				<Route path="activityBoards/update/:id" element={<AdminActivityBoardUpdate />} />
			</Route>
			{/* 전역 404 */}
			<Route path="*" element={<NotFound />} />

				</Routes>
			</AuthProvider>
		</>
	)
}

export default App
