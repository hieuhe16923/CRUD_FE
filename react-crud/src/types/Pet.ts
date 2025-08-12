// types.ts
export interface CategoryType {
    id: number;
    name: string;
}

export interface TagType {
    id: number;
    name: string;
}

export interface PetType {
    id: number;
    category: CategoryType;
    name: string;
    photoUrls: string[];
    tags: TagType[];
    status: 'available' | 'pending' | 'sold'; // common pet statuses, adjust if needed
}
