const NoticeDetail = () => {
    return(
        <>
            <PageTitle 
                titles={[
                    { label: '공지사항', path: '/notices' },
                    { label: '공지사항 상세', current: true }
                ]} 
            />
            <PageContent>
                컨텐츠가 들어가는 영역
            </PageContent>
        </>
    )   
}

export default NoticeDetail;