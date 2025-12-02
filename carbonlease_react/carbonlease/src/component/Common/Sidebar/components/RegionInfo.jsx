import { RegionBox } from "../Sidebar.styles";
import SkeletonBox from "./SkeletonBox";

const RegionInfo = ({ item, region }) => {
  if (!item) return <SkeletonBox />;

  const dataTime = item.dataTime?._text;
  const station  = item.stationName?._text;

  return (
    <RegionBox>
      <div className="title">{region} 대기질 정보</div>
      <div className="time">{dataTime} 기준</div>

      <div className="row">
        <span>초미세먼지(PM-2.5)</span>
        <span className="value">{item.pm25Value?._text} ㎍/㎥ · {item.pm25Grade?._text}</span>
      </div>

      <div className="row">
        <span>미세먼지(PM-10)</span>
        <span className="value">{item.pm10Value?._text} ㎍/㎥ · {item.pm10Grade?._text}</span>
      </div>

      <div className="row">
        <span>오존(O₃)</span><span className="value">{item.o3Value?._text} ppm</span>
      </div>

      <div className="row">
        <span>이산화질소(NO₂)</span><span className="value">{item.no2Value?._text} ppm</span>
      </div>

      <div className="row">
        <span>일산화탄소(CO)</span><span className="value">{item.coValue?._text} ppm</span>
      </div>

      <div className="row">
        <span>아황산가스(SO₂)</span><span className="value">{item.so2Value?._text} ppm</span>
      </div>

      <div className="row">
        <span>통합대기환경지수</span>
        <span className="value">{item.khaiValue?._text} · {item.khaiGrade?._text}</span>
      </div>
    </RegionBox>
  );
};

export default RegionInfo;
