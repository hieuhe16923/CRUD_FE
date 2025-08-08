// types.ts
// Define interfaces for Pet data based on Swagger API
export interface Category {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Pet {
  id?: number; // Optional for Add, required for Update
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  status: 'available' | 'pending' | 'sold';
}

// Define form data structure, aligning with API but simplified for UI input
export interface PetFormValues {
  id: number | ''; // For update scenarios
  petName: string;
  categoryId: number | '';
  categoryName: string;
  photoUrls: string; // Comma-separated string for input
  tags: string; // Comma-separated string for input
  status: 'available' | 'pending' | 'sold';
}

export interface SelectOption {
  value: string | number;
  label: string;
  apiName?: string;
}
