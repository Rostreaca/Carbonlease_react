import { ProfileCardBox, ProfileGradeIcon, ProfileNickname } from "../ActivityBoardDetail.styles.js";

export default function ProfileCard({ nickname, count, carbon, grade }) {
  const gradeIcon = {
    seed: "🌱",
    leaf: "🍃",
    tree: "🌳",
    earth: "🌍"
  }[grade] ?? "🌱";

  return (
    <ProfileCardBox>
      <ProfileGradeIcon>{gradeIcon}</ProfileGradeIcon>

      <div>
        <ProfileNickname>{nickname}</ProfileNickname>
        <div>인증 횟수: {count}회</div>
        <div>탄소 절약: {carbon} kg CO₂</div>
      </div>
    </ProfileCardBox>
  );
}
