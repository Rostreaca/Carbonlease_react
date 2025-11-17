import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import BoardContent from './components/BoardContent';
import ImageSection from './components/ImageSection';
import PostHeader from './components/PostHeader';
import Title from './components/Title';
import ReplyPagination from '../../Common/UI/ReplyPagination';
import ProfileCard from './components/ProfileCard';
import MapSection from './components/MapSection';
import ReplyEditForm from './components/ReplyEditForm';
import InputButton from './components/InputButton';
import OutlineSuccessButton from '../../Common/UI/Button/OutlineWriterButton';
import OutlineDangerButton from '../../Common/UI/Button/OutlineDangerButton';



const ActivityBoardDetail = () => {


    ;
    return(
        <>
             <PageTitle 
                title="인증 상세보기" 
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '인증게시판', path: '/AcitivityBoards' },
                    { label: '상세보기', current: true }
                ]} 
            />
            <PageContent>
                
                    <div style={{display: "flex", justifyContent: 'left'}}>
                        <Title />
                    </div>

                    <div style={{ display: "flex", justifyContent: "right", marginTop: "10px" }}>
                        <PostHeader />
                    </div>
                    <div style={{}}>
                        {/* 이미지 섹션 */}
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px"}}>
                            <div id="image" style={{width: "500px", height: "400px"}}>
                                <ImageSection />
                            </div>
                        </div>
                        {/* 컨텐트 영역 */}
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px"}}>
                            <div id='content' style={{width: "600px", minHeight: "300px"}}>
                                <BoardContent />
                            </div>
                        </div>

                        {/* 지도 영역 */}
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                            <div id="map" style={{ width: "400px", height:"300px"}}>
                                <MapSection />
                            </div>
                        </div>
                    </div>
                    {/* 프로필 카드 */}
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <ProfileCard />
                    </div>

                    {/* 버튼 영역 */}
                    <div style={{ display: "flex", justifyContent: "space-between", margin: "20px"}}>
                       <OutlineSuccessButton>목록으로</OutlineSuccessButton> 
                       <div>
                       <OutlineSuccessButton>수정</OutlineSuccessButton>
                       <OutlineDangerButton>삭제</OutlineDangerButton>
                       </div>
                    </div>

                    {/* 댓글 영역
                    <div>
                        <ReplyList>
                            <ReplyItem />
                        </ReplyList>
                    </div>
                    */}
                    {/* 댓글 등록 영역 */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <ReplyEditForm />
                        <InputButton />
                    </div>

                    

                    {/* 댓글 페이징 */}
                    <ReplyPagination
                        currentPage={1}
                        totalPages={5}
                        onPageChange={(page) => console.log(`Go to page ${page}`)}
                    />
            </PageContent>

        </>
    )
}

export default ActivityBoardDetail;