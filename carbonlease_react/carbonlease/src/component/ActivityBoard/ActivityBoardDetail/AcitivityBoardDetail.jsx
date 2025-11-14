const ActivityBoardDetail = () => {

    return(
        <>
            <PageTitle 
                title="인증 게시판 상세" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '인증 게시판 상세', current: true }
                ]} 
            />
            <PageContent>
                컨텐츠가 들어가는 영역
            </PageContent>
        </>
    )
}

export default ActivityBoardDetail;