import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import NoticesList from './NoticesList';
import NoticeCalendar from './NoticeCalendar';

const Notices = () => {
    return(
        <>
            <PageTitle 
                title="공지사항" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '공지사항', current: true}
                ]} 
            />
            <PageContent>
                <NoticeCalendar />
               <NoticesList />
            </PageContent>
        </>
    )
}

export default Notices;