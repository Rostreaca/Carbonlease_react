import { CategorySelectButton, CategorySelectWrapper } from "../ActivityInsertForm.styles";

const CATEGORY = [
  { no: 1, name: "대중교통 이용" },
  { no: 2, name: "텀블러 사용" },
  { no: 3, name: "분리수거 실천" },
  { no: 4, name: "자전거 이동" },
  { no: 5, name: "계단 이용" },
  { no: 6, name: "절전 세탁" },
  { no: 7, name: "비건 식단" },
  { no: 8, name: "도보 이동" },
  { no: 9, name: "샤워 절약" },
  { no: 10, name: "전기 절약" }
];

const CategorySelect = ({ value, onChange }) => {
  
  const selectedValue = value ? String(value) : "";
  
  return (
    <CategorySelectWrapper>
      <CategorySelectButton
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">탄소절감 활동</option>

        {CATEGORY.map((c) => (
          <option key={c.no} value={String(c.no)}>
            {c.name}
          </option>
        ))}
      </CategorySelectButton>
    </CategorySelectWrapper>
  );
};


export default CategorySelect;
