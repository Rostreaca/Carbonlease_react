import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';

const Notices = () => {
    return(
        <>
            <PageTitle 
                title="공지사항" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '공지사항', current: true }
                ]} 
            />
            <PageContent>
                컨텐츠가 들어가는 영역
            </PageContent>
        </>
    )
}

export default Notices;