import { CategorySelectButton, CategorySelectWrapper } from "../ActivityInsertForm.styles";

const REGIONS = [
  { no: 1, name: "서울특별시" },
  { no: 2, name: "부산광역시" },
  { no: 3, name: "대구광역시" },
  { no: 4, name: "인천광역시" },
  { no: 5, name: "광주광역시" },
  { no: 6, name: "대전광역시" },
  { no: 7, name: "울산광역시" },
  { no: 8, name: "세종특별자치시" },
  { no: 9, name: "경기도" },
  { no: 10, name: "강원도" },
  { no: 11, name: "충청북도" },
  { no: 12, name: "충청남도" },
  { no: 13, name: "전라북도" },
  { no: 14, name: "전라남도" },
  { no: 15, name: "경상북도" },
  { no: 16, name: "경상남도" },
  { no: 17, name: "제주특별자치도" }
];

const RegionSelect = ({value, onChange}) => {

  return (
    <>
      <CategorySelectWrapper>
          <CategorySelectButton
            className="region-select"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
              <option value={""}>지역 (시/도)</option>
            {REGIONS.map((r) => (
              <option key={r.no} value={r.no}>
                {r.name}
              </option>
            ))}
          </CategorySelectButton>
        </CategorySelectWrapper>
  </>
  );

}

export default RegionSelect;