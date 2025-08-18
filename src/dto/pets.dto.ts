export interface Category {
  id: number;
  name: string;
}

export interface Pet {
  id: number;
  category?: Category;
  name: string;
  photoUrls?: string[];
  tags?: { id: number; name: string }[];
  status?: 'available' | 'pending' | 'sold';
  life?: number;
  male_weight?: number;
  female_weight?: number;
}
