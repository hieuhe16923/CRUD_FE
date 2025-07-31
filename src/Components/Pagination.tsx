import React from 'react';

interface PaginationProps {
  meta: {
    pagination: {
      current: number;
      next?: number;
      last: number;
      records: number;
    };
  };
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  meta,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = meta?.pagination?.last ?? 1;

  const createPageButton = (page: number) => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      className={`px-3 py-1 border rounded ${
        currentPage === page ? 'bg-blue-500 text-white' : 'bg-white'
      }`}
    >
      {page}
    </button>
  );

  const buttons: (JSX.Element | string)[] = [];

  // Trang đầu tiên
  buttons.push(createPageButton(1));

  // Hiển thị từ trang 2 đến trang hiện tại + 1
  const maxMiddle = Math.min(currentPage + 1, totalPages - 1);
  for (let i = 2; i <= maxMiddle; i++) {
    buttons.push(createPageButton(i));
  }

  // Dấu ... nếu còn trang ở giữa
  if (currentPage + 1 < totalPages - 1) {
    buttons.push(
      <span key="ellipsis" className="px-2 py-1 select-none">
        ...
      </span>
    );
  }

  // Trang cuối cùng nếu khác trang đầu
  if (totalPages > 1) {
    buttons.push(createPageButton(totalPages));
  }

  return <div className="flex justify-center space-x-2 mt-4">{buttons}</div>;
};

export default PaginationComponent;
