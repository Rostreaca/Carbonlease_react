import ForecastSkeleton from "./ForecastSkeleton";
import GradeIcon from "./GradeIcon";
import { ForecastBox } from "../Sidebar.styles";

const ForecastInfo = ({ frc, grade }) => {
  if (!frc) return <ForecastSkeleton />;

  const date = frc.informData?._text;
  const gradeText = grade ?? null;

  if (!gradeText) {
    return (
      <ForecastBox>
        <div className="title">초미세먼지 예보</div>
        <div className="no-data">
          죄송합니다. 현재 제공되는 예보 데이터가 없습니다.
        </div>
      </ForecastBox>
    );
  }

  return (
    <ForecastBox>
      <div className="title">초미세먼지 예보</div>
      <div className="date">{date}</div>

      <div className="forecast-list">
        {["오늘","내일","모레"].map((label, idx) => (
          <div key={idx} className="item">
            <GradeIcon grade={gradeText} />
            <div className="label">{label}</div>
          </div>
        ))}
      </div>
    </ForecastBox>
  );
};

export default ForecastInfo;
