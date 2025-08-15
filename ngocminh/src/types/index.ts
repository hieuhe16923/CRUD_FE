// types/index.ts - Direct exports (no barrel pattern)

/**
 * Category DTO - Đại diện cho category data từ API
 */
export type CategoryDto = {
    readonly id?: number;
    readonly name?: string;
};

/**
 * Tag DTO - Đại diện cho tag data từ API
 */
export type TagDto = {
    readonly id?: number;
    readonly name?: string;
};

/**
 * Pet Status - Union type cho trạng thái pet
 */
export type PetStatus = 'available' | 'pending' | 'sold';

/**
 * Pet DTO - Đại diện cho pet data từ Petstore API
 * Sử dụng readonly để đảm bảo immutability
 */
export type PetDto = {
    readonly id: number;
    readonly name?: string;
    readonly category?: CategoryDto;
    readonly photoUrls?: readonly string[];
    readonly tags?: readonly TagDto[];
    readonly status?: PetStatus;
};

/**
 * Items Per Page - Số lượng item hiển thị trên mỗi trang
 */
export type ItemsPerPage = 3 | 6 | 9;

/**
 * UI Filter State DTO - Quản lý state của filters
 */
export type FilterStateDto = {
    readonly status: PetStatus;
    readonly itemsPerPage: ItemsPerPage;
    readonly currentPage: number;
};

/**
//  * Pagination DTO - Thông tin phân trang
//  */
// export type PaginationDto = {
//     readonly currentPage: number;
//     readonly totalPages: number;
//     readonly totalItems: number;
//     readonly itemsPerPage: ItemsPerPage;
//     readonly hasNext: boolean;
//     readonly hasPrev: boolean;
// };

/**
 * API Error DTO
 */
export type ApiErrorDto = {
    readonly status: number;
    readonly message: string;
    readonly timestamp: string;
    readonly path?: string;
};

/**
 * Header Component Props DTO
 */
export type HeaderPropsDto = {
    readonly isOnline: boolean;
    readonly currentStatus: PetStatus;
    readonly onStatusChange: (status: PetStatus) => void;
    readonly loading: boolean;
    readonly itemsPerPage: ItemsPerPage;
    readonly onItemsPerPageChange: (items: ItemsPerPage) => void;
    readonly totalItems: number;
};

/**
 * Pet Card Props DTO
 */
export type PetCardPropsDto = {
    readonly pet: PetDto;
};

/**
 * Pagination Props DTO
 */
export type PaginationPropsDto = {
    readonly currentPage: number;
    readonly totalPages: number;
    readonly onPageChange: (page: number) => void;
    readonly loading?: boolean;
};

/**
 * Status Filter Props DTO
 */
export type StatusFilterPropsDto = {
    readonly currentStatus: PetStatus;
    readonly onStatusChange: (status: PetStatus) => void;
    readonly loading: boolean;
    readonly itemsPerPage: ItemsPerPage;
    readonly onItemsPerPageChange: (value: ItemsPerPage) => void;
    readonly totalItems: number;
};

// Backward compatibility aliases
export type Status = PetStatus;
export type Pet = PetDto;