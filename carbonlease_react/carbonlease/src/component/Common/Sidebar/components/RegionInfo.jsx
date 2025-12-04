import { RegionBox, RegionSkeletonBox, RegionNullBox } from "../Sidebar.styles";

const RegionInfo = ({ item, region }) => {

  // 1) 로딩
  if (item === undefined || item === null) {
    return (
      <RegionSkeletonBox>
        <div className="bar short"></div>
        <div className="bar medium"></div>
        <div className="bar long"></div>
        <div className="bar long"></div>
        <div className="bar medium"></div>
      </RegionSkeletonBox>
    );
  }

  // 2) 데이터가 비정상 / 값 없음
  const isEmpty =
    typeof item !== "object" ||
    item.pm25 === undefined ||
    item.pm25 === null;

  if (isEmpty) {
    return (
      <RegionBox>
        <div className="title">{region} 대기질 정보</div>
        <RegionNullBox>
          <img src="/images/no-data.png" alt="데이터 없음" />
        </RegionNullBox>
      </RegionBox>
    );
  }

  // 3) 정상 데이터
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
