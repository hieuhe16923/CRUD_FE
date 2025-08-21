import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { sharedModule } from '../../../core/shared/shared';
import { Pagination } from '../../../shared/reuseableComponent/pagination/pagination';
import { PetType } from '../../../core/models/interface/pet.interface';
import { PetState } from '../../../redux/state/pet/pet.reducer';
import * as PetActions from '../../../redux/state/pet/pet.actions';
import { PetCard } from '../components/pet-card/pet-card';
import { Loader } from '../../../shared/reuseableComponent/loader/loader';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.html',
  styleUrls: ['./pet-list.scss'],
  imports: [sharedModule, Loader, PetCard, Pagination],
})
export class PetList implements OnInit {
  pets$: Observable<PetType[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  pets: PetType[] = [];

  // UI state - updated for pagination compatibility
  status = 'available';
  currentPage = 1; // Changed from 'page' to 'currentPage' to match pagination component
  pageSize = 12;
  jumpPageInput = '';
  inputPageError = '';
  touched = false;

  @ViewChild('listRef') listRef!: ElementRef;
  @ViewChild('errorRef') errorRef!: ElementRef;

  // Expose Math for template
  Math = Math;

  constructor(private store: Store<{ pet: PetState }>) {
    this.pets$ = this.store.select(state => state.pet.pets);
    this.loading$ = this.store.select(state => state.pet.loading);
    this.error$ = this.store.select(state => state.pet.error);
  }

  ngOnInit() {
    this.fetchPetsByStatus(this.status);

    this.pets$.subscribe(pets => {
      this.pets = pets;
      // Reset to first page if current page exceeds total pages after data change
      if (this.currentPage > this.totalPages && this.totalPages > 0) {
        this.currentPage = 1;
      }
    });
  }

  fetchPetsByStatus(status: string) {
    this.status = status;
    this.currentPage = 1; // Reset to first page when changing status
    this.store.dispatch(PetActions.fetchPetsByStatus({ status }));
    this.scrollToList();
  }

  get totalPages(): number {
    return Math.ceil(this.pets.length / this.pageSize);
  }

  get currentTableData(): PetType[] {
    const firstPageIndex = (this.currentPage - 1) * this.pageSize;
    const lastPageIndex = firstPageIndex + this.pageSize;
    return this.pets.slice(firstPageIndex, lastPageIndex);
  }

  // Method to handle pagination component page change
  onPageChange(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.scrollToList();
    }
  }

  // Keep existing method for backward compatibility
  handlePageChange(newPage: number) {
    this.onPageChange(newPage);
  }

  handleJumpPage() {
    const pageNumber = Number(this.jumpPageInput);
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.onPageChange(pageNumber);
    }
    this.jumpPageInput = '';
  }

  validateJumpPage() {
    if (!this.touched || this.jumpPageInput.trim() === '') {
      this.inputPageError = '';
      return;
    }

    const num = parseInt(this.jumpPageInput, 10);

    if (isNaN(num)) {
      this.inputPageError = 'Must be a number';
    } else if (num < 1 || num > this.totalPages) {
      this.inputPageError = `1–${this.totalPages} only`;
    } else {
      this.inputPageError = '';
    }

    if (this.inputPageError && this.errorRef) {
      this.errorRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  changePageSize(size: number) {
    this.pageSize = size;
    // Calculate what the new current page should be to show similar content
    const currentFirstItemIndex = (this.currentPage - 1) * this.pageSize;
    const newPage = Math.floor(currentFirstItemIndex / size) + 1;
    this.currentPage = Math.min(newPage, Math.ceil(this.pets.length / size));
    this.scrollToList();
  }

  private scrollToList() {
    if (this.listRef) {
      this.listRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}