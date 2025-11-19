import { Wrap, Title, ThermoBox, Tube, Fill, Bulb } from "../ActivityBoardDetail.styles";

const ThermometerGauge = ({ value = 0, max = 30 }) => {
  const percent = Math.min((value / max) * 100, 100);

  const getColor = (p) => {
    if (p < 25) return "#4da3ff";
    if (p < 60) return "#00c851";
    if (p < 85) return "#ffbb33";
    return "#ff4444";
  };

  return (
    <Wrap>
      <ThermoBox>
        <Tube>
          <Fill style={{ height: `${percent}%`, background: getColor(percent) }} />
        </Tube>
        <Bulb style={{ background: getColor(percent) }} />
      </ThermoBox>

      <Title>탄소 절약 게이지</Title>
    </Wrap>
  );
};

export default ThermometerGauge;
