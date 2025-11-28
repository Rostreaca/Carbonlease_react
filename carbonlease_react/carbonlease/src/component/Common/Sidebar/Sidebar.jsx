import { useState } from "react";
import { SidebarWrapper, BottomArea } from "./Sidebar.styles";
import RegionInfo from "./components/RegionInfo";
import ForecastInfo from "./components/ForecastInfo";
import SidoAverage from "./components/SidoAverage";

import { useAir } from "./hooks/useAir";
import { useForecast } from "./hooks/useForecast";
import { useSidoAverage } from "./hooks/useSidoAverage";
import regionStationMap from "./components/regionStationMap";

const sidoList = [
  "서울", "경기", "강원", "충북", "충남",
  "전북", "전남", "경북", "경남", "부산",
  "대구", "광주", "대전", "울산", "인천", "제주"
];

const Sidebar = () => {
  const [region, setRegion] = useState("중구");

  const [sidoIndex, setSidoIndex] = useState(0);
  const sido = sidoList[sidoIndex];
  const sidoAvg = useSidoAverage(sido);

  const air = useAir(regionStationMap[region]);
  const forecast = useForecast();

  const itemList = air?.response?.body?.items?.item;
  const item = Array.isArray(itemList)
    ? itemList.find(i => i.stationName._text === regionStationMap[region])
    : itemList;
  const frc = forecast?.response?.body?.items?.item;

  const getSeoulForecastGrade = (text) =>
    text?.match(/서울\s*:\s*(좋음|보통|나쁨|매우나쁨)/)?.[1] ?? null;

  const grade = frc?.informGrade?._text
    ? getSeoulForecastGrade(frc.informGrade._text)
    : null;

  const nextSido = () => setSidoIndex((prev) => (prev + 1) % sidoList.length);
  const prevSido = () =>
    setSidoIndex((prev) => (prev - 1 + sidoList.length) % sidoList.length);

  return (
    <SidebarWrapper>

      <div className="region-select-box">
        <select
          className="region-select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          {Object.keys(regionStationMap).map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <RegionInfo item={item} region={region} />

      <BottomArea>
        <ForecastInfo frc={frc} grade={grade} />
      </BottomArea>

      <SidoAverage
        sido={sido}
        sidoAvg={sidoAvg}
        onPrev={prevSido}
        onNext={nextSido}
      />

    </SidebarWrapper>
  );
};

export default Sidebar;
