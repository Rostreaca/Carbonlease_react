import { RegionBox } from "../Sidebar.styles";
import SkeletonBox from "./SkeletonBox";

const RegionInfo = ({ item, region }) => {
  if (!item) return <SkeletonBox />;

  return (
    <RegionBox>
      <div className="title">{region} 대기질 정보</div>
      <div className="time">{item.dataTime} 기준</div>

      <div className="row">
        <span>초미세먼지(PM-2.5)</span>
        <span className="value">{item.pm25} ㎍/㎥</span>
      </div>

      <div className="row">
        <span>미세먼지(PM-10)</span>
        <span className="value">{item.pm10} ㎍/㎥</span>
      </div>

      <div className="row">
        <span>오존(O₃)</span>
        <span className="value">{item.o3} ppm</span>
      </div>

      <div className="row">
        <span>일산화탄소(CO)</span>
        <span className="value">{item.co} ppm</span>
      </div>

      <div className="row">
        <span>통합대기환경지수</span>
        <span className="value">{item.khaiValue} · {item.khaiGrade}</span>
      </div>
    </RegionBox>
  );
};


export default RegionInfo;
