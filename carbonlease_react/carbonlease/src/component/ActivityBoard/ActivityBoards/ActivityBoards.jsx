import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';


const ActivityBoards = () => {
    return(
        <>
            <PageTitle 
                title="인증 게시판" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '인증 게시판', current: true }
                ]} 
            />
            <PageContent>
                컨텐츠가 들어가는 영역
            </PageContent>
        </>
    )
}

export default ActivityBoards;