import { activityUpdateForm } from "../../../../api/activity/activityAPI";


export default function useUpdateSubmit({
    title,
    content,
    address,
    lat,
    lng,
    regionNo,
    category,
    file,
    activityNo,
    navigate,
    showToastMessage
}) {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const accessToken = localStorage.getItem("accessToken");

        if (!title) return showToastMessage("제목을 입력해주세요!", "warning");
        if (!content) return showToastMessage("내용을 입력해주세요!", "warning");
        if (!address || !lat || !lng) return showToastMessage("주소를 입력해주세요!", "warning");
        if (!regionNo || !category) return showToastMessage("지역 또는 활동은 선택해주세요!", "warning");

        const activity = {
            activityNo,
            title,
            content,
            address,
            lat,
            lng,
            certificationNo: category,
            regionNo
        };

        try {
            await activityUpdateForm(activity, file, accessToken);
            showToastMessage("수정 완료!", "success");
            navigate(`/activityBoards/${activityNo}`);
        } catch (err) {
            console.error(err);
            showToastMessage("수정 실패!", "error");
        }
    };

    return { handleSubmit };
}