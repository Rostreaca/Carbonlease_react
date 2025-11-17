import "./ProfileCard.css";

export default function ProfileCard({ nickname, count, carbon, grade }) {
  const gradeIcon = {
    seed: "🌱",
    leaf: "🍃",
    tree: "🌳",
    earth: "🌍"
  }[grade] ?? "🌱";

  return (
    <div className="profile-card" style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "260px", marginBottom: "20px"}}>
      <div className="grade-icon">{gradeIcon}</div>

      <div className="profile-info">
        <div><strong>아이언맨{nickname}</strong></div>
        <div>인증 횟수: 999{count}회</div>
        <div>탄소 절약: 34.2{carbon} kg CO₂</div>
      </div>
    </div>
  );
}
