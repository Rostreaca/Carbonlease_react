import { useState, useCallback } from "react";
import { SidebarWrapper } from "./Sidebar.styles";
import RegionInfo from "./components/RegionInfo";
import SidoAverage from "./components/SidoAverage";

import { useAir } from "./hooks/useAir";
import regionStationMap from "./components/regionStationMap";
import { useSidoAverage } from "./hooks/useSidoAverage";

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

  const item = air;

  const nextSido = useCallback(() => {
    setSidoIndex((prev) => (prev + 1) % sidoList.length);
  }, []);

  const prevSido = useCallback(() => {
    setSidoIndex((prev) => (prev - 1 + sidoList.length) % sidoList.length);
  }, []);

  return (
    <SidebarWrapper>
      <div className="region-select-box">
        <select
          className="region-select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          {Object.keys(regionStationMap).map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <RegionInfo item={item} region={region} />

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
