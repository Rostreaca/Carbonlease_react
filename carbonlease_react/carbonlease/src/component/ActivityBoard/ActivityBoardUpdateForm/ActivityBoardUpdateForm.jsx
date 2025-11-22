
import PageTitle from "../../Common/Layout/PageTitle/PageTitle";
import PageContent from "../../Common/PageContent/PageContent";


const ActivityBoardUpdateForm = () => {
 
  return (
    <>
      <PageTitle
        title="인증 게시글 수정"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "인증 게시판", path: "/activityBoards" },
          { label: "상세보기", path: `/activityBoards/${id}` },
          { label: "인증 게시글 수정", current: true }
        ]}
      />

      <PageContent>
        
      </PageContent>
    </>
  );
};

export default ActivityBoardUpdateForm;
