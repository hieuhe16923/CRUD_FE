import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PetType } from '../../../../core/models/interface/pet.interface';
import { sharedModule } from '../../../../core/shared/shared';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  templateUrl: './pet-card.html',
  styleUrls: ['./pet-card.scss'],
  imports: [sharedModule],
})
export class PetCard {
  @Input() pet!: PetType;
  @Input() className?: string;
  @Output() viewDetails = new EventEmitter<PetType>();

  readonly petImagePlaceholder =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1trw-Z4OaZ7SXgv4L7VU5MNG7qZgox5LRug&s';

  isValidImageUrl(url?: string): boolean {
    if (!url) return false;
    return /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i.test(url.trim());
  }

  getImageSrc(): string {
    return this.isValidImageUrl(this.pet?.photoUrls?.[0])
      ? this.pet.photoUrls![0]
      : this.petImagePlaceholder;
  }

  getStatusClass(): string {
    switch (this.pet.status) {
      case 'available': return 'status-available';
      case 'pending': return 'status-pending';
      case 'sold': return 'status-sold';
      default: return '';
    }
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.pet);
  }
}