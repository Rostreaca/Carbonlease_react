const CampaignDetail = () => {
    return(
        <>
            <PageTitle 
                title="캠페인 상세" 
                breadcrumbs={[  
                    { label: 'Home', path: '/' },
                    { label: '캠페인 상세', current: true }
                ]} 
            />
            <PageContent>
                컨텐츠가 들어가는 영역
            </PageContent>
        </>
    )
}

export default CampaignDetail;