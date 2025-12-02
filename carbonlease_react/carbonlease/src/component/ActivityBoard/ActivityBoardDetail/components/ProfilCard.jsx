import { ProfilCardWrapper, ProfilText, SeparatorLine } from "../ActivityBoardDetail.styles";
import HorizontalGauge from "./HorizontalGauge";

const ProfilCard = ({ nickName, count, carbon }) => {
  return (
    <ProfilCardWrapper>

      {/* 게이지 */}
      <HorizontalGauge value={carbon} />

      {/* 세로 라인 */}
      <SeparatorLine />

      {/* 닉네임 */}
      <ProfilText>
        <div><strong>{nickName}</strong></div>
      </ProfilText>

      {/* 세로 라인 */}
      <SeparatorLine />

      {/* 인증/탄소절약 */}
      <ProfilText>
        <div>인증 횟수: <strong>{count}</strong>회</div>
        <div>탄소 절약: <strong>{carbon}</strong>g CO₂</div>
      </ProfilText>

    </ProfilCardWrapper>
  );
};


export default ProfilCard;
