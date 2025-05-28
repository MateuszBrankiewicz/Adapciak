interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

const Pagination = ({ currentPage, totalPages, onPageChange, className = "" }: PaginationProps) => {
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    if (totalPages <= 1) return null;

    const visiblePages = getVisiblePages();

    return (
        <div className={`flex items-center justify-center space-x-2 ${className}`}>
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-md
                    ${currentPage === 1 
                        ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-main-color'
                    }
                    transition-colors
                `}
            >
                <span className="material-icons text-sm mr-1">chevron_left</span>
                Poprzednia
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
                {visiblePages.map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
                        disabled={typeof page !== 'number'}
                        className={`
                            px-3 py-2 text-sm font-medium rounded-md min-w-[40px]
                            ${typeof page !== 'number'
                                ? 'text-gray-400 cursor-default'
                                : page === currentPage
                                    ? 'text-white bg-main-color border border-main-color'
                                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-main-color'
                            }
                            transition-colors
                        `}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`
                    flex items-center px-3 py-2 text-sm font-medium rounded-md
                    ${currentPage === totalPages 
                        ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-main-color'
                    }
                    transition-colors
                `}
            >
                Następna
                <span className="material-icons text-sm ml-1">chevron_right</span>
            </button>
        </div>
    );
};

export default Pagination;
