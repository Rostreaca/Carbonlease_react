import { useState } from "react";
import { useAir } from "./hooks/useAir";
import { useSidoAverage } from "./hooks/useSidoAverage";
import regionStationMap from "./components/regionStationMap";
import RegionInfo from "./components/RegionInfo";
import SidoAverage from "./components/SidoAverage"
import { RegionSelect, SidebarWrapper } from "./Sidebar.styles";

const sidoList = [
  "서울", "부산", "대구", "인천",
  "광주", "대전", "울산", "경기",
  "강원", "충북", "충남", "전북",
  "전남", "경북", "경남", "제주"
];

export default function Sidebar() {
  const [region, setRegion] = useState("중구");
  const [idx, setIdx] = useState(0);

  const station = regionStationMap[region];
  const air = useAir(station);
  const avg = useSidoAverage(sidoList[idx]);

  return (
    <SidebarWrapper>
      <RegionSelect value={region} onChange={(e) => setRegion(e.target.value)}>
        {Object.keys(regionStationMap).map((r) => (
          <option key={r}>{r}</option>
        ))}
      </RegionSelect>

      <RegionInfo item={air} region={region} />

      <SidoAverage
        sido={sidoList[idx]}
        sidoAvg={avg}
        onPrev={() => setIdx((idx - 1 + sidoList.length) % sidoList.length)}
        onNext={() => setIdx((idx + 1) % sidoList.length)}
      />
    </SidebarWrapper>
  );
}
