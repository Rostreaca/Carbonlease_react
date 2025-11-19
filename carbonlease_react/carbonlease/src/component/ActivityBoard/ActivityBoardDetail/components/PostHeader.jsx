const PostHeader = ({ data }) => {
  if (!data) return null;

  return (
    <div style={{
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
      color: "#666",
      padding: "8px 0",
      borderBottom: "1px solid #e5e5e5",
      marginBottom: "16px"
    }}>
      <div>✍ {data.nickname} · 작성일 {data.date}</div>
      <div>조회 {data.views} · 좋아요 {data.likes}</div>
    </div>
  );
};
export default PostHeader;
