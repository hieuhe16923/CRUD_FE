import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './UsePagination';
import './Pagination.scss';
import PaginationButton from '../PaginationButton/PaginationButton';

interface PaginationProps {
    onPageChange: (page: number) => void;
    totalCount: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
}) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    // Don't render if we only have one page or less
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const lastPage = paginationRange[paginationRange.length - 1];

    return (
        <ul className={classnames('pagination-container', { [className || '']: !!className })}>
            {/* Left navigation arrow */}
            <PaginationButton
                iconName="fa-solid fa-chevron-left"
                disabled={currentPage === 1}
                onClick={currentPage === 1 ? undefined : onPrevious}
            />

            {paginationRange.map((pageNumber, idx) => {
                if (pageNumber === DOTS) {
                    return <li key={`dots-${idx}`} className="pagination-item dots">&#8230;</li>;
                }

                return (
                    <li
                        key={pageNumber}
                        className={classnames('pagination-item', {
                            selected: pageNumber === currentPage,
                        })}
                        onClick={() => onPageChange(Number(pageNumber))}
                    >
                        {pageNumber}
                    </li>
                );
            })}

            {/* Right navigation arrow */}
            <PaginationButton
                iconName="fa-solid fa-chevron-right"
                disabled={currentPage === lastPage}
                onClick={currentPage === lastPage ? undefined : onNext}
            />
        </ul>
    );
};

export default Pagination;
