// services/petService.ts
import type { PetDto, PetStatus, ApiErrorDto, CategoryDto, TagDto } from '../types/index';

/**
 * Raw Pet Data từ API - định nghĩa type chính xác cho raw data
 */
type RawPetData = {
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
    status?: string;
};

/**
 * Pet Service - Xử lý API calls liên quan đến Pet
 * Sử dụng DTO pattern cho type safety
 */
export class PetService {
    private readonly baseUrl = 'https://petstore.swagger.io/v2';
    private readonly timeout = 8000;

    /**
     * Fetch pets by status từ API
     * @param status - Trạng thái pet cần lấy
     * @returns Promise<PetDto[]>
     */
    async fetchPetsByStatus(status: PetStatus): Promise<PetDto[]> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(
                `${this.baseUrl}/pet/findByStatus?status=${status}`,
                {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
                const apiError = this.createApiError(response);
                throw new Error(apiError.message);
            }

            const data: unknown = await response.json();
            console.log(`API trả về ${status}: ${Array.isArray(data) ? data.length : 0} pet`, data);

            // Validate và transform data thành PetDto[]
            const pets = this.validateAndTransformPets(data);
            console.log(`Validated ${status}: ${pets.length} pet`);

            return pets;
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Request timeout - Kết nối quá chậm');
            }

            if (error instanceof Error) {
                throw error;
            }

            throw new Error('Không thể tải dữ liệu');
        }
    }

    /**
     * Validate và transform raw API data thành PetDto[]
     */
    private validateAndTransformPets(data: unknown): PetDto[] {
        if (!Array.isArray(data)) {
            console.warn('API response is not an array:', data);
            return [];
        }

        return data
            .filter(this.isValidPetData)
            .map((rawPet) => this.transformToPetDto(rawPet));
    }

    /**
     * Type guard - Kiểm tra xem data có phải là valid Pet không
     */
    private isValidPetData(item: unknown): item is RawPetData {
        return (
            typeof item === 'object' &&
            item !== null &&
            'id' in item &&
            typeof (item as RawPetData).id === 'number'
        );
    }

    /**
     * Transform raw data thành PetDto
     */
    private transformToPetDto(rawPet: RawPetData): PetDto {
        return {
            id: rawPet.id,
            name: rawPet.name,
            category: this.transformCategory(rawPet.category),
            photoUrls: Array.isArray(rawPet.photoUrls) ? rawPet.photoUrls : undefined,
            tags: this.transformTags(rawPet.tags),
            status: this.validateStatus(rawPet.status)
        };
    }

    /**
     * Transform category data
     */
    private transformCategory(category?: RawPetData['category']): CategoryDto | undefined {
        if (!category) return undefined;

        return {
            id: category.id,
            name: category.name
        };
    }

    /**
     * Transform tags data
     */
    private transformTags(tags?: RawPetData['tags']): readonly TagDto[] | undefined {
        if (!Array.isArray(tags)) return undefined;

        return tags.map((tag) => ({
            id: tag.id,
            name: tag.name
        }));
    }

    /**
     * Validate pet status
     */
    private validateStatus(status: unknown): PetStatus | undefined {
        const validStatuses: PetStatus[] = ['available', 'pending', 'sold'];
        return typeof status === 'string' && validStatuses.includes(status as PetStatus)
            ? status as PetStatus
            : undefined;
    }

    /**
     * Tạo API Error object
     */
    private createApiError(response: Response): ApiErrorDto {
        return {
            status: response.status,
            message: `HTTP error! status: ${response.status}`,
            timestamp: new Date().toISOString(),
            path: response.url
        };
    }
}

// Singleton instance
export const petService = new PetService();