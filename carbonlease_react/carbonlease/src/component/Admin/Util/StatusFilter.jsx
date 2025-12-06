import { 
  FilterButton,
  SearchInput,
  SearchButton,
  SearchGroup,
  FilterSearchRow,
  FilterGroup
} from "./SearchBox.styled";

const SearchFilterBox = ({
  status,
  keyword,
  onStatusChange,
  onKeywordChange,
  onSearch
}) => {
  return (
    <FilterSearchRow>

      {/* 왼쪽 필터 버튼 */}
      <FilterGroup>

        {/* 전체 버튼 */}
        <FilterButton
          $active={status === ""}
          $type="ALL"
          onClick={() => onStatusChange("")}
        >
          전체
        </FilterButton>

        {/* 정상 버튼 */}
        <FilterButton
          $active={status === "Y"}
          $type="Y"
          onClick={() => onStatusChange("Y")}
        >
          정상
        </FilterButton>

        {/* 숨김 버튼 */}
        <FilterButton
          $active={status === "N"}
          $type="N"
          onClick={() => onStatusChange("N")}
        >
          숨김
        </FilterButton>

      </FilterGroup>

      {/* 오른쪽 검색 */}
      <SearchGroup>
        <SearchInput
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={onKeywordChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
        />
        <SearchButton onClick={onSearch}>검색</SearchButton>
      </SearchGroup>

    </FilterSearchRow>
  );
};

export default SearchFilterBox;

