import { GaugeWrapper, GaugeFill, GaugeLines, GaugePercentText } from "../ActivityBoardDetail.styles";

const ThermometerGauge = ({ value }) => {
  const percent = Math.min(value, 100);

  return (
    <GaugeWrapper>
      <GaugeFill style={{ height: `${percent}%` }} />

      <GaugePercentText>{percent}%</GaugePercentText>

      <GaugeLines>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </GaugeLines>
    </GaugeWrapper>
  );
};

export default ThermometerGauge;
