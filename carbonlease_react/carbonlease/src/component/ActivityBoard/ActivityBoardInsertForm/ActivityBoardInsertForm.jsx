import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';

const ActivityBoardInsertForm = () => {
  return (
        <>
            <PageTitle 
                title="인증 게시글 작성" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '인증 게시판', current: true }
                ]} 
            />
            <PageContent>
                
                

            </PageContent>
        </>
    );
}

export default ActivityBoardInsertForm;