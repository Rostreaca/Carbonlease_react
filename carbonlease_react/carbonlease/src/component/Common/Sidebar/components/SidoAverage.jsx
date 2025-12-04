import { SidoInfoBox, SidoNullBox } from "../Sidebar.styles";
import SkeletonBox from "./SkeletonBox";

const SidoAverage = ({ sido, sidoAvg, isLoading, onPrev, onNext }) => {
  const getGrade = (value) => {
    if (value <= 15) return "좋음";
    if (value <= 35) return "보통";
    if (value <= 75) return "나쁨";
    return "매우나쁨";
  };

  if (isLoading) {
    return <SkeletonBox />;
  }

  const isEmpty =
    !sidoAvg ||
    typeof sidoAvg !== "object" ||
    !("value" in sidoAvg) ||
    sidoAvg.value === undefined ||
    sidoAvg.value === null;

  if (isEmpty) {
    return (
      <SidoInfoBox>
        <div className="nav">
          <button className="arrow" onClick={onPrev}>
            &lt;
          </button>
          <div className="title">{sido} 평균</div>
          <button className="arrow" onClick={onNext}>
            &gt;
          </button>
        </div>
        <SidoNullBox>현재 제공되는 대기 정보가 없습니다.</SidoNullBox>
      </SidoInfoBox>
    );
  }

  return (
    <SidoInfoBox>
      <div className="nav">
        <button className="arrow" onClick={onPrev}>
          &lt;
        </button>
        <div className="title">{sido} 평균</div>
        <button className="arrow" onClick={onNext}>
          &gt;
        </button>
      </div>

      <div className="date">{sidoAvg.time} 기준</div>
      <div className="value">
        {sidoAvg.value}㎍/㎥ {getGrade(sidoAvg.value)}
      </div>
    </SidoInfoBox>
  );
};

export default SidoAverage;
