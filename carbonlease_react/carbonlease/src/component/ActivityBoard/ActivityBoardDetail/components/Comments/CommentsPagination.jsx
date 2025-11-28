import { PageButton, PaginationContainer } from './CommentsPagination.styled';

const Pagination = ({ 
    currentPage, 
    setCurrentPage, 
    pageInfo = {
        startPage: "",
        endPage: "",
        totalPage: "",
    }
}) => {

    const getPageNumbers = () => {
        if (pageInfo) {
            const numbers = [];
            for (let i = Number(pageInfo.startPage); i <= Number(pageInfo.endPage); i++) {
                numbers.push(i);
            }
            return numbers;
        }
        return [];
    };

    // 이전 페이지 이동 (<)
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 페이지 클릭
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    // 다음 페이지 이동 (>)
    const handleNextPage = () => {
        if (currentPage < pageInfo.totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const pageNumbers = getPageNumbers();

    return (
        <PaginationContainer>

            <PageButton 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
            >
                <i className="bi bi-chevron-left"></i>
            </PageButton>

            {pageNumbers.map(page => (
                <PageButton
                    key={page}
                    onClick={() => handlePageClick(page)}
                    $active={currentPage === page}
                >
                    {page}
                </PageButton>
            ))}

            <PageButton 
                onClick={handleNextPage} 
                disabled={currentPage === pageInfo.totalPage}
            >
                <i className="bi bi-chevron-right"></i>
            </PageButton>

        </PaginationContainer>
    );
};

export default Pagination;
