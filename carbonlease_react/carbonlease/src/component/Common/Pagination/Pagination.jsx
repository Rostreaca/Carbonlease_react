import { PageButton, PaginationContainer } from './Pagination.styled';

const Pagination = ({ 
    currentPage, 
    totalPages, 
    setCurrentPage, 
    pageInfo 
}) => {

    // 페이지 번호 배열 생성
    const getPageNumbers = () => {
        if (pageInfo) {
            const numbers = [];
            for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
                numbers.push(i);
            }
            return numbers;
        }
        return [];
    };

    // 페이지 이동 핸들러
    const handleFirstPage = () => {
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 이전 페이지 그룹 이동
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // 특정 페이지 클릭
    const handlePageClick = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 다음 페이지 그룹 이동
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // 마지막 페이지 이동
    const handleLastPage = () => {
        setCurrentPage(totalPages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const pageNumbers = getPageNumbers();

    return (
        <PaginationContainer>
            <PageButton 
                onClick={handleFirstPage} 
                disabled={currentPage === 1}
            >
                <i className="bi bi-chevron-double-left"></i>
            </PageButton>
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
                disabled={currentPage === totalPages}
            >
                <i className="bi bi-chevron-right"></i>
            </PageButton>
            <PageButton 
                onClick={handleLastPage} 
                disabled={currentPage === totalPages}
            >
                <i className="bi bi-chevron-double-right"></i>
            </PageButton>
        </PaginationContainer>
    );
};

export default Pagination;
