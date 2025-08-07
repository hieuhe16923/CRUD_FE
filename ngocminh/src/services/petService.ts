import type { Pet, Status } from '../types';


export const petService = {
    async fetchPetsByStatus(status: Status): Promise<Pet[]> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        try {
            const response = await fetch(
                `https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`,
                {
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(`API trả về ${status}: ${data.length} pet`, data);

            // Trả về tất cả pet, chỉ đảm bảo là mảng
            const pets = Array.isArray(data) ? data : [];
            console.log(`Trả về ${status}: ${pets.length} pet`);

            return pets;
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Request timeout - Kết nối quá chậm');
            }
            throw new Error('Không thể tải dữ liệu');
        }
    },
};