import { activityInsertForm } from "../../../../api/activity/activityAPI";

export default function useInsertSubmit({
    title,
    content,
    address,
    lat,
    lng,
    regionNo,
    category,
    file,
    navigate,
    showToastMessage
}) {


    const handleSubmit = async (e) => {
        e.preventDefault();

        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            showToastMessage("로그인이 필요한 서비스입니다!");
            navigate("/login");
            return;
        }

        if (!title) return showToastMessage("제목을 입력해주세요!", "warning");
        if (!content) return showToastMessage("내용을 입력해주세요!", "warning");
        if (!address || !lat || !lng) return showToastMessage("주소를 입력해주세요!", "warning");
        if (!regionNo || !category) return showToastMessage("지역 or 탄소절감 카테고리를 선택해주세요!", "warning");
        if (!file) return showToastMessage("사진을 업로드해주세요!", "warning");

        

        const activity = {
            title,
            content,
            address,
            lat,
            lng,
            certificationNo: category,
            regionNo
        };

        try {
            const res = await activityInsertForm(activity, file, accessToken);
            const activityNo = res.data.activityNo;

            showToastMessage("등록 성공!", "success");
            navigate(`/activityBoards/${activityNo}`);
        } catch (err) {
            console.error(err);
            showToastMessage("등록 실패!", "error");
        }
    };

    return { handleSubmit };
}