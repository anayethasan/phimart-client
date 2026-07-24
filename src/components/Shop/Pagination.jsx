const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const siblingCount = 1; 
 
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }
 
        const left = Math.max(currentPage - siblingCount, 2);
        const right = Math.min(currentPage + siblingCount, totalPages - 1);
 
        pages.push(1);
 
        if (left > 2) pages.push("...");
 
        for (let i = left; i <= right; i++) pages.push(i);
 
        if (right < totalPages - 1) pages.push("...");
 
        pages.push(totalPages);
 
        return pages;
    };
 
    if (totalPages <= 1) return null;
 
    const pageNumbers = getPageNumbers();
 
    return (
        <div className="flex justify-center items-center gap-1 mb-6 mt-3">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Prev
            </button>
 
            {pageNumbers.map((page, idx) =>
                page === "..." ? (
                    <span key={`ellipsis-${idx}`} className="mx-1 px-2 select-none">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`mx-1 px-3 py-1 rounded ${
                            currentPage === page
                                ? "bg-secondary text-white"
                                : "bg-gray-200"
                        }`}
                    >
                        {page}
                    </button>
                )
            )}
 
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-1 px-3 py-1 rounded bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
};
 
export default Pagination;