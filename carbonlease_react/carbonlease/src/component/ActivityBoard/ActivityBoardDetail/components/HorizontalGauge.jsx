import { GaugeBox, GaugeTrack, GaugeBar, GaugeText } from "../ActivityBoardDetail.styles";

const HorizontalGauge = ({ value }) => {
  const percent = Math.min(value, 100);

  return (
    <GaugeBox>
      <GaugeTrack>
        <GaugeBar style={{ width: `${percent}%` }} />
      </GaugeTrack>
      <GaugeText>{percent}%</GaugeText>
    </GaugeBox>
  );
};

export default HorizontalGauge;
