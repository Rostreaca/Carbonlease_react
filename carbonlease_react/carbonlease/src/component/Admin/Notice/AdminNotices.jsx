import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateButton, PageHeader } from '../../Common/DataTable/DataTable.styled';
import NoticeCalendar from './AdminCalendar/NoticeCalendar';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AdminNoticeList from './AdminNotice/AdminNoticeList';

const AdminNotices = () => {
    const navigate = useNavigate();
    const [key, setKey] = useState('notice');
    
    return (
        <div>
            <PageHeader>
                <h1>공지사항 관리</h1>
                <CreateButton onClick={() => navigate('/admin/notices/insert')}>
                    <i className="fas fa-plus"></i>
                    등록하기
                </CreateButton>
            </PageHeader>

            <Tabs
                id="controlled-tab-notice"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            > 

                <Tab eventKey="notice" title="공지사항">
                    <AdminNoticeList />
                </Tab>

                <Tab eventKey="calendar" title="일정">
                    <NoticeCalendar key={key === "calendar" ? "calendar-active" : "calendar"} />
                </Tab>

            </Tabs>
        </div>
    );
};

export default AdminNotices;
