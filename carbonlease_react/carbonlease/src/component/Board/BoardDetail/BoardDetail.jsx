import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';

const BoardDetail = () => {
    return(
        <>
            <PageTitle 
                title="상세보기" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '일반 게시판', path: '/boards' },
                    { label: '상세보기', current: true }
                ]} 
            />
            <PageContent>
                컨텐츠가 들어가는 영역
            </PageContent>
        </>
    )
}

export default BoardDetail;