export interface PaginationProps {
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
