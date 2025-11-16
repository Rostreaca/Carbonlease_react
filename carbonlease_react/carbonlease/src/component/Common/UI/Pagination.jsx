import {  PagingWrapper, PageBtn } from "./Pagination.styles.js";

const Pagination = ({ page, totalPages, onChange }) => {
  return (
    <PagingWrapper>
      {Array.from({ length: totalPages }, (_, i) => (
        <PageBtn
          key={i}
          className={page === i + 1 ? "active" : ""}
          onClick={() => onChange(i + 1)}
        >
          {i + 1}
        </PageBtn>
      ))}
    </PagingWrapper>
  );
};

export default Pagination;