import { useState } from "react";
import { SidoInfoBox } from "../Sidebar.styles";
import SkeletonBox from "./SkeletonBox";

const SidoAverage = ({ sido, sidoAvg, onPrev, onNext }) => {
  const [slide, setSlide] = useState("");

  const handlePrev = () => {
    setSlide("slide-right");
    setTimeout(() => {
      onPrev();
      setSlide("slide-reset");
    }, 200);
  };

  const handleNext = () => {
    setSlide("slide-left");
    setTimeout(() => {
      onNext();
      setSlide("slide-reset");
    }, 200);
  };

  if (!sidoAvg) return <SkeletonBox />;

  return (
    <SidoInfoBox className={slide}>
      <div className="nav">
        <button className="arrow" onClick={handlePrev}>&lt;</button>
        <div className="title">{sido} 평균</div>
        <button className="arrow" onClick={handleNext}>&gt;</button>
      </div>

      <div className="date">{sidoAvg.time} 기준</div>
      <div className="value">{sidoAvg.value}㎍/㎥ 보통</div>
    </SidoInfoBox>
  );
};

export default SidoAverage;
