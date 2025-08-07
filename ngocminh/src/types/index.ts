export interface Pet {
    id: number;
    name?: string;
    category?: {
        id?: number;
        name?: string;
    };
    photoUrls?: string[];
    tags?: Array<{
        id?: number;
        name?: string;
    }>;
    status?: 'available' | 'pending' | 'sold';
}

export type Status = 'available' | 'pending' | 'sold';
export type ItemsPerPage = 3 | 6 | 9;