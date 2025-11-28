import { ProfilCardWrapper, ProfilText } from "../ActivityBoardDetail.styles";
import ThermometerGauge from "./ThermometerGauge";

const ProfilCard = ({nickName, count, carbon}) => {
  return (
    <ProfilCardWrapper>
      <ThermometerGauge value={carbon} />

      <ProfilText>
        <div><strong>{nickName}</strong></div>
        <div>인증 횟수: {count}회</div>
        <div>탄소 절약: {carbon}g CO₂</div>
      </ProfilText>
    </ProfilCardWrapper>
  )
}

export default ProfilCard;