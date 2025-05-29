import Pagination from "../common/Pagination/Pagination";
import { PaginationInfo } from "../../../types/models/adTypes";

interface PaginationSectionProps {
    pagination: PaginationInfo;
    onPageChange: (page: number) => void;
    isLoading: boolean;
    hasAds: boolean;
}

const PaginationSection = ({ pagination, onPageChange, isLoading, hasAds }: PaginationSectionProps) => {
    if (isLoading || !hasAds) {
        return null;
    }

    return (
        <div className="mt-12 mb-8">
            <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={onPageChange}
                className="mb-4"
            />
            
            <div className="text-center text-gray-600 text-sm">
                Pokazano {((pagination.currentPage - 1) * pagination.limit) + 1} - {Math.min(pagination.currentPage * pagination.limit, pagination.totalAds)} z {pagination.totalAds} ogłoszeń
            </div>
        </div>
    );
};

export default PaginationSection;
