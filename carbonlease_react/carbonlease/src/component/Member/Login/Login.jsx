import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';

const Login = () => {
    return(
        <>
            <PageTitle 
                title="로그인" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '로그인', current: true }
                ]} 
            />
            <PageContent>
                컨텐츠가 들어가는 영역
            </PageContent>
        </>
    )
}

export default Login;