import React from 'react';
import { PaginationProps } from '../Types/Pagination';

const PaginationComponent: React.FC<PaginationProps> = ({
  meta,
  currentPage,
  setCurrentPage,
}) => {
  const recordsPerPage = 10;
  const totalRecords = meta?.pagination?.records ?? 0;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const createPageButton = (page: number) => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      className={`
        min-w-[44px] h-11 px-4 py-2 text-sm font-medium rounded-xl
        transition-all duration-200
        ${
          currentPage === page
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
            : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'
        }
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      `}
    >
      {page}
    </button>
  );

  const buttons: (JSX.Element | string)[] = [];

  // Previous button
  if (currentPage > 1) {
    buttons.push(
      <button
        key="prev"
        onClick={() => setCurrentPage(currentPage - 1)}
        className="min-w-[44px] h-11 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        ←
      </button>
    );
  }

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(createPageButton(i));
    }
  } else {
    const showLeftEllipsis = currentPage > 4;
    const showRightEllipsis = currentPage < totalPages - 3;

    buttons.push(createPageButton(1));

    if (showLeftEllipsis) {
      buttons.push(
        <span key="start-ellipsis" className="px-2 py-2 text-gray-400">
          ...
        </span>
      );
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(createPageButton(i));
    }

    if (showRightEllipsis) {
      buttons.push(
        <span key="end-ellipsis" className="px-2 py-2 text-gray-400">
          ...
        </span>
      );
    }

    if (totalPages > 1) {
      buttons.push(createPageButton(totalPages));
    }
  }

  // Next button
  if (currentPage < totalPages) {
    buttons.push(
      <button
        key="next"
        onClick={() => setCurrentPage(currentPage + 1)}
        className="min-w-[44px] h-11 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        →
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-3 mt-8">
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages} • {totalRecords} results
      </div>
      <div className="flex flex-wrap justify-center gap-2">{buttons}</div>
    </div>
  );
};

export default PaginationComponent;
