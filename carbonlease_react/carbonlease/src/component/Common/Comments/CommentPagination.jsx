import { PageButton, PaginationContainer } from "./Comment.styled";

const CommentPagination = ({ currentPage, onPageChange, pageInfo }) => {
  const { startPage, endPage, totalPage } = pageInfo;

  const pages = [];
  for (let i = startPage; i <= endPage; i++) pages.push(i);

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="bi bi-chevron-left"></i>
      </PageButton>

      {pages.map(num => (
        <PageButton
          key={num}
          $active={num === currentPage}
          onClick={() => onPageChange(num)}
        >
          {num}
        </PageButton>
      ))}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        <i className="bi bi-chevron-right"></i>
      </PageButton>
    </PaginationContainer>
  );
};

export default CommentPagination;
