import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss'
})
export class Pagination {
  @Input() totalCount: number = 0;
  @Input() pageSize: number = 12;
  @Input() siblingCount: number = 1;
  @Input() currentPage: number = 1;
  @Input() className?: string;

  @Output() pageChange = new EventEmitter<number>();

  DOTS = '...';

  // Don't render if we only have one page or less
  get shouldShowPagination(): boolean {
    return this.currentPage !== 0 && this.paginationRange.length >= 2;
  }

  get paginationRange(): (number | string)[] {
    const totalPageCount = Math.ceil(this.totalCount / this.pageSize);
    const totalPageNumbers = this.siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return this.range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(this.currentPage - this.siblingCount, 1);
    const rightSiblingIndex = Math.min(this.currentPage + this.siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * this.siblingCount;
      const leftRange = this.range(1, leftItemCount);
      return [...leftRange, this.DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * this.siblingCount;
      const rightRange = this.range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, this.DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = this.range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, this.DOTS, ...middleRange, this.DOTS, lastPageIndex];
    }

    return [];
  }

  get lastPage(): number | string {
    return this.paginationRange[this.paginationRange.length - 1];
  }

  get isPreviousDisabled(): boolean {
    return this.currentPage === 1;
  }

  get isNextDisabled(): boolean {
    return this.currentPage === this.lastPage;
  }

  private range(start: number, end: number): number[] {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => i + start);
  }

  onNext() {
    if (!this.isNextDisabled) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  onPrevious() {
    if (!this.isPreviousDisabled) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  onPageClick(pageNumber: number | string) {
    if (typeof pageNumber === 'number') {
      this.pageChange.emit(pageNumber);
    }
  }

  isDots(pageNumber: number | string): boolean {
    return pageNumber === this.DOTS;
  }

  isSelected(pageNumber: number | string): boolean {
    return pageNumber === this.currentPage;
  }

  trackByFn(index: number, item: number | string): string | number {
    return typeof item === 'number' ? item : `dots-${index}`;
  }
}