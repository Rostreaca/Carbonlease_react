import { useEffect, useState } from "react";
import { SidoInfoBox } from "../Sidebar.styles";
import SkeletonBox from "./SkeletonBox";

const SidoAverage = ({ sido, sidoAvg, onPrev, onNext }) => {
  const [anim, setAnim] = useState("");

  const getGrade = (value) => {
    if (value <= 15) return "좋음";
    if (value <= 35) return "보통";
    if (value <= 75) return "나쁨";
    return "매우나쁨";
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setAnim("fade-slide-out");
      setTimeout(() => {
        onNext();
        setAnim("fade-slide-in");
      }, 300);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!sidoAvg) return <SkeletonBox />;

  return (
    <SidoInfoBox className={anim}>
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
