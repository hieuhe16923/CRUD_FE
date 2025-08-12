import type { Category } from './Category';
import type { Tag } from './Tag';

export type PetStatus = 'available' | 'pending' | 'sold';

export interface Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  status?: PetStatus;
}
