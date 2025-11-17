export default function PostHeader({ data }) {
    return (
        <div className="post-header" style={{display: "flex", justifyContent: "right", alignItems: "center", width: "500px", marginBottom: "20px"}}>
            <div className="profile">
                <div className="avatar" />
                <div className="user-info">
                    <span className="nickname">아이언맨 ·{/*data.nickname*/}</span>

                    <span className="date"> 작성일 2025.01.11 ·{/*data.date*/}</span>
                </div>
            </div>

            <div className="status">
                <span> 조회수 123 ·{/*data.views*/}</span>
                <span>좋아요 123{/*data.likes*/}회</span>
            </div>
        </div>
    );
};