import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';

const Campaigns = () => {
    return(
        <>
            <PageTitle 
                title="캠페인" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '캠페인', current: true }
                ]} 
            />
            <PageContent>
                컨텐츠가 들어가는 영역
            </PageContent>
        </>
    )
}

export default Campaigns;   